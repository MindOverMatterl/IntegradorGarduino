#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>
#include <ArduinoJson.h>
#include <ESP32Servo.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>  // Librería para pantalla LCD I2C

#define DHTPIN 26       
#define DHTTYPE DHT11    
#define LED_PIN 13       

DHT dht(DHTPIN, DHTTYPE); 

Servo myservo;  
int vel = 0;   

// MQTT CONFIG
const char *mqtt_server = "sv-JRJh4EgaCS.cloud.elastika.pe"; 
const int mqtt_port = 1883;                                   
const char *mqtt_user = "";                                   
const char *mqtt_pass = "";                                   
const char *root_topic_publish = "sensor";                    
const char *humedad_topic_publish = "sensor/humedad";         
const char *temperatura_topic_publish = "sensor/temperatura"; 
const char *control_servo = "control/servo"; 

// WIFI CONFIG
//const char* ssid = "VARGAS";          
//const char* password = "72882624V."; 
const char* ssid = "diego";          
const char* password = "diego321"; 
WiFiClient espClient;
PubSubClient client(espClient);

// LCD CONFIG
LiquidCrystal_I2C lcd(0x27, 16, 2); // Dirección I2C 0x27, pantalla de 16 columnas y 2 filas

void callback(char* topic, byte* payload, unsigned int length);   
void reconnect();
void setup_wifi();

void setup() {
  Serial.begin(9600);
  pinMode(LED_PIN, OUTPUT);
  dht.begin();

  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);

  myservo.attach(12);

  // Inicializa la pantalla LCD
  lcd.init();
  lcd.backlight();
  lcd.print("Iniciando...");
}

void loop() {
  float t = dht.readTemperature();
  float h = dht.readHumidity();

  Serial.print("Humedad: ");
  Serial.print(h);
  Serial.println(" %\t");
  Serial.print("Temperatura: ");
  Serial.print(t);
  Serial.println(" C");

  // Actualiza la pantalla LCD
  lcd.setCursor(0, 0);
  lcd.print("Temp: ");
  lcd.print(t);
  lcd.print(" C   ");
  lcd.setCursor(0, 1);
  lcd.print("Hum: ");
  lcd.print(h);
  lcd.print(" %   ");

  if (!client.connected()) {
    reconnect();
  }   

  if (client.connected()) {
    StaticJsonDocument<128> doc;
    doc["TEMPERATURA"] = t;
    doc["HUMEDAD"] = h;

    String output;
    serializeJson(doc, output);

    client.publish(root_topic_publish, output.c_str());
    Serial.print("Datos enviados al broker MQTT (sensor): ");
    Serial.println(output);

    client.publish(humedad_topic_publish, String(h).c_str());
    Serial.print("Humedad enviada al broker MQTT (sensor/humedad): ");
    Serial.println(h);

    client.publish(temperatura_topic_publish, String(t).c_str());
    Serial.print("Temperatura enviada al broker MQTT (sensor/temperatura): ");
    Serial.println(t);
  }

  if (t >= 28 && h >= 40) {
    digitalWrite(LED_PIN, HIGH);
    vel = 180;
    myservo.write(vel);              
    delay(1500); 

    vel = 0;
    myservo.write(vel);              
    delay(1500); 
    digitalWrite(LED_PIN, LOW);
  } else {
    vel = 90;
    myservo.write(vel);              
    delay(1500);    
  }

  client.loop();
  delay(2000);
}

void setup_wifi() {
  delay(10);
  WiFi.config(INADDR_NONE, INADDR_NONE, INADDR_NONE, INADDR_NONE);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("Conectado a red WiFi!");
  Serial.println("Dirección IP: ");
  Serial.println(WiFi.localIP());
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Intentando conexión MQTT...");
    String clientId = "ESP32Client";
    
    if (client.connect(clientId.c_str(), mqtt_user, mqtt_pass)) {      
      Serial.println("Conectado!");
      client.subscribe(control_servo); // Suscripción al tópico control/servo
    } else {
      Serial.print("Falló :( con error -> ");
      Serial.print(client.state());
      Serial.println(" Intentando de nuevo en 5 segundos");
      delay(5000);
    }
  }
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Mensaje recibido [");
  Serial.print(topic);
  Serial.print("]: ");

  String message;
  for (unsigned int i = 0; i < length; i++) {
    message += (char)payload[i];
  }
  Serial.println(message);

  if (String(topic) == "control/servo") {
    if (message == "1") {
      // Servo 100% en sentido horario (equivalente a un ángulo de 180º)
      vel = 180;
      myservo.write(vel);
      delay(1500);
      Serial.println("Servo movido a 180 grados");
      digitalWrite(LED_PIN, HIGH);
    } else if (message == "0") {
      // Servo 100% en sentido antihorario (equivalente a un ángulo de 0º)
      vel = 0;
      myservo.write(vel);
      delay(1500);
      Serial.println("Servo movido a 0 grados");
      digitalWrite(LED_PIN, LOW);
    }
}

}
