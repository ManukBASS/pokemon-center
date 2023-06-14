import React, { useReducer } from "react";
import PropTypes from "prop-types";

const initialState = {
  mostrarPopup: false,
  entrenador: {
    nombre: "",
    apellido: "",
    email: "",
  },
  pokemon: {
    nombrePokemon: "",
    tipoPokemon: "",
    tipoPokemonDos: "",
    elemento: "",
    altura: "",
    edad: "",
    especie: "",
  },
};

/**
 * reducer para actualizar el estado del formulario
 * @author Manuel Zarraga
 * @param {Object} state - estado actual del formulario
 * @param {Object} action - acción a realizar en el reducer
 * @returns {Object} - nuevo estado del formulario después de la acción
 */
const reducer = (state, action) => {
  switch (action.type) {
    case "ACTUALIZAR_ENTRENADOR":
      return {
        ...state,
        entrenador: {
          ...state.entrenador,
          [action.payload.type]: action.payload.valor,
        },
      };
    case "ACTUALIZAR_POKEMON":
      return {
        ...state,
        pokemon: {
          ...state.pokemon,
          [action.payload.type]: action.payload.valor,
        },
      };
    case "MOSTRAR_POPUP":
      return {
        ...state,
        mostrarPopup: true,
      };
    case "OCULTAR_POPUP":
      return {
        ...state,
        mostrarPopup: false,
      };

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

/**
 * contexto del formulario
 * @author Manuel Zarraga
 * @type {React.Context}
 */
const ContextoFormulario = React.createContext();

/**
 * proveedor de contexto para que el formulario pueda trabajar
 * @author Manuel Zarraga
 * @param {Object} props - propiedades del componente
 * @param {React.ReactNode} props.children - componentes hijos
 * @returns {JSX.Element} - componente del proveedor de contexto
 */
export const ContextoProvider = ({ children }) => {
  const [formulario, dispatch] = useReducer(reducer, initialState);

  ContextoProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <ContextoFormulario.Provider value={{ formulario, dispatch }}>
      {children}
    </ContextoFormulario.Provider>
  );
};

ContextoFormulario.propTypes = {
  formulario: PropTypes.shape({
    entrenador: PropTypes.shape({
      nombre: PropTypes.string.isRequired,
      apellido: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
    pokemon: PropTypes.shape({
      nombrePokemon: PropTypes.string.isRequired,
      tipoPokemon: PropTypes.string.isRequired,
      tipoPokemonDos: PropTypes.string,
      elemento: PropTypes.string.isRequired,
      altura: PropTypes.string.isRequired,
      edad: PropTypes.string.isRequired,
      especie: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default ContextoFormulario;
