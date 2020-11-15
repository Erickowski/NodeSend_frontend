import { useContext, useEffect } from "react";

import Layout from "../components/Layout";

import AuthContext from "../context/auth/authContext";

export default function Home() {
  // Extraer el usuario autenticado del Storage
  const { usuarioAutenticado } = useContext(AuthContext);

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  return (
    <Layout>
      <h1>Hola mundo</h1>
    </Layout>
  );
}
