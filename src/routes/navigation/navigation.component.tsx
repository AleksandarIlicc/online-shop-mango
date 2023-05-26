import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";

import ButtonNavigation from "../../components/button/button-navigation/button-navigation.component";
import { FaOpencart } from "react-icons/fa";

import { useSelector } from "react-redux";
import { selectCartCount } from "../../store/cart/cart.selector";

import "./navigation.styles.scss";

const Navigation: React.FC = (): JSX.Element => {
  const cartCount = useSelector(selectCartCount);

  const [showNav, setShowNav] = useState(false);
  const [stickyNav, setStickyNav] = useState(false);
  const nav = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const navEl = nav.current;

    if (navEl) {
      const navHeight = navEl.getBoundingClientRect().height;

      const handlerScroll = () => {
        if (window.scrollY > navHeight) {
          setStickyNav(true);
        } else {
          setStickyNav(false);
        }
      };

      window.addEventListener("scroll", handlerScroll);

      return () => {
        window.removeEventListener("scroll", handlerScroll);
      };
    }
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLUListElement, MouseEvent>
  ) => {
    const target = e.target as HTMLElement;
    target.tagName === "A" && setShowNav(false);
  };

  return (
    <>
      <nav className={stickyNav ? "nav nav--sticky" : "nav"} ref={nav}>
        {/* LOGO */}
        <div className="nav__logo">
          <div
            className={
              stickyNav
                ? "logo-background logo-background--show"
                : "logo-background"
            }
          ></div>
          <Link to="/">
            <span>Mango</span>Shop
          </Link>
        </div>
        {/* NAVIGATION LIST */}
        <ul
          className={
            showNav
              ? "nav__list nav__list--active"
              : "nav__list" && stickyNav
              ? "nav__list nav__list--sticky"
              : "nav__list"
          }
          onClick={handleNavClick}
        >
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/products">products</Link>
          </li>
          <li>
            <Link to="/about">about us</Link>
          </li>
          <li className="signin-link">
            <Link to="/signin" className="signin-link__link">
              sign in
            </Link>
          </li>
        </ul>
        {/* CART ICON */}
        <div
          className={
            stickyNav
              ? "cart-icon__box cart-icon__box--sticky"
              : "cart-icon__box"
          }
        >
          <Link to="/cart" className="cart-icon__link">
            <FaOpencart className="cart-icon__icon" />
            <span className="cart-icon__badge">
              {cartCount ?? 0}
            </span>
          </Link>
        </div>
        {/* BUTTON NAVIGATION */}
        <ButtonNavigation
          showNav={showNav}
          setShowNav={setShowNav}
          stickyNav={stickyNav}
        />
      </nav>
      <Outlet />
    </>
  );
};

export default Navigation;
