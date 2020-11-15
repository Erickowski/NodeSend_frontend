import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import clienteAxios from "../../config/axios";

import Layout from "../../components/Layout";

export async function getServerSideProps({ params: { enlace } }) {
  const respuesta = await clienteAxios.get(`/api/enlaces/${enlace}`);
  return {
    props: {
      enlace: respuesta.data,
    },
  };
}

export async function getServerSidePaths() {
  const respuesta = await clienteAxios.get("/api/enlaces");
  return {
    paths: respuesta.data.enlaces.map((enlace) => ({
      params: { enlace: enlace.url },
    })),
    fallback: false,
  };
}

export default function Enlace({ enlace }) {
  const [password, setPassword] = useState(enlace.password);

  const verificarPassword = (e) => {
    e.preventDefault();
    console.log("Verificando...");
  };

  return (
    <Layout>
      {password ? (
        <>
          <p className="text-center">
            Este enlace está protegido por un password, colocalo a continuación
          </p>
          <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
              <form
                action=""
                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                onSubmit={(e) => verificarPassword(e)}
              >
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-black text-sm font-bold mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    placeholder="Password del archivo"
                  />
                </div>
                <input
                  type="submit"
                  className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                  value="Validar password"
                />
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl text-center text-gray-700">
            Descarga tu archivo:
          </h1>
          <div className="flex item-center justify-center mt-10">
            <a
              href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`}
              className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
            >
              Aquí
            </a>
          </div>
        </>
      )}
    </Layout>
  );
}
