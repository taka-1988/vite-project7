import React, { useEffect } from "react";
import "./Item.scss";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  addToCart,
  removeCart,
  selectItemQuantity,
  setTotalQuantity,
} from "../features/cartSlice";

type Props = {
  id: string;
  itemName: string;
  price: number;
  photo: string;
};

const Item = (props: Props) => {
  const { id, itemName, price, photo } = props;

  const quantity = useAppSelector((state) => selectItemQuantity(state, id));

  const dispatch = useAppDispatch();
  const addCart = () => {
    dispatch(
      addToCart({
        id: id,
        itemName: itemName,
        price: price,
        quantity: 1,
      })
    );
  };

  const decreaceCart = () => {
    dispatch(
      removeCart({
        id: id,
        itemName: itemName,
        price: price,
        quantity: 1,
      })
    );
  };

  useEffect(() => {
    dispatch(setTotalQuantity());
  }, [quantity]);

  return (
    <div className="item">
      <div className="iteminfo">
        <img src={photo} alt="img" />
        <div className="itemtext">
          <h4>{itemName}</h4>
          <p>
            {price}
            <span>円</span>
          </p>
        </div>
      </div>
      <div className="itemaction">
        <AddCircleIcon onClick={() => addCart()} />
        <p>{quantity}</p>
        <RemoveCircleIcon onClick={() => decreaceCart()} />
      </div>
    </div>
  );
};

export default Item;
