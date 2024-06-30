import React from 'react';
import { Typography, Box, Grid, Paper, Button } from '@mui/material';

const TipoNegocio = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Tipo de Negocio: Canje por Basura Orgánica
            </Typography>
            <Typography variant="body1" paragraph>
                En nuestro tipo de negocio de canje, incentivamos a los usuarios a recolectar y reciclar basura ofreciendo recompensas a cambio de cierta cantidad de residuos orgánicos. Queremos fomentar prácticas sostenibles y reducir la contaminación.
            </Typography>
            <Typography variant="body1" paragraph>
                Nos preocupamos por el impacto ambiental de los residuos orgánicos desaprovechados, que pueden contribuir significativamente a la contaminación y al desperdicio de recursos naturales.
            </Typography>
            <Typography variant="body1" paragraph>
                Por ejemplo, por cada 5 kilos de basura orgánica preseleccionada que traigas, puedes llevar un macetero para fomentar la jardinería urbana sostenible. Esto no solo embellece los espacios urbanos, sino que también promueve un estilo de vida más ecológico entre la comunidad.
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Beneficios del Canje por Basura Orgánica
                        </Typography>
                        <Typography variant="body2" paragraph>
                            - Contribuye a la reducción del impacto ambiental.
                        </Typography>
                        <Typography variant="body2" paragraph>
                            - Fomenta prácticas sostenibles de manejo de residuos.
                        </Typography>
                        <Typography variant="body2" paragraph>
                            - Ofrece incentivos tangibles a la comunidad.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Cómo Funciona el Canje por Basura Orgánica
                        </Typography>
                        <Typography variant="body2" paragraph>
                            1. Recolecta una cantidad especificada de basura orgánica.
                        </Typography>
                        <Typography variant="body2" paragraph>
                            2. Canjea tus puntos acumulados por recompensas como maceteros, fertilizantes orgánicos u otros productos ecológicos.
                        </Typography>
                        <Typography variant="body2" paragraph>
                            3. Contribuye activamente a la creación de un ambiente más limpio y sostenible para todos.
                        </Typography>
                        
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default TipoNegocio;
