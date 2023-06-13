import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Products from "./routes/products/products.component";
import ViewProduct from "./routes/view-product/view-product.component";
import Cart from "./routes/cart/cart.component";
import Authentication from "./routes/authentication/authentication.component";
import {
  createUserDocument,
  onAuthStateChangedListener,
} from "./utils/firebase.utils";
import { setCurrentUser } from "./store/user/user.action";
import "./index.scss";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        const { user: userAuth, doc: userDoc } = await createUserDocument(user);
        const { displayName } = userDoc.data();
        userAuth.displayName = displayName;
      }
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="product/:id" element={<ViewProduct />} />
        <Route path="cart" element={<Cart />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
