import { SIGN_IN, SIGN_OUT, SIGN_UP } from "../CONSTANTS";
import db, { auth } from "../../firebase";
import firebase from "firebase/app";
import "firebase/auth";
import { message } from "antd";
import { Dispatch } from "redux";

export const signIn =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    const res = await auth.signInWithEmailAndPassword(email, password);
    const user = await res.user;

    dispatch({
      type: SIGN_IN,
      payload: user,
    });
  };

export const signUp =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user: { uid: string } | null = await res.user;

    if (user) {
      db.collection("users").doc(user.uid).set({});
      dispatch({
        type: SIGN_UP,
        payload: user,
      });
    }
  };

export const signOut = () => async (dispatch: Dispatch) => {
  auth.signOut();
  dispatch({
    type: SIGN_OUT,
    payload: null,
  });
};

export const setUser = (user: {}) => async (dispatch: Dispatch) => {
  dispatch({
    type: SIGN_IN,
    payload: user,
  });
};

export const updateProfile =
  (values: {
    name: string;
    email: string;
    password: string;
    newPassword: string;
  }) =>
  async (dispatch: Dispatch) => {
    const { name, email, password, newPassword } = values;
    let user = auth.currentUser;

    if (user?.displayName !== name) {
      user
        ?.updateProfile({
          displayName: name,
        })
        .then(() => {
          message.success("Name Updated");
          dispatch({
            type: SIGN_IN,
            payload: {
              ...user,
              displayName: name,
            },
          });
        })
        .catch((error) => message.error(error));
    }

    if (user?.email !== email) {
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

const changePassword = (currentPassword: string, newPassword: string) => {
  reAuthenticate(currentPassword)
    ?.then(() => {
      var user = auth.currentUser;
      user
        ?.updatePassword(newPassword)
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
const changeEmail = (currentPassword: string, newEmail: string) => {
  reAuthenticate(currentPassword)
    ?.then(() => {
      var user = auth.currentUser;
      user
        ?.updateEmail(newEmail)
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

const reAuthenticate = (currentPassword: string) => {
  var user: firebase.User | null = auth.currentUser;

  if (user) {
    var cred = (firebase.auth.EmailAuthProvider as any).credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  }
};
