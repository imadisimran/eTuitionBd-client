import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase.config";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // console.log(user)

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider).finally(() =>
      setLoading(false),
    ); // Added finally
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth).finally(() => setLoading(false)); // Added finally
  };

  const signUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).finally(() =>
      setLoading(false),
    ); // Added finally
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() =>
      setLoading(false),
    ); // Added finally
  };

  const update = (data) => {
    return updateProfile(auth.currentUser, data);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const passwordUpdate = async (user, oldPassword, newPassword) => {
    const credential = EmailAuthProvider.credential(user.email, oldPassword);
    const reauthenticate = await reauthenticateWithCredential(user, credential);
    if (reauthenticate?.user?.accessToken) {
      return updatePassword(user, newPassword);
    }
  };

  const authInfo = {
    logOut,
    googleLogin,
    loading,
    signUp,
    user,
    setUser,
    signIn,
    update,
    setLoading,
    passwordUpdate,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
