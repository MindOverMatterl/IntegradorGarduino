import React from 'react';
import { Box, Typography, Grid, Divider } from '@mui/material';
import Logo from './Logo.jpg'; // Importa tu logo

const Vision = () => {
    return (
        <Box sx={{ backgroundColor: '#e0f2f1', minHeight: '100vh', padding: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <img src={Logo} alt="Logo" style={{ width: '100px', marginBottom: '20px' }} />
                    <Typography variant="h4" gutterBottom>
                        Nuestra Visión
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Nos preocupa el impacto ambiental de los residuos orgánicos desaprovechados, que pueden contribuir significativamente a la contaminación y al desperdicio de recursos naturales.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                        Nuestro Objetivo
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        En nuestro proyecto, nos comprometemos a desarrollar soluciones sostenibles para la gestión de residuos orgánicos. Buscamos promover prácticas que minimicen el impacto ambiental y maximicen la eficiencia en el uso de recursos naturales.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                        Impacto Esperado
                    </Typography>
                    <Typography variant="body1">
                        Esperamos crear conciencia y ofrecer alternativas viables para la gestión de residuos orgánicos en nuestra comunidad. Queremos inspirar cambios positivos que conduzcan a un entorno más limpio y sostenible para las generaciones futuras.
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Vision;
