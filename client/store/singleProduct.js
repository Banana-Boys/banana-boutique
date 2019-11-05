import axios from "axios";

const GET_PRODUCT = "GET_PRODUCT";
const getProduct = product => ({ type: GET_PRODUCT, product });

export const fetchProduct = dispatch => {
  return async productId => {
    try {
      const res = await axios.get(`/api/products/${productId}`); //looked cute, might change later
      dispatch(getProduct(res.data));
    } catch (err) {
      console.log(err);
    }
  };
};

/**
 * REDUCER
 */
export default (product = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product;
    default:
      return product;
  }
};
