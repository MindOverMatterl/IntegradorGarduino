import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';

const CompostadorTable = () => {
    const [compostadores, setCompostadores] = useState([]);

    useEffect(() => {
        const fetchCompostadores = async () => {
            try {
                const response = await axios.get('http://192.168.1.5:8000/compostador/');
                setCompostadores(response.data);
            } catch (error) {
                console.error('Error fetching compostadores:', error);
            }
        };

        fetchCompostadores();
    }, []);

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" component="div" gutterBottom>
                Tabla de Compostadores
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Temperatura</TableCell>
                            <TableCell>Humedad</TableCell>
                            <TableCell>Velocidad del Motor</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {compostadores.map((compostador) => (
                            <TableRow key={compostador.id}>
                                <TableCell>{compostador.id}</TableCell>
                                <TableCell>{compostador.temperatura}</TableCell>
                                <TableCell>{compostador.humedad}</TableCell>
                                <TableCell>{compostador.velocidad_motor}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default CompostadorTable;
