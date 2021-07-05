import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Table,
  TextField,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  TableBody,
  Paper,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

const BandList = ({ data }) => {
  const [bands, setBands] = useState(data);
  useEffect(() => {
    setBands(data);
  }, [data]);

  const handleChangeNombre = (event, id) => {
    const nuevoNombre = event.target.value;
    setBands((bands) =>
      bands.map((band) => {
        if (band.uuid === id) {
          band.name = nuevoNombre;
        }
        return band;
      })
    );
  };

  const handleBlur = (id,nombre)=>{

    //TODO: DISPARAR SOCKET 

  }
  const crearRows = () => {
    return bands.map((band) => (
      <TableRow key={band.uuid}>
        <TableCell>
          <Button color="primary">+1</Button>
        </TableCell>
        <TableCell>
          <TextField
            variant="outlined"
            value={band.name}
            onBlur={()=>handleBlur(band.name,band.uuid)}
            onChange={(event) => handleChangeNombre(event, band.uuid)}
          />
        </TableCell>
        <TableCell>
          <Typography variant="h3">{band.vote}</Typography>
        </TableCell>
        <TableCell>
          <Button color="secondary" endIcon={<Delete />} variant="contained">
            Borrar
          </Button>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <>
      <Typography variant="h4">Bandas actuales</Typography>
      <TableContainer component={Paper}>
        <Table className="table table-stripped">
          <TableHead>
            <TableRow>
              <TableCell align="right"></TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Votos</TableCell>
              <TableCell align="right">Borrar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{crearRows()}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BandList;
