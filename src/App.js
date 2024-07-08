import "./App.css";
import MUIWrapper from "./component/MUIWrapper";
import AppRouter from "./router";

function App() {
  return (
    <div className="App">
      <MUIWrapper>
        <AppRouter />{" "}
      </MUIWrapper>
    </div>
  );
}

export default App;
