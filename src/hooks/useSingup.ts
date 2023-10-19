import { useState } from "react";
import { appAuth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import useAuthContext from "./useAuthContext";
import useUploadImg from "./useUploadImg.ts";

export default function useSignup() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = (
    email: string,
    password: string,
    displayName: string | null,
    file: File | null
  ) => {
    setError(null);
    setPending(true);

    createUserWithEmailAndPassword(appAuth, email, password)
      .then(async ({ user }) => {
        interface Opt {
          displayName?: string;
          photoURL?: string;
        }

        const opt: Opt = {};

        if (displayName !== null) {
          opt.displayName = displayName;
        }

        if (file !== null) {
          opt.photoURL = await useUploadImg(`profile/${user.uid}`, file);
        }

        dispatch({ type: "login", payload: user });

        if (opt.displayName || opt.photoURL) {
          updateProfile(user, opt)
            .then(() => {
              setError(null);
              setPending(false);
              dispatch({ type: "login", payload: user });
            })
            .catch((err) => {
              setError(err.code);
              setPending(false);
            });
        }
      })
      .catch((err) => {
        if (err.code) {
          setError(err.code);
        } else {
          setError(err.message);
        }

        setPending(false);
      });
  };

  return { error, isPending, signup };
}
