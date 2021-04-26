import { SIGN_IN, SIGN_OUT, SIGN_UP } from "../CONSTANTS";
import db, { auth } from "../../firebase";
import firebase from "firebase/app";
import "firebase/auth";
import { message } from "antd";

export const signIn = (email, password) => async (dispatch) => {
  const res = await auth.signInWithEmailAndPassword(email, password);
  const user = await res.user;

  dispatch({
    type: SIGN_IN,
    payload: user,
  });
};

export const signUp = (email, password) => async (dispatch) => {
  const res = await auth.createUserWithEmailAndPassword(email, password);
  const user = await res.user;

  db.collection("users").doc(user.uid).set({})

  dispatch({
    type: SIGN_UP,
    payload: user,
  });
};

export const signOut = () => async (dispatch) => {
  auth.signOut();
  dispatch({
    type: SIGN_OUT,
    payload: null,
  });
};

export const setUser = (user) => async (dispatch) => {
  dispatch({
    type: SIGN_IN,
    payload: user,
  });
};

export const updateProfile = (values) => async (dispatch) => {
  const { name, email, password, newPassword } = values;
  let user = auth.currentUser;

  if (user.displayName !== name) {
    user
      .updateProfile({
        displayName: name,
      })
      .then(() => {
        message.success("Name Updated");
        console.log("Name Updated");
      })
      .catch((error) => message.error(error));
  }

  if (user.email !== email) {
    changeEmail(password, email);
  }

  if (newPassword) {
    changePassword(password, newPassword);
  }

  dispatch({
    type: SIGN_IN,
    payload: {
      ...user,
      displayName: name,
      email,
    },
  });
};

const reauthenticate = (currentPassword) => {
  var user = auth.currentUser;
  var cred = firebase.auth.EmailAuthProvider.credential(
    user.email,
    currentPassword
  );
  return user.reauthenticateWithCredential(cred);
};

const changePassword = (currentPassword, newPassword) => {
  reauthenticate(currentPassword)
    .then(() => {
      var user = auth.currentUser;
      user
        .updatePassword(newPassword)
        .then(() => {
          message.success("Password Updated !");
        })
        .catch((error) => {
          message.error(error);
        });
    })
    .catch((error) => {
      message.error(error);
    });
};
const changeEmail = (currentPassword, newEmail) => {
  reauthenticate(currentPassword)
    .then(() => {
      var user = auth.currentUser;
      user
        .updateEmail(newEmail)
        .then(() => {
          message.success("Email Updated !");
        })
        .catch((error) => {
          message.error(error);
        });
    })
    .catch((error) => {
      message.error(error);
    });
};
