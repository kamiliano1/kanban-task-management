import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
import ButtonPrimarySmall from "../../Layout/Input/Button/ButtonPrimarySmall";
import { useRecoilState } from "recoil";
import { boardsState } from "@/src/atoms/boardsAtom";
type LoginModalProps = { darkMode: boolean };

const LoginModal: React.FC<LoginModalProps> = ({ darkMode }) => {
  const [boardState, setBoardState] = useRecoilState(boardsState);
  const [error, setError] = useState("");
  type loginUserInputs = {
    email: string;
    password: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginUserInputs>();
  const [signInWithEmailAndPassword, userName, loading, firebaseError] =
    useSignInWithEmailAndPassword(auth);

  const onSubmit: SubmitHandler<loginUserInputs> = (data) => {
    setError("");

    signInWithEmailAndPassword(data.email, data.password);
  };
  useEffect(() => {
    if (userName) setBoardState((prev) => ({ ...prev, open: false }));
  }, [setBoardState, userName]);
  return (
    <Dialog.Portal>
      <Dialog.Content
        className={`data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px]
   translate-x-[-50%] translate-y-[-50%] rounded-[6px] z-[30] ${
     darkMode ? "bg-darkGrey" : "bg-white"
   }
    p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]
    focus:outline-none`}
      >
        <Dialog.Title
          className={` ${darkMode ? "text-white" : "text-black"} text-800 pb-4`}
        >
          Login
        </Dialog.Title>
        <div className="relative">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mb-5">
            <input
              placeholder="Email address"
              type="email"
              className={`text-500 placeholder:text-black
            FormLabel placeholder:opacity-25 px-4 py-2 rounded border-[1px]
             ${
               errors.email
                 ? "border-red"
                 : "border-[rgba(130,_143,_163,_0.25)]"
             }
              w-full ${
                darkMode
                  ? "text-white bg-[#2B2C37] placeholder:text-white"
                  : "text-black placeholder:text-black"
              }`}
              {...register("email", {
                required: true,
              })}
            />
            {errors.email && (
              <span className="absolute text-red text-500 left-[70%] top-[.6rem]">
                Can`t be empty
              </span>
            )}
            {/* {firebaseError?.message && (
            <span className="absolute text-red text-500 left-[70%] top-[.6rem]">
              Wrong email or password
            </span>
          )} */}
            <input
              placeholder="Password"
              type="password"
              className={`text-500 placeholder:text-black
            FormLabel placeholder:opacity-25 px-4 py-2 rounded border-[1px]
             ${
               errors.password
                 ? "border-red"
                 : "border-[rgba(130,_143,_163,_0.25)]"
             }
              w-full ${
                darkMode
                  ? "text-white bg-[#2B2C37] placeholder:text-white"
                  : "text-black placeholder:text-black"
              }`}
              {...register("password", {
                required: true,
              })}
            />
            <ButtonPrimarySmall buttonLabel="Login" loading={loading} />
          </form>
        </div>

        <p className={`mt-5 ${darkMode ? "text-white" : "text-black"}`}>
          Don`t have an account?{" "}
          <span className="ml-3 text-lightPurple hover:text-purple cursor-pointer">
            Sign Up
          </span>
        </p>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
export default LoginModal;
