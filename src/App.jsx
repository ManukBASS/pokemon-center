import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Formulario from "./components/Formulario/Formulario";
import "./App.css";
import { ContextoProvider } from "./context/ContextoFormulario";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ContextoProvider>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/formularioIngreso" element={<Formulario />} />
          </Routes>
        </ContextoProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
