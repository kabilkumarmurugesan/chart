import {
  FormControlLabel,
  Box,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import radioList from "../utilities/JSON/radioList.json";
import { useTheme } from "@emotion/react";

function RadioBtn(props) {
  const theme = useTheme();
  const { primary, secondary } = theme.palette;
  const [inputs, setInputs] = useState(60000);

  const handleInputChange = (event) => {
    event.persist();
    props.handleEvent(event);
    setInputs(event.target.value);
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
        {" "}
        <Typography>Interval (Sec): </Typography>
        <RadioGroup
          aria-label="Interval"
          name="Interval"
          row
          label="Interval"
          value={inputs}
          onChange={handleInputChange}
        >
          {radioList &&
            radioList.map((item, index) => (
              <FormControlLabel
                key={index}
                id="control-radio"
                value={item.value}
                control={
                  <Radio
                    sx={{
                      color: secondary.pending, // Default color
                      "&.Mui-checked": {
                        color: secondary.pending, // Checked color
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
