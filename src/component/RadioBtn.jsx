import { FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material";
import React, { useState } from "react";

function RadioBtn(props) {
  const [inputs, setInputs] = useState(15);

  const handleInputChange = (event) => {
    event.persist();
    setInputs(event.target.value);
  };

  return (
    <form noValidate>
      <Grid container>
        <Grid item xs={12}>
          <RadioGroup
            aria-label="one"
            name="one"
            row
            value={inputs}
            onChange={handleInputChange}
          >
            {props.list &&
              props.list.map((item, index) => (
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
