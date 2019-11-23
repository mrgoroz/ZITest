import Item1 from "../../images/item1.jpg";
import Item2 from "../../images/item2.jpg";
import Item3 from "../../images/item3.jpg";
import Item4 from "../../images/item4.jpg";
import Item5 from "../../images/item5.jpg";
import Item6 from "../../images/item6.jpg";
import {
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_QUANTITY,
  ADD_QUANTITY,
  CLEAR_CART
} from "../actions/action-types/cart-actions";

const initState = {
  items: [
    {
      id: 1,
      title: "Winter body",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 110,
      img: Item1
    },
    {
      id: 2,
      title: "Adidas",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 80,
      img: Item2
    },
    {
      id: 3,
      title: "Vans",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 120,
      img: Item3
    },
    {
      id: 4,
      title: "White",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 260,
      img: Item4
    },
    {
      id: 5,
      title: "Cropped-sho",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 160,
      img: Item5
    },
    {
      id: 6,
      title: "Blues",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 90,
      img: Item6
    }
  ],
  addedItems: [],
  total: 0
};
const cartReducer = (state = initState, action) => {
  let addedItem;
  let newTotal;
  let new_items;
  //INSIDE HOME COMPONENT
  switch (action.type) {
    case ADD_TO_CART:
      addedItem = state.items.find(item => item.id === action.id);
      //check if the action id exists in the addedItems
      let existed_item = state.addedItems.find(item => action.id === item.id);
      if (existed_item) {
        addedItem.quantity += 1;
        return {
          ...state,
          total: state.total + addedItem.price
        };
      } else {
        addedItem.quantity = 1;
        //calculating the total
        newTotal = state.total + addedItem.price;

        return {
          ...state,
          addedItems: [...state.addedItems, addedItem],
          total: newTotal
        };
      }

    case REMOVE_ITEM:
      let itemToRemove = state.addedItems.find(item => action.id === item.id);
      new_items = state.addedItems.filter(item => action.id !== item.id);

      //calculating the total
      newTotal = state.total - itemToRemove.price * itemToRemove.quantity;
      console.log(itemToRemove);
      return {
        ...state,
        addedItems: new_items,
        total: newTotal
      };

    //INSIDE CART COMPONENT
    case ADD_QUANTITY:
      addedItem = state.items.find(item => item.id === action.id);
      addedItem.quantity += 1;
      newTotal = state.total + addedItem.price;
      return {
        ...state,
        total: newTotal
      };

    case SUB_QUANTITY:
      addedItem = state.items.find(item => item.id === action.id);
      //if the qt == 0 then it should be removed
      if (addedItem.quantity === 1) {
        new_items = state.addedItems.filter(item => item.id !== action.id);
        newTotal = state.total - addedItem.price;
        return {
          ...state,
          addedItems: new_items,
          total: newTotal
        };
      } else {
        addedItem.quantity -= 1;
        newTotal = state.total - addedItem.price;
        return {
          ...state,
          total: newTotal
        };
      }

    case CLEAR_CART:
      new_items = state.addedItems.filter(item => false);
      return {
        ...state,
        addedItems: new_items,
        total: 0
      };

    default:
      return state;
  }
};

export default cartReducer;
