import { USUARIO_AUTENTICADO } from "../../types";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case USUARIO_AUTENTICADO:
      return {
        ...state,
        usuario: action.payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;
