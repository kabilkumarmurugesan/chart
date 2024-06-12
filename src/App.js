import "./App.css";
import Laoyout from "./component/Layout/Laoyout";
import MUIWrapper from "./component/MUIWrapper";

function App() {
  return (
    <div className="App">
      <MUIWrapper>
        <Laoyout />
      </MUIWrapper>
    </div>
  );
}

export default App;
