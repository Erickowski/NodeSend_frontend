import React, { useReducer } from "react";

import AuthContext from "./authContext";
import AuthReducer from "./authReducer";

import { USUARIO_AUTENTICADO } from "../../types";

const AuthState = ({ children }) => {
  // definir un state inicial
  const initialState = {
    token: "",
    autenticado: null,
    usuario: null,
    mensaje: null,
  };

  // Definir el reducer
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Registrar nuevos usuarios
  const registrarUsuario = (datos) => {};

  // Usuario autenticado
  const usuarioAutenticado = (nombre) => {
    dispatch({
      type: USUARIO_AUTENTICADO,
      payload: nombre,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        toke: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        usuarioAutenticado,
        registrarUsuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
