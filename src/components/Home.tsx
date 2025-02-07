import { useAppSelector } from "../app/hooks";
import "./Home.scss";
import { Button } from "@mui/material";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase";
import { Link } from "react-router-dom";

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

const Home = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <div className="home">
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
          <AuthButton user={!!user} />
        </div>
      </nav>
      <div className="main">
        {/* ヒーローセクション */}
        <section className="hero">
          <h1>ショッピングサイトへようこそ！</h1>
          <p>
            ここではお得な商品がぎょうさんあるで、わくわくする買い物ライフをはじめよう！
          </p>
          <Button variant="contained" color="primary" className="cta-button">
            今すぐチェック
          </Button>
        </section>

        {/* おすすめ商品セクション */}
        <section className="featured-items">
          <h2>今月のイチオシ商品</h2>
          <div className="items-container">
            <div className="featureitem">
              <img src="dummy-item1.jpg" alt="おすすめ商品1" />
              <h3>おすすめ商品1</h3>
              <p>今だけセール中！さっさと買わなきゃ損やぞ。</p>
              <Button variant="contained" className="buy-button">
                買う
              </Button>
            </div>
            <div className="featureitem">
              <img src="dummy-item2.jpg" alt="おすすめ商品2" />
              <h3>おすすめ商品2</h3>
              <p>コイツは味も抜群やし人気も高いで、早い者勝ちやわ。</p>
              <Button variant="contained" className="buy-button">
                買う
              </Button>
            </div>
          </div>
        </section>

        {/* キャッチフレーズとか */}
        <section className="catchphrase">
          <h2>あなたの食卓に彩りを</h2>
          <p>
            新鮮野菜から高級食材まで、なんでもそろっとるで、
            <br />
            ぜひ一度ご覧あれ。
          </p>
        </section>
      </div>
      <div className="fotter">© 2025 Taka Yama</div>
    </div>
  );
};

export default Home;
