import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  LIMPIAR_ALERTA,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
} from "../../types";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case REGISTRO_EXITOSO:
    case REGISTRO_ERROR:
    case LOGIN_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };
    case LIMPIAR_ALERTA:
      return {
        ...state,
        mensaje: null,
      };
    case LOGIN_EXITOSO:
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        token: action.payload,
        autenticado: true,
      };
    default:
      return state;
  }
};

export default AuthReducer;
