import { useTheme } from "@mui/material";
import "./App.css";
import Laoyout from "./component/Layout/Laoyout";

function App() {
  const theme = useTheme();
  const { primary, secondary } = theme.palette;
  return (
    <div className="App" style={{ background: primary.main }}>
      <Laoyout />
    </div>
  );
}

export default App;
