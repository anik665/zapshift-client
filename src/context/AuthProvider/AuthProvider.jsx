import React, { useEffect, useState } from "react";
import AuthContex from "../AuthContex/AuthContex";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //register
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //sign in with email
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //google signIn
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  //update Profile
  const UpdateProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  //logout
  const Logout = () => {
    return signOut(auth);
  };

  //observer
  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (currenUser) => {
      setUser(currenUser);
      setLoading(false);
    });
    return () => {
      unsuscribe();
    };
  }, []);

  const authInfo = {
    registerUser,
    signIn,
    googleSignIn,
    Logout,
    user,
    loading,
    UpdateProfile,
  };
  return <AuthContex value={authInfo}>{children}</AuthContex>;
};

export default AuthProvider;
