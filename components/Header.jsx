import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import AuthContext from "../context/auth/authContext";
import AppContext from "../context/app/appContext";

const Header = () => {
  // Extraer el usuario autenticado del storage
  const { usuario, usuarioAutenticado, cerrarSesion } = useContext(AuthContext);
  const { limpiarState } = useContext(AppContext);

  const router = useRouter();

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  const redireccionar = () => {
    router.push("/");
    limpiarState();
  };

  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
      <img
        src="/logo.svg"
        alt="Logo"
        className="w-64 mb-8 md:mb-0 cursor-pointer"
        onClick={() => redireccionar()}
      />
      <div>
        {usuario ? (
          <div className="flex items-center">
            <p className="mr-2">Hola {usuario.nombre}</p>
            <button
              type="button"
              className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
              onClick={() => cerrarSesion()}
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <>
            <Link href="/login">
              <a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2">
                Iniciar sesión
              </a>
            </Link>
            <Link href="/crear-cuenta">
              <a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase">
                Crear cuenta
              </a>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
