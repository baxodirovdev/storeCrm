import { message } from "antd";
import { Dispatch } from "redux";
import db from "../../firebase";
import {
  ADD_CLIENT,
  EDIT_CLIENT,
  GET_CLIENT,
  REMOVE_CLIENT,
} from "../CONSTANTS";

export const getClients = (userId: string) => async (dispatch: Dispatch) => {
  const res = await db
    .collection("users")
    .doc(userId)
    .collection("clients")
    .get();

  const clients = res.docs.map((doc) => {
    return { ...doc.data(), key: doc.id };
  });

  dispatch({
    type: GET_CLIENT,
    payload: { clients },
  });
};

export const addClient =
  (
    clientName: string,
    gender: string,
    phoneNumber: string,
    storeName: string,
    userUid: string
  ) =>
  async (dispatch: Dispatch) => {
    db.collection("users")
      .doc(userUid)
      .collection("clients")
      .add({
        clientName,
        gender,
        phoneNumber,
        storeName,
        userUid,
      })
      .then((res) => {
        dispatch({
          type: ADD_CLIENT,
          payload: {
            clientName,
            gender,
            phoneNumber,
            storeName,
            userUid,
            key: res.id,
          },
        });
        message.success("Client added");
      })
      .catch((err) => message.error(err));
  };

export const editClients =
  (userId: string, key: string, newData: {}, oldData: {}) =>
  async (dispatch: Dispatch) => {
    db.collection("users")
      .doc(userId)
      .collection("clients")
      .doc(key)
      .set({
        ...oldData,
        ...newData,
      })
      .then(() => {
        dispatch({
          type: EDIT_CLIENT,
          payload: { key, newData },
        });
        message.success("Client updated");
      })
      .catch((err) => message.error(err));
  };

export const removeClients =
  (userId: string, key: string) => async (dispatch: Dispatch) => {
    db.collection("users")
      .doc(userId)
      .collection("clients")
      .doc(key)
      .delete()
      .then(() => {
        dispatch({
          type: REMOVE_CLIENT,
          payload: { key },
        });
        message.success("Client deleted");
      })
      .catch((err) => message.error(err));
  };
