import React, { useState, useEffect,useContext } from "react";
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
import { SocketContext } from "../context/SocketContext";

const BandList = () => {
  const [bands, setBands] = useState([]);
  const { socket } = useContext(SocketContext);
  useEffect(() => {
    socket.on("current-bands", (bands) => {
      setBands(bands);
    });
    return () => socket.off("current-bands")
  }, [socket]);

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

  const handleBlur = (id, nombre) => {
    socket.emit("cambiar-nombre-banda", {id,nombre,});
  };


  const votar = (id) => {
    socket.emit("votar-banda", id);
  };

  const borrar = (id) => {
    socket.emit("borrar-banda", id);
  };
  const crearRows = () => {
    return bands.map((band) => (
      <TableRow key={band.uuid}>
        <TableCell>
          <Button color="primary" onClick={() => votar(band.uuid)}>
            +1
          </Button>
        </TableCell>
        <TableCell>
          <TextField
            variant="outlined"
            value={band.name}
            onBlur={() => handleBlur(band.uuid, band.name)}
            onChange={(event) => handleChangeNombre(event, band.uuid)}
          />
        </TableCell>
        <TableCell>
          <Typography variant="h3">{band.vote}</Typography>
        </TableCell>
        <TableCell>
          <Button
            color="secondary"
            endIcon={<Delete />}
            onClick={() => borrar(band.uuid)}
            variant="contained"
          >
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
