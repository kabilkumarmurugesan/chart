import React, { useState } from "react";
import {
  FormControlLabel,
  Box,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import RadioList from "../utilities/JSON/RadioList.json";
import { useTheme } from "@emotion/react";

function RadioBtn(props) {
  const theme = useTheme();
  const { secondary } = theme.palette;
  const [inputs, setInputs] = useState(props.intervals);
 
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputs(newValue); // Update the state with the new value
    props.handleEvent(event); // Call the parent handler
  };

  return (
    <form noValidate>
      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          maxWidth: 300,
          borderRadius: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography>Interval (Sec): </Typography>
        <RadioGroup
          aria-label="Interval"
          name="Interval"
          row
          value={inputs} // Bind the selected value to the RadioGroup
          onChange={handleInputChange}
        >
          {RadioList &&
            RadioList.map((item, index) => (
              <FormControlLabel
                key={index}
                id="control-radio"
                value={item.value}
                control={
                  <Radio
                    sx={{
                      color: secondary.pending, // Default color from theme
                      "&.Mui-checked": {
                        color: secondary.pending, // Checked color from theme
                      },
                    }}
                  />
                }
                label={item.label}
                labelPlacement="end"
              />
            ))}
        </RadioGroup>
      </Box>
    </form>
  );
}

export default RadioBtn;
