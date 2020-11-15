import React, { useReducer } from "react";

import AppReducer from "./appReducer";
import AppContext from "./appContext";

import clienteAxios from "../../config/axios";

import {
  MOSTRAR_ALERTA,
  OCULTAR_ALERTA,
  SUBIR_ARCHIVO,
  SUBIR_ARCHIVO_EXITO,
  SUBIR_ARCHIVO_ERROR,
  CREAR_ENLACE_EXITO,
  CREAR_ENLACE_ERROR,
} from "../../types";

const AppState = ({ children }) => {
  const initialState = {
    mensaje_archivo: "",
    nombre: "",
    nombre_original: "",
    cargando: null,
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Muestra una alerta
  const mostrarAlerta = (msg) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: msg,
    });
    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA,
      });
    }, 3000);
  };

  // Subir al archivos al servidor
  const subirArchivo = async (archivo, nombreArchivo) => {
    dispatch({
      type: SUBIR_ARCHIVO,
    });
    try {
      const respuesta = await clienteAxios.post("/api/archivos", archivo);
      dispatch({
        type: SUBIR_ARCHIVO_EXITO,
        payload: {
          nombre: respuesta.data.archivo,
          nombre_original: nombreArchivo,
        },
      });
    } catch (error) {
      dispatch({
        type: SUBIR_ARCHIVO_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        mensaje_archivo: state.mensaje_archivo,
        nombre: state.nombre,
        nombre_original: state.nombre_original,
        cargando: state.cargando,
        mostrarAlerta,
        subirArchivo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
