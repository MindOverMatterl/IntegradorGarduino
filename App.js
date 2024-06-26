  import React, { Component } from 'react';
  import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    CircularProgress
  } from '@mui/material';

  class DatosSensorComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        datos: [],
        recuperado: false,
        page: 0,
        rowsPerPage: 5
      };
    }

    componentDidMount() {
      this.fetchData();
    }

    fetchData = () => {
      fetch('http://localhost:8080/api/datos_sensor/')
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            datos: data,
            recuperado: true
          });
        })
        .catch((error) => {
          console.error('Error al obtener datos del sensor:', error);
        });
    };

    handleChangePage = (event, newPage) => {
      this.setState({ page: newPage });
    };

    handleChangeRowsPerPage = (event) => {
      this.setState({
        rowsPerPage: parseInt(event.target.value, 10),
        page: 0
      });
    };

    render() {
      const { datos, recuperado, page, rowsPerPage } = this.state;

      return (
        <Container>
          <h1>Datos del Sensor</h1>
          {recuperado ? (
            <TableContainer component={Paper} sx={{ marginTop: 4 }}>
              <Table sx={{ minWidth: 650 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <TableCell>Temperatura</TableCell>
                    <TableCell>Humedad</TableCell>
                    <TableCell align="right">Fecha de Registro</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {datos
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((dato) => (
                      <TableRow key={dato.id}>
                        <TableCell>{dato.temperatura}</TableCell>
                        <TableCell>{dato.humedad}</TableCell>
                        <TableCell align="right">{dato.fecha_registro}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={datos.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={this.handleChangePage}
                onRowsPerPageChange={this.handleChangeRowsPerPage}
              />
            </TableContainer>
          ) : (
            <CircularProgress sx={{ display: 'block', margin: 'auto', marginTop: 4 }} />
          )}
        </Container>
      );
    }
  }

  export default DatosSensorComponent;
