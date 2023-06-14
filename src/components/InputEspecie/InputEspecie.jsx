import React, { useState, useContext } from "react";
import { useQuery } from "react-query";
import ContextoFormulario from "../../context/ContextoFormulario";

const InputEspecie = ({ name, label }) => {
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [offset, setOffset] = useState(0);
  const { dispatch } = useContext(ContextoFormulario);

  const handleInputBlur = (valorInput) => {
    const newValue = valorInput.valor;

    dispatch({
      type: "ACTUALIZAR_POKEMON",
      payload: {
        type: name,
        valor: newValue,
      },
    });
  };

  const { data: especies, isLoading } = useQuery(
    ["especies", offset],
    async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/?offset=${offset}&limit=20`
      );
      const data = await response.json();
      return data.results;
    }
  );

  const elegirEspecie = (e, nombreEspecie) => {
    e.preventDefault();

    handleInputBlur({
      campo: "especie",
      valor: nombreEspecie,
    });
    setMostrarPopup(false);
  };

  const renderizarEspecies = () => {
    if (isLoading) {
      return <p>Cargando especies...</p>;
    }

    return (
      <>
        {especies.map((especie) => (
          <button
            key={especie.name}
            className="botones-especie"
            onClick={(e) => elegirEspecie(e, especie.name)}
          >
            {especie.name}
          </button>
        ))}
      </>
    );
  };

  const handlePaginaAnterior = () => {
    if (offset > 0) {
      setOffset(offset - 20);
    }
  };

  const handlePaginaSiguiente = () => {
    setOffset(offset + 20);
  };

  const isFirstPage = offset === 0;
  const isLastPage = especies && especies.length < 20;

  return (
    <div className="input-contenedor input-especie-container">
      {mostrarPopup && (
        <div className="popup-especie">
          <button
            className="cerrar-popup"
            onClick={() => setMostrarPopup(false)}
          >
            <strong>X</strong>
          </button>
          <h4>Seleccionar especie</h4>
          <div className="contenedor-especies">{renderizarEspecies()}</div>
          <div className="paginador">
            <button
              className="boton-anterior"
              onClick={handlePaginaAnterior}
              disabled={isFirstPage}
            >
              Anterior
            </button>
            <button
              className="boton-siguiente"
              onClick={handlePaginaSiguiente}
              disabled={isLastPage}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
      <p htmlFor={name}>{label}</p>
      <button
        className="boton-seleccionar boton-seleccionar-especies"
        onClick={() => setMostrarPopup(true)}
      >
        Seleccionar
      </button>
    </div>
  );
};

export default InputEspecie;
