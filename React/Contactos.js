import React from 'react';
import { Typography, Box } from '@mui/material';

const Contacto = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Contacto
            </Typography>
            <Typography variant="body1" paragraph>
                Puedes contactarnos a través de los siguientes medios:
            </Typography>
            <Typography variant="body1">
                Nombre: Stephano Cornejo Córdova<br />
                Teléfono: 954216325<br />
                Correo Electrónico: stephano.cornejo@tecsup.edu.pe
            </Typography>
        </Box>
    );
};

export default Contacto;
