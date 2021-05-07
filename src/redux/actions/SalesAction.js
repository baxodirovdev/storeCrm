import { message } from "antd";
import db from "../../firebase";
import firebase from "firebase";

import { ADD_SALES, EDIT_SALES, GET_SALES, REMOVE_SALES } from "../CONSTANTS";

export const addSales = (cart, client, userUid) => async (dispatch) => {
  const timeStamp = firebase.firestore.Timestamp.now().seconds * 1000;

  db.collection("users")
    .doc(userUid)
    .collection("sales")
    .add({
      cart,
      client,
      userUid,
      created: timeStamp,
    })
    .then((res) => {
      dispatch({
        type: ADD_SALES,
        payload: {
          cart,
          client,
          userUid,
          key: res.id,
          created: timeStamp,
        },
      });
      window.history.back()
      message.success("Sales added");
    })
    .catch((err) => message.error(err));
};

export const editSales = (userId, key, newData, oldData) => async (
  dispatch
) => {
  db.collection("users")
    .doc(userId)
    .collection("sales")
    .doc(key)
    .set({
      ...oldData,
      ...newData,
    })
    .then(() => {
      dispatch({
        type: EDIT_SALES,
        payload: { key, newData },
      });
      message.success("Product updated");
    })
    .catch((err) => message.error(err));
};

export const removeSales = (userId, key) => async (dispatch) => {
  db.collection("users")
    .doc(userId)
    .collection("sales")
    .doc(key)
    .delete()
    .then(() => {
      dispatch({
        type: REMOVE_SALES,
        payload: key,
      });
      message.success("Product deleted");
    })
    .catch((err) => message.error(err));
};

export const getSales = (userId) => async (dispatch) => {
  const res = await db
    .collection("users")
    .doc(userId)
    .collection("sales")
    .get();

  const sales = res.docs.map((doc) => {
    return { ...doc.data(), key: doc.id };
  });

  dispatch({
    type: GET_SALES,
    payload: sales,
  });
};
