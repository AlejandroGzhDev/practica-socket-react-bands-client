import React, { useContext, useState } from "react";
import { Typography, TextField, Box, Button } from "@material-ui/core";
import { SocketContext } from "../context/SocketContext";

const BandAdd = () => {
  const [valor, setValor] = useState("");

  const {socket} = useContext(SocketContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (valor.trim().length > 0) {

      socket.emit("agregar-banda", {
        nombre:valor,
      });
      setValor("");
    }
  };


  const handleChange = ({ target }) => {
    setValor(target.value);
  };

  return (
    <>
      <Typography variant="h4">Añadir bandas</Typography>
      <Box mt={2}>
        <form onSubmit={handleSubmit}>
          <TextField
            id="outlined"
            label="Nombre de la banda"
            variant="outlined"
            fullWidth
            value={valor}
            onChange={handleChange}
          />
          <Box mt={4}>
            <Button type="submit" color="primary" fullWidth variant="contained">
              Agregar banda
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default BandAdd;
