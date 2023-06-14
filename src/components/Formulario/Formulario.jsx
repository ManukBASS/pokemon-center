import React from "react";
import { Link } from "react-router-dom";
import pokebola from "../../assets/pokebola.png";
import entrenador from "../../assets/entrenador.png";
import pikachu from "../../assets/pikachu.png";
import Input from "../Input/Input";
import Detalle from "./Detalle";
import ContextoFormulario, {
  ContextoProvider,
} from "../../context/ContextoFormulario";
import { useContext } from "react";
import InputTipoDos from "../Input/InputTipoDos";
import InputEspecie from "../InputEspecie/InputEspecie";

const Formulario = () => {
  const { formulario, dispatch } = useContext(ContextoFormulario);

  const actualizarEntrenador = (campo, valor) => {
    dispatch({
      type: "ACTUALIZAR_ENTRENADOR",
      payload: { type: campo, valor },
    });
  };

  const actualizarPokemon = (campo, valor) => {
    dispatch({
      type: "ACTUALIZAR_POKEMON",
      payload: { type: campo, valor },
    });
  };

  return (
    <>
      <header className="form-header">
        <div>
          <img src={pokebola} alt="pokebola" />
          <h2>Centro Pokemon de Ash</h2>
        </div>
        <Link className="volver" to="/">
          Home
        </Link>
      </header>
      <div className="formulario-ingreso">
        <h3>Solicitud de atención</h3>
        <p>
          Por favor, completa el formulario para que podamos atender a tu
          pokémon
        </p>
        <div className="cuerpo-formulario">
          <ContextoProvider value={{ formulario, dispatch }}>
            <div className="inputs">
              <div>
                <p className="nombre-seccion">
                  <img src={entrenador} alt="entrenador" />
                  <span>ENTRENADOR</span>
                </p>
                <Input
                  name="nombre"
                  label="Nombre"
                  value={formulario.entrenador.nombre}
                  onChange={(e) =>
                    actualizarEntrenador("nombre", e.target.value)
                  }
                />
                <Input
                  name="apellido"
                  label="Apellido"
                  value={formulario.entrenador.apellido}
                  onChange={(e) =>
                    actualizarEntrenador("apellido", e.target.value)
                  }
                />
                <Input
                  name="email"
                  label="Email"
                  type="email"
                  value={formulario.entrenador.email}
                  onChange={(e) =>
                    actualizarEntrenador("email", e.target.value)
                  }
                />
              </div>
              <div>
                <p className="nombre-seccion">
                  <img src={pikachu} alt="pikachu" />
                  <span>POKEMON</span>
                </p>
                <Input
                  name="nombrePokemon"
                  label="Nombre"
                  value={formulario.pokemon.nombrePokemon}
                  onChange={(e) => actualizarPokemon("nombrePokemon", e.target.value)}
                />
                <Input
                  name="tipoPokemon"
                  label="Tipo"
                  value={formulario.pokemon.tipoPokemon}
                  onChange={(e) =>
                    actualizarPokemon("tipoPokemon", e.target.value)
                  }
                />
                <InputTipoDos
                  name="tipoPokemonDos"
                  label="Tipo 2"
                  inputValue={formulario.pokemon.tipoPokemon2}
                  onChange={(e) =>
                    actualizarPokemon("tipoPokemon2", e.target.value)
                  }
                />
                <Input
                  name="altura"
                  label="Altura"
                  value={formulario.pokemon.altura}
                  onChange={(e) => actualizarPokemon("altura", e.target.value)}
                />
                <Input
                  name="edad"
                  label="Edad"
                  value={formulario.pokemon.edad}
                  onChange={(e) => actualizarPokemon("edad", e.target.value)}
                />
                <InputEspecie
                  name="especie"
                  label="Especie"
                  value={formulario.pokemon.especie}
                  onChange={(e) => actualizarPokemon("especie", e.target.value)}
                />
              </div>
            </div>
            <Detalle />
          </ContextoProvider>
        </div>
      </div>
    </>
  );
};

export default Formulario;