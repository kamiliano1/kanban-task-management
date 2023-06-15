"use client";
import React, { useEffect, useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../firebase/clientApp";
import * as Dialog from "@radix-ui/react-dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import ButtonPrimarySmall from "../../Layout/Input/Button/ButtonPrimarySmall";
import { useRecoilState } from "recoil";
import { modalState } from "@/src/atoms/modalAtom";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { boardsState } from "@/src/atoms/boardsAtom";
type RegisterModalProps = { darkMode: boolean };
type createUserInputs = {
  email: string;
  password: string;
  repeatPassword: string;
};
const RegisterModal: React.FC<RegisterModalProps> = ({ darkMode }) => {
  const [modalsState, setModalsState] = useRecoilState(modalState);
  const [boardState, setBoardState] = useRecoilState(boardsState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createUserInputs>();

  const [
    createUserWithEmailAndPassword,
    userCredentials,
    loading,
    firebaseError,
  ] = useCreateUserWithEmailAndPassword(auth);
  const [error, setError] = useState("");
  const onSubmit: SubmitHandler<createUserInputs> = (data) => {
    if (data.password.length < 6) {
      setError("Pasword must contain at least 6 characters");
      return;
    }
    if (data.password !== data.repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    createUserWithEmailAndPassword(data.email, data.password);
    if (firebaseError?.message)
      setError("A user with that email already exists");
  };
  useEffect(() => {
    const createUserDocument = async (user: User) => {
      const userDocRef = doc(firestore, "users", user.uid);
      await setDoc(
        userDocRef,
        JSON.parse(JSON.stringify({ ...user, board: [] }))
      );
    };
    if (userCredentials) {
      createUserDocument(userCredentials.user);
      setModalsState((prev) => ({ ...prev, open: false }));
      setBoardState([]);
    }
  }, [setBoardState, setModalsState, userCredentials]);

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
          Register
        </Dialog.Title>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mb-5">
          <div className="relative">
            <input
              placeholder="Email address"
              type="email"
              autoComplete="username"
              className={`text-500 placeholder:text-black
          FormLabel placeholder:opacity-25 px-4 py-2 rounded border-[1px]
           ${errors.email ? "border-red" : "border-[rgba(130,_143,_163,_0.25)]"}
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
              <span className="absolute text-red text-500 left-[70%] top-[.5rem]">
                Can`t be empty
              </span>
            )}
          </div>
          <div className="relative">
            <input
              placeholder="Password"
              type="password"
              autoComplete="new-password"
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
            {errors.password && (
              <span className="absolute text-red text-500 left-[70%] top-[.5rem]">
                Can`t be empty
              </span>
            )}
          </div>
          <div className="relative">
            <input
              placeholder="Repeat password"
              type="password"
              autoComplete="new-password"
              className={`text-500 placeholder:text-black
          FormLabel placeholder:opacity-25 px-4 py-2 rounded border-[1px]
           ${
             errors.repeatPassword
               ? "border-red"
               : "border-[rgba(130,_143,_163,_0.25)]"
           }
            w-full ${
              darkMode
                ? "text-white bg-[#2B2C37] placeholder:text-white"
                : "text-black placeholder:text-black"
            }`}
              {...register("repeatPassword", {
                required: true,
              })}
            />
            {errors.repeatPassword && (
              <span className="absolute text-red text-500 left-[70%] top-[.5rem]">
                Can`t be empty
              </span>
            )}
          </div>
          {error && (
            <p className={`text-500 ${darkMode ? "text-white" : "text-black"}`}>
              {error}
            </p>
          )}
          {/* {firebaseError?.message && (
            <p className={`text-500 ${darkMode ? "text-white" : "text-black"}`}>
              A user with that email already exists
            </p>
          )} */}
          <ButtonPrimarySmall buttonLabel="Register" loading={loading} />
        </form>

        <p className={`mt-5 ${darkMode ? "text-white" : "text-black"}`}>
          Already have an account?
          <span
            className="ml-3 text-lightPurple hover:text-purple cursor-pointer"
            onClick={() =>
              setModalsState((prev) => ({ ...prev, view: "login" }))
            }
          >
            Login
          </span>
        </p>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
export default RegisterModal;
