import { useAppSelector } from "../app/hooks";
import "./Goods.scss";
import { Button } from "@mui/material";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, db, provider } from "../firebase";
import { Link } from "react-router-dom";
import Item from "./Item";
import { useEffect, useState } from "react";
import { collection, getDoc, getDocs, query } from "firebase/firestore";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";

interface NavLinkProps {
  to: string;
  children: string;
}

const NavLink = ({ to, children }: NavLinkProps) => (
  <li>
    <Link className="no-deco" to={to}>
      {children}
    </Link>
  </li>
);

interface AuthButtonProps {
  user: boolean;
}

const AuthButton = ({ user }: AuthButtonProps) => (
  <Button
    variant="contained"
    className={user ? "sign-out" : "sign-in"}
    onClick={
      user
        ? () => signOut(auth)
        : () =>
            signInWithPopup(auth, provider).catch((error) =>
              alert(error.message)
            )
    }
  >
    {user ? "Sign out" : "Sign in"}
  </Button>
);

interface Items {
  id: string;
  itemName: string;
  price: number;
  photo: string;
}

const Goods = () => {
  const user = useAppSelector((state) => state.user.user);
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const totalprice = useAppSelector((state) => state.cart.totalprice);
  const [items, setItems] = useState<Items[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const q = query(collection(db, "goods"));
        const querySnapshot = await getDocs(q);
        const resultItems: Items[] = [];
        querySnapshot.forEach((doc) => {
          resultItems.push({
            id: doc.id,
            itemName: doc.data().itemName,
            price: doc.data().price,
            photo: doc.data().photo,
          });
        });
        setItems(resultItems);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchGoods();
  }, []);

  if (loading) {
    return <div>読み込み中</div>;
  }

  if (items.length === 0) {
    return <div>何にも商品がないみたい…</div>;
  }

  return (
    <div className="goods">
      <nav className="navbar">
        <div className="titleName">
          <h1>Shopping Site</h1>
        </div>
        <div className="menu">
          <ul>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/Goods">Goods</NavLink>
          </ul>
        </div>
        <div className="auth">
          <div className="cartIcon">
            <AddShoppingCartIcon className="Icon" />
            <p>{totalQuantity}</p>
          </div>
          <AuthButton user={!!user} />
        </div>
      </nav>
      <div className="itemList">
        {items.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            itemName={item.itemName}
            price={item.price}
            photo={item.photo}
          />
        ))}
      </div>
      <div className="totalprice">
        <h4>合計</h4>
        <div className="currency">
          <CurrencyYenIcon />
          <p className="amount">{totalprice}</p>
        </div>
        <p className="yen">円</p>
      </div>
    </div>
  );
};

export default Goods;
