// Default Cart State
export const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// Cart State Initilializer
export const cartStateInit = () => {
  const foodOrderData = JSON.parse(sessionStorage.getItem('foodOrder'));
  const totalPrice = JSON.parse(sessionStorage.getItem('totalAmount'));

  if (!foodOrderData && !totalPrice) return defaultCartState;

  if (foodOrderData.length > 0) {
    return { items: foodOrderData, totalAmount: +totalPrice };
  } else {
    return defaultCartState;
  }
};

// Cart Reducer
const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return { items: updatedItems, totalAmount: +updatedTotalAmount };
  }

  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.id
    );

    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;

    if (existingItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: --existingItem.amount };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { items: updatedItems, totalAmount: +updatedTotalAmount };
  }

  return defaultCartState;
};

export default cartReducer;
