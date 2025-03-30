import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./pages/Game";
import Menu from "./pages/Menu";
import { GlobalStyles } from "./ui/GlobalStyles";
import Error from "./ui/Error";

function App() {
  return (
    <>
      <GlobalStyles />
      {!window.matchMedia("(max-width: 768px)").matches ? (
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Menu />} />
              <Route path="/play" element={<Game />} />
            </Routes>
          </BrowserRouter>
        </>
      ) : (
        <Error>Sorry but the mobile version isn't out yet😁</Error>
      )}
    </>
  );
}

export default App;
