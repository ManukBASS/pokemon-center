import { useContext } from "react";
import PropTypes from "prop-types";
import ContextoFormulario from "../../context/ContextoFormulario";
import { useQuery } from "react-query";

const fetchTypes = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/type/");
  const data = await response.json();
  return data;
};

const InputTipoDos = ({ name, label }) => {
  const { formulario, dispatch } = useContext(ContextoFormulario);

  const { data, isLoading, error } = useQuery("types", fetchTypes);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al obtener los tipos de Pokémon</div>;
  }

  const types = data.results.map((type) => type.name);

  const handleTypeSelection = (e) => {
    const newValue = e.target.value;

    dispatch({
      type: "ACTUALIZAR_POKEMON",
      payload: {
        type: name,
        valor: newValue,
      },
    });
  };

  return (
    <div className="input-contenedor">
      <label htmlFor={name}>{label}</label>
      <select
        className="input-contenedor"
        value={formulario.pokemon[name] || ""}
        id={name}
        onChange={handleTypeSelection}
      >
        <option value="">Seleccionar tipo secundario...</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

InputTipoDos.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default InputTipoDos;

