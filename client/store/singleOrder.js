import axios from "axios";

const GET_ORDER = "GET_ORDER";
const getOrder = order => ({ type: GET_ORDER, order });

export const fetchOrder = orderId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/orders/${orderId}`); //looked cute, might change later
      dispatch(getOrder(res.data));
    } catch (err) {
      console.log(err);
    }
  };
};

/**
 * REDUCER
 */
export default (order = {}, action) => {
  switch (action.type) {
    case GET_ORDER:
      return action.order;
    default:
      return order;
  }
};