import React from "react";
import { Typography, TextField ,Box} from "@material-ui/core";
const BandAdd = () => {
  return (
    <>
      <Typography variant="h4">Añadir bandas</Typography>
      <Box mt={2}>
        <form>
          <TextField
            id="outlined"
            label="Nombre de la banda"
            variant="outlined"
            fullWidth
          />
        </form>
      </Box>
    </>
  );
};

export default BandAdd;
