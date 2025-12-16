import "./App.css";
import { Routes, Route } from "react-router-dom";
import JeuPrincipal from "./pages/JeuPrincipal";
import Timer from "./components/Timer";
// import EcranFin from "./pages/EcranFin"; // Tu peux décommenter quand tu l'auras créé

function App() {
  return (
    <Routes>
      <Route path="/a" element={<Timer />} />
      <Route path="/" element={<JeuPrincipal />} />
      {/* <Route path="/fin" element={<EcranFin />} /> */}
    </Routes>
  );
}

export default App;
