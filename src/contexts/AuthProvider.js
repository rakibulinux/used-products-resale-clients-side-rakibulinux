import React, { useState, useEffect } from "react";
import { createContext } from "react";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //Create User Account
  const createUserAccount = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //Login with Password
  const loginUserAccount = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //Update Name
  const updateUserProfile = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  //Google Signin
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //Logout
  const logoutUserAccount = () => {
    setLoading(true);
    localStorage.removeItem("usedPhoneToken");
    return signOut(auth);
  };

  const deleteUserAccount = (email) => {
    setLoading(true);
    return deleteUser(email);
  };

  //Forget Password
  const resetUserAccountPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    //this part will execute once the component is mounted.
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      //this part will execute once the component is unmounted.
      // setLoading(false);
      return unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    createUserAccount,
    updateUserProfile,
    signInWithGoogle,
    logoutUserAccount,
    loginUserAccount,
    deleteUserAccount,
    resetUserAccountPassword,
    loading,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
