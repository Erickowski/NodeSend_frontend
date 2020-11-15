import React, { useReducer } from "react";

import AppReducer from "./appReducer";
import AppContext from "./appContext";

import {
  MOSTRAR_ALERTA,
  OCULTAR_ALERTA,
  SUBIR_ARCHIVO_EXITO,
  SUBIR_ARCHIVO_ERROR,
  CREAR_ENLACE_EXITO,
  CREAR_ENLACE_ERROR,
} from "../../types";

const AppState = ({ children }) => {
  const initialState = {
    mensaje_archivo: "",
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

  return (
    <AppContext.Provider
      value={{ mensaje_archivo: state.mensaje_archivo, mostrarAlerta }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
