import { REGISTRO_EXITOSO } from "../../types";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case REGISTRO_EXITOSO:
      return {
        ...state,
        mensaje: action.payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;
