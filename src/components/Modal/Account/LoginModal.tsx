import { boardsState } from "@/src/atoms/boardsAtom";
import { modalState } from "@/src/atoms/modalAtom";
import { settingsModalState } from "@/src/atoms/settingsModalAtom";
import { auth, firestore } from "@/src/firebase/clientApp";
import * as Dialog from "@radix-ui/react-dialog";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import ButtonPrimarySmall from "../../Layout/Input/Button/ButtonPrimarySmall";
type LoginModalProps = { darkMode: boolean };

const LoginModal: React.FC<LoginModalProps> = ({ darkMode }) => {
  const [settingState, setSettingsState] = useRecoilState(settingsModalState);
  const [modalsState, setModalsState] = useRecoilState(modalState);
  const [user] = useAuthState(auth);
  const [boardState, setBoardState] = useRecoilState(boardsState);
  type loginUserInputs = {
    email: string;
    password: string;
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<loginUserInputs>();
  const [signInWithEmailAndPassword, userName, loading, firebaseError] =
    useSignInWithEmailAndPassword(auth);

  const onSubmit: SubmitHandler<loginUserInputs> = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };
  useEffect(() => {
    const getUserData = async () => {
      try {
        const userDataRef = doc(firestore, "users", user!.uid);
        const userData = await getDoc(userDataRef);
        const bookmarkData = userData.data();
        if (bookmarkData) {
          setBoardState(bookmarkData.board || []);
          setSettingsState((prev) => ({
            ...prev,
            darkMode: bookmarkData.isDarkMode,
            isSidebarOpen: bookmarkData.isSidebarOpen,
            activeBoard: bookmarkData.activeBoard,
          }));
        }
      } catch (error: any) {
        console.log("getBookmarkError", error.message);
      }
    };
    if (userName) {
      setModalsState((prev) => ({ ...prev, open: false }));
      reset({ email: "", password: "" });
      getUserData();
    }
  }, [reset, setBoardState, setModalsState, setSettingsState, user, userName]);
  return (
    <>
      <Dialog.Title
        className={` ${darkMode ? "text-white" : "text-black"} text-800 pb-4`}
      >
        Login
      </Dialog.Title>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mb-5">
        <div className="relative">
          <input
            placeholder="Email address"
            type="email"
            autoComplete="username"
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
            <span className="absolute text-red text-500 left-[70%] top-[.5rem]">
              Can`t be empty
            </span>
          )}
        </div>
        <div className="relative">
          <input
            placeholder="Password"
            type="password"
            autoComplete="current-password"
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
        {firebaseError?.message && (
          <p className={`text-500 ${darkMode ? "text-white" : "text-black"}`}>
            Invalid email or password
          </p>
        )}
        <ButtonPrimarySmall buttonLabel="Login" loading={loading} />
      </form>

      <p className={`mt-5 ${darkMode ? "text-white" : "text-black"}`}>
        Don`t have an account?
        <span
          className="ml-3 text-lightPurple hover:text-purple cursor-pointer"
          onClick={() =>
            setModalsState((prev) => ({ ...prev, view: "register" }))
          }
        >
          Sign Up
        </span>
      </p>
    </>
  );
};
export default LoginModal;
