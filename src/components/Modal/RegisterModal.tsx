"use client";
import React from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
type RegisterModalProps = {};

const RegisterModal: React.FC<RegisterModalProps> = () => {
  const [createUserWithEmailAndPassword, user, loading, firebaseError] =
    useCreateUserWithEmailAndPassword(auth);

  const registerBro = () => {
    createUserWithEmailAndPassword("kk@wp.pl", "1234567");
  };
  return (
    <div>
      Have a good coding
      <button onClick={registerBro}>Rejestracja</button>
      <h1>{firebaseError?.message}</h1>
    </div>
  );
};
export default RegisterModal;
