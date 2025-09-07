import React, { useState } from "react";
import { LoginForm } from "../components/login-form";
import { useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // need to ask how to pass props and functions
  if (!isLoaded) {
    return null;
  }
  const handleSubmit = async (e, email, password) => {
    setIsloading(true);
    e.preventDefault();

    if (!isLoaded) {
      return null;
    }
    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/dashboard");
      } else {
        console.error(JSON.stringify(result, null, 2));
      }
    } catch (err) {
      console.error("error", err.errors[0].message);
      setError(err.errors[0].message);
    } finally {
      setIsloading(false)
    }

    console.log(email, password);
  };
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm handleSubmit={handleSubmit} isloading={isloading} errorState={{error,setError}}/>
      </div>
    </div>
  );
};

export default Login;
