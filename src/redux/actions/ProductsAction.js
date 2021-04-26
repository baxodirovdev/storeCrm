import { message } from "antd";
import db from "../../firebase";
import { ADD_PRODUCT, GET_PRODUCT } from "../CONSTANTS";

export const addProduct = (
  productName,
  cost,
  number,
  category,
  userUid
) => async (dispatch) => {
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
    .then(() => message.success("Product added"))
    .catch((err) => message.error(err));

  const products = {
    productName,
    cost: +cost,
    number: +number,
    category,
    userUid,
  };

  dispatch({
    type: ADD_PRODUCT,
    payload: products,
  });
};

export const getProducts = (userId) => async (dispatch) => {
  const res = await db
    .collection("users")
    .doc(userId)
    .collection("products")
    .get();

  const products = await res.docs.map((doc) => {
    return doc.data();
  });

  dispatch({
    type: GET_PRODUCT,
    payload: products,
  });
};
