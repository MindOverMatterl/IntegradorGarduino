import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';
import Logo from './Logo.jpg'; // Importa tu logo

const CompostadorForm = () => {
    const [temperatura, setTemperatura] = useState('');
    const [humedad, setHumedad] = useState('');
    const [velocidadMotor, setVelocidadMotor] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://192.168.1.5:8000/compostador/', {
                temperatura: temperatura,
                humedad: humedad,
                velocidad_motor: velocidadMotor
            });

            // Limpiar campos después del envío exitoso
            setTemperatura('');
            setHumedad('');
            setVelocidadMotor('');

            alert('Datos enviados correctamente');
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            alert('Hubo un problema al enviar los datos');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: 'auto', mt: 4, backgroundColor: '#e0f2f1', padding: '20px', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <img src={Logo} alt="Logo" style={{ width: '40px', marginBottom: '10px' }} />
            <Typography variant="h6" component="div" gutterBottom>
                Agregar Datos del Compostador
            </Typography>
            <TextField
                label="Temperatura"
                type="number"
                value={temperatura}
                onChange={(e) => setTemperatura(e.target.value)}
                required
            />
            <TextField
                label="Humedad"
                type="number"
                value={humedad}
                onChange={(e) => setHumedad(e.target.value)}
                required
            />
            <TextField
                label="Velocidad del Motor"
                type="number"
                value={velocidadMotor}
                onChange={(e) => setVelocidadMotor(e.target.value)}
                required
            />
            <Button type="submit" variant="contained" color="primary">
                Enviar
            </Button>
        </Box>
    );
};

export default CompostadorForm;
