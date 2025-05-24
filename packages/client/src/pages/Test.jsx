import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const Test = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    console.log("Name changed:", name);
  }, [name]);

  return (
    <Box>
      <TextField
        label="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        variant="filled"
      />
    </Box>
  );
};

export default Test;
