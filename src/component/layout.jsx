import React, { useEffect, useState } from "react";
import BarChart from "./charts/BarChart";
import { Box } from "@mui/material";
import BasicTable from "./Table/Table";
import BarChartCopy from "./charts/BarChartCopy";
import SingleChart from "./charts/SingleChart";

const MainLayout = () => {
  const [showChart, setShowChart] = useState(1);

  useEffect(() => {
    const timer = setInterval(switchView, 20000);

    return () => clearInterval(timer);
  }, []);

  const switchView = () => {
    setShowChart((prevView) => {
      return prevView === 3 ? 1 : prevView + 1;
    });
  };

  return (
    <>
      {showChart === 1 ? (
        <>
          <Box
            style={{ display: "flex", flexDirection: "row", padding: "20px" }}
          >
            <Box style={{ flex: "1 1", border: "1px solid red" }}>
              <>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    padding: "10px",
                    justifyContent: "space-between",
                    border: "1px solid red",
                  }}
                >
                  <Box style={{ border: "1px solid red", padding: "5px" }}>
                    Data- 29/05/2024
                  </Box>
                  <Box style={{ border: "1px solid red", padding: "5px" }}>
                    Shift - 2
                  </Box>
                  <Box style={{ border: "1px solid red", padding: "5px" }}>
                    Time - 07:30
                  </Box>
                </Box>
                <BarChart />
              </>
            </Box>
            <Box style={{ flex: "1 1 ", border: "1px solid red" }}>
              <>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    padding: "10px",
                    justifyContent: "space-between",
                    border: "1px solid red",
                  }}
                >
                  <Box style={{ border: "1px solid red", padding: "5px" }}>
                    Data- 30/05/2024
                  </Box>

                  <Box style={{ border: "1px solid red", padding: "5px" }}>
                    Shift - 1
                  </Box>
                  <Box style={{ border: "1px solid red", padding: "5px" }}>
                    Time - 07:30
                  </Box>
                </Box>
                <BarChartCopy />
              </>
            </Box>
          </Box>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <Box
              style={{ display: "flex", flexDirection: "row", padding: "20px" }}
            >
              <Box style={{ flex: "1 1", border: "1px solid red" }}>
                <BasicTable />
              </Box>
              <Box style={{ flex: "1 1", border: "1px solid red" }}>
                <BasicTable />
              </Box>
            </Box>
          </Box>
        </>
      ) : showChart === 2 ? (
        <Box style={{ display: "flex", flexDirection: "row" }}>
          <Box style={{ flex: "1 2 50%" }}>
            <BarChartCopy />
          </Box>
          <Box style={{ flex: "1 1" }}>
            <Box style={{ display: "flex", flexDirection: "column" }}>
              <Box style={{ padding: "10px" }}>Shift Actual : 15 </Box>
              <Box style={{ padding: "10px" }}>Shift Target : 15 </Box>
              <Box style={{ padding: "10px" }}>Shift UPH : 15 </Box>
              <Box style={{ padding: "10px" }}>Shift Down Time : 15 </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box>
          <SingleChart />
        </Box>
      )}
    </>
  );
};
export default MainLayout;
