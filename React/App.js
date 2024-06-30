import React, { useState } from 'react';
import './App.css'; // Importa estilos globales si los tienes
import CompostadorTable from './CompostadorTable';
import CompostadorForm from './CompostadorForm';
import Login from './Loginb';
import Vision from './Vision'; // Importa el componente Vision
import Logo from './Logo.jpg'; // Importa tu logo
import TipoNegocio from './TipoNegocio'; // Importa el componente TipoNegocio

import { AppBar, Toolbar, Typography, Box, Drawer, List, ListItem, ListItemText, CssBaseline, Button } from '@mui/material';

function App() {
    const [activeTab, setActiveTab] = useState('vision'); // Inicia con 'vision' como activo
    const [token, setToken] = useState(localStorage.getItem('token')); // Estado para el token de autenticación

    const handleTabChange = (newValue) => {
        setActiveTab(newValue);
    };

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token'); // Limpiar el token almacenado
    };

    const drawerWidth = 240;

    if (!token) {
        return <Login setToken={(token) => {
            setToken(token);
            localStorage.setItem('token', token); // Almacenar el token en localStorage
        }} />;
    }

    return (
        <div className="App" style={{ display: 'flex', backgroundColor: '#e0f2f1', minHeight: '100vh' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#43a047' }}>
                <Toolbar>
                    <img src={Logo} alt="Logo" style={{ width: '40px', marginRight: '10px' }} />
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Garduino
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>
                        Cerrar Sesión
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <List>
                    <ListItem button onClick={() => handleTabChange('vision')}>
                        <ListItemText primary="Nuestra Visión" />
                    </ListItem>
                    <ListItem button onClick={() => handleTabChange('negocio')}>
                        <ListItemText primary="Tipo de Negocio" />
                    </ListItem>
                    <ListItem button onClick={() => handleTabChange('table')}>
                        <ListItemText primary="Ver Tabla" />
                    </ListItem>
                    <ListItem button onClick={() => handleTabChange('form')}>
                        <ListItemText primary="Agregar Datos" />
                    </ListItem>
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, width: `calc(100% - ${drawerWidth}px)` }}
            >
                <Toolbar />
                {activeTab === 'table' && <CompostadorTable />}
                {activeTab === 'form' && <CompostadorForm />}
                {activeTab === 'vision' && <Vision />}
                {activeTab === 'negocio' && <TipoNegocio />}
            </Box>
        </div>
    );
}

export default App;
