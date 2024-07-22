import { FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material";
import React, { useState } from "react";
import radioList from "../utilities/JSON/radioList.json";

function RadioBtn(props) {
  const [inputs, setInputs] = useState(60000);

  const handleInputChange = (event) => {
    event.persist();
    props.handleEvent(event);
    setInputs(event.target.value);
  };

  return (
    <form noValidate>
      <Grid container>
        <Grid item xs={12}>
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
                  value={item.value}
                  control={
                    <Radio
                      sx={{
                        color: "primary.main", // Default color
                        "&.Mui-checked": {
                          color: "secondary.main", // Checked color
                        },
                      }}
                    />
                  }
                  label={item.label}
                  labelPlacement="end"
                />
              ))}
          </RadioGroup>
        </Grid>
      </Grid>
    </form>
  );
}

export default RadioBtn;
