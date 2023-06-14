import React, { useContext, useState } from "react";
import ContextoFormulario from "../../context/ContextoFormulario";
import PropTypes from "prop-types";
import { useQuery } from "react-query";


const fetchTypes = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/type/");
  const data = await response.json();
  return data;
};

const Input = ({ name, label, type = "text" }) => {
  const { formulario, dispatch } = useContext(ContextoFormulario);
  const [inputValue, setInputValue] = useState(
    formulario.entrenador[name] || ""
  );

  const { data, isLoading, error } = useQuery("types", fetchTypes);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al obtener los tipos de Pokémon</div>;
  }

  const types = data.results.map((type) => type.name);

  /**
   * maneja el evento de cambio del campo de entrada y actualiza
   * el valor del campo de entrada y el estado global del formulario
   * @author Manuel Zarraga
   * @param {Object} e - evento de cambio del campo de entrada
   * @returns {void}
   */
  const onChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    dispatch({
      type: formulario.pokemon.hasOwnProperty(name)
        ? "ACTUALIZAR_POKEMON" // acción que actualiza los datos del pokemon
        : "ACTUALIZAR_ENTRENADOR", // acción que actualiza los datos del entrenador
      payload: {
        type: name,
        valor: newValue,
      },
    });
  };

  /**
   * maneja el evento de blur del campo de entrada y actualiza el
   * estado global del formulario con el valor actual del campo de entrada
   * @author Manuel Zarraga
   * @param {Object} e- evento de cambio del campo de salida
   * @returns {void}
   */
  const onBlur = (e) => {
    e.preventDefault();

    dispatch({
      type: formulario.pokemon.hasOwnProperty(name)
        ? "ACTUALIZAR_POKEMON" // acción que actualiza los datos del pokemon
        : "ACTUALIZAR_ENTRENADOR", // acción que actualiza los datos del entrenador
      payload: {
        type: name,
        valor: inputValue,
      },
    });
  };

  /**
   * maneja la selección del tipo de Pokémon desde la lista desplegable
   * @author Manuel Zarraga
   * @param {Object} e - evento de cambio de selección
   * @returns {void}
   */
  const handleTypeSelection = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  
    const formattedValue = newValue.charAt(0).toUpperCase() + newValue.slice(1);
  
    dispatch({
      type: "ACTUALIZAR_POKEMON",
      payload: {
        type: name,
        valor: formattedValue,
      },
    });
  };

  return (
    <div className="input-contenedor">
      <label htmlFor={name}>{label}</label>
      {name === "tipoPokemon" ? (
        <select className="input-contenedor" value={inputValue} id={name} onChange={handleTypeSelection}>
          <option value="">Seleccionar tipo...</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={inputValue}
          id={name}
          onChange={onChange}
          onBlur={onBlur}
          disabled={isLoading || error}
        />
      )}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default Input;
