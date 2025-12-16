import "./App.css";
import { Routes, Route } from "react-router-dom";
import JeuPrincipal from "./pages/JeuPrincipal";
import EcranFin from "./pages/EcranFin";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/escape" element={<JeuPrincipal />} />
      <Route path="/fin" element={<EcranFin />} />
    </Routes>
  );
}

export default App;
