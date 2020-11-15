import { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import AuthContext from "../context/auth/authContext";

import Layout from "../components/Layout";
import Alerta from "../components/Alerta";

export default function Login() {
  const { mensaje, iniciarSesion } = useContext(AuthContext);

  // Formulario y validación con formik y yup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El email no es válido")
        .required("El email es obligatorio"),
      password: Yup.string().required("El password no puede ir vacio"),
    }),
    onSubmit: (valores) => {
      iniciarSesion(valores);
    },
  });

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">
          Iniciar sesión
        </h2>
        {mensaje && <Alerta />}
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            <form
              action=""
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-black text-sm font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  placeholder="Email del usuario"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.email}</p>
                  </div>
                )}
              </div>
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
                  placeholder="Password del usuario"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.password}</p>
                  </div>
                )}
              </div>
              <input
                type="submit"
                className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                value="Iniciar sesión"
              />
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
