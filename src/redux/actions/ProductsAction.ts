import { message } from "antd";
import { Dispatch } from "redux";
import db from "../../firebase";
import {
  ADD_PRODUCT,
  EDIT_PRODUCT,
  GET_PRODUCT,
  REMOVE_PRODUCT,
} from "../CONSTANTS";

export const addProduct =
  (
    productName: string,
    cost: number,
    number: number,
    category: string,
    userUid: string
  ) =>
  async (dispatch: Dispatch) => {
    db.collection("users")
      .doc(userUid)
      .collection("products")
      .add({
        productName,
        cost: +cost,
        number: +number,
        category,
        userUid,
      })
      .then((res) => {
        dispatch({
          type: ADD_PRODUCT,
          payload: {
            productName,
            cost: +cost,
            number: +number,
            category,
            userUid,
            key: res.id,
          },
        });
        message.success("Product added");
      })
      .catch((err) => message.error(err));
  };

export const editProducts =
  (userId: string, key: string, newData: object, oldData: object) =>
  async (dispatch: Dispatch) => {
    db.collection("users")
      .doc(userId)
      .collection("products")
      .doc(key)
      .set({
        ...oldData,
        ...newData,
      })
      .then(() => {
        dispatch({
          type: EDIT_PRODUCT,
          payload: { key, newData },
        });
        message.success("Product updated");
      })
      .catch((err) => message.error(err));
  };

export const updateProducts =
  (userId: string, products: { key: string; number: number }[]) =>
  async (dispatch: Dispatch) => {
    db.collection("users")
      .doc(userId)
      .collection("products")
      .get()
      .then((res) => {
        res.forEach((doc) => {
          products.forEach((product) => {
            if (product.key === doc.ref.id) {
              doc.ref.update({
                number: product.number,
              });
            }
          });
        });
      })
      .catch((err) => message.error(err));
  };

export const removeProducts =
  (userId: string, key: string) => async (dispatch: Dispatch) => {
    db.collection("users")
      .doc(userId)
      .collection("products")
      .doc(key)
      .delete()
      .then(() => {
        dispatch({
          type: REMOVE_PRODUCT,
          payload: { key },
        });
        message.success("Product deleted");
      })
      .catch((err) => message.error(err));
  };

export const getProducts = (userId: string) => async (dispatch: Dispatch) => {
  const res = await db
    .collection("users")
    .doc(userId)
    .collection("products")
    .get();

  const products = res.docs.map((doc) => {
    return { ...doc.data(), key: doc.id };
  });

  dispatch({
    type: GET_PRODUCT,
    payload: { products },
  });
};
