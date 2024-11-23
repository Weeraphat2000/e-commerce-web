"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import { setTokens } from "@/app/utils/local-storage";
import { useUserStore } from "@/app/provider/user-provider";
import { useRouter } from "next/navigation";

interface ILoginProps {}

const schema = yup.object().shape({
  email: yup.string().email().required("กรุณากรอกอีเมล์"),
  password: yup.string().required("กรุณากรอกรหัสผ่าน"),
});

const Login: React.FunctionComponent<ILoginProps> = (props) => {
  const { id, setUser, login } = useUserStore((store) => store);
  const navigate = useRouter();
  console.log(id);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { role } = await login(data);
      toast.success("Login success");

      if (role === "admin") {
        navigate.push("/admin");
      }
      if (role === "user") {
        navigate.push("/");
      }

      // const response = await axios.post("/auth/login", {
      //   email: data.email,
      //   password: data.password,
      // });
      // setTokens(response.data.token);
      // setUser({
      //   id: response.data.user.id,
      //   email: response.data.user.email,
      //   role: response.data.user.role,
      //   name: response.data.user.name,
      //   picture: response.data.user.picture,
      //   enabled: response.data.user.enabled,
      //   address: response.data.user.address,
      // });
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  });

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen py-2"
      style={{ backgroundColor: "#f7f7f7" }}
    >
      <h1 className="text-2xl font-bold">Login</h1>

      <form onSubmit={onSubmit} className="w-full max-w-md">
        <div className="flex flex-col mt-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="p-2 border border-gray-300 rounded mt-1"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col mt-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="p-2 border border-gray-300 rounded mt-1"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-4"
          disabled={isSubmitting || !isDirty}
        >
          {isSubmitting ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
