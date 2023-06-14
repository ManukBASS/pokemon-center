import React, { useContext, useEffect, useState } from "react";
import ContextoFormulario from "../../context/ContextoFormulario";
import PropTypes from "prop-types";
import { useMutation } from "react-query";

const Detalle = () => {
  const { formulario } = useContext(ContextoFormulario);
  const [detalleFormulario, setDetalleFormulario] = useState({});

  useEffect(() => {
    /**
     * actualiza el detalle del formulario cuando el formulario cambia
     * @author Manuel Zarraga
     * @param {Object} formulario - el formulario actualizado
     * @returns {void}
     */
    setDetalleFormulario({
      nombre: formulario.entrenador.nombre,
      apellido: formulario.entrenador.apellido,
      email: formulario.entrenador.email,
      nombrePokemon: formulario.pokemon.nombrePokemon,
      tipoPokemon: formulario.pokemon.tipoPokemon,
      tipoPokemonDos: formulario.pokemon.tipoPokemonDos,
      elemento: formulario.pokemon.elemento,
      altura: formulario.pokemon.altura,
      edad: formulario.pokemon.edad,
      especie: formulario.pokemon.especie,
    });  
  }, [formulario]);

  const capitalizeFirstLetter = (string) => {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return "";
  };

  const enviarFormulario = async (formulario) => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formulario),
      });
  
      if (response.ok) {
        alert("Solicitud enviada :)");
        return await response.json();
      } else {
        throw new Error("Error al enviar el formulario");
      }
    } catch (error) {
      throw new Error("Error al enviar el formulario");
    }
  };

  const mutation = useMutation(enviarFormulario);

  return (
    <div className="detalle-formulario">
      <div className="encabezado">
        <h3>Vista Previa de la Solicitud</h3>
      </div>
      <section className="datos-cliente">
        <h4>Datos del Entrenador</h4>
        <div className="fila">
          <p>Nombre: {detalleFormulario?.nombre}</p>
          <p>Apellido: {detalleFormulario?.apellido}</p>
          <p>Email: {detalleFormulario?.email}</p>
        </div>
      </section>
      <section className="datos-cliente">
        <h4>Datos del Pokémon</h4>
        <div className="fila">
          <p>Nombre: {detalleFormulario?.nombrePokemon}</p>
          <p>
            Tipo: {capitalizeFirstLetter(detalleFormulario?.tipoPokemon)} -{" "}
            {capitalizeFirstLetter(detalleFormulario?.tipoPokemonDos)}
          </p>
          <p>Altura: {detalleFormulario?.altura}</p>
          <p>Edad: {detalleFormulario?.edad}</p>
          <p>Especie: {capitalizeFirstLetter(detalleFormulario?.especie)}</p>
        </div>
      </section>

      <div className="estado-peticion">
        {mutation.isLoading && <p>Enviando formulario...</p>}
        {mutation.isError && (
          <p>
            No hemos podido enviar el formulario, por favor intente nuevamente
          </p>
        )}
      </div>

      <button
        className="boton-enviar"
        onClick={() => mutation.mutate(formulario)}
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? "Enviando..." : "Enviar Solicitud"}
      </button>
    </div>
  );
};

Detalle.propTypes = {
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
  }),
};

export default Detalle;
