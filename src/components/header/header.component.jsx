import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import headerSlider from "../../assets/header-slider";
import {
  FaChevronUp,
  FaChevronDown,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";

import "../../sass/base/_base.scss";
import "./header.styles.scss";
import ButtonBase from "../button/button-base/button-base.component";

const Header = () => {
  const [index, setIndex] = useState(0);
  const [images] = useState(headerSlider);

  const nextImg = () => {
    if (index === images.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  const prevImg = () => {
    if (index === 0) {
      setIndex(images.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  useEffect(() => {
    let imageSlider = setInterval(() => {
      nextImg();
    }, 3000);
    return () => {
      clearInterval(imageSlider);
    };
  });

  return (
    <header className="header">
      <div className="header__flex-container">
        {/* HEADER CARD */}
        <div className="header__card">
          <h1 className="heading__primary centar-text">
            COMFORT THAT KEEPS UP
          </h1>
          <p className="paragraph--header">
            Heritage styles reinvented for now. A whole new take on adicolor.
          </p>
          <ButtonBase type="button" className="btn btn__get-in-touch">
            <Link to="/signin">Get in touch</Link>
          </ButtonBase>
        </div>
        {/* HEADER SLIDER */}
        <div className="header__slider">
          {images.map((img, i) => {
            return (
              <figure
                className="header__img"
                key={i}
                style={{ transform: `translateY(${100 * (i - index)}%)` }}
              >
                <img src={img} key={i} alt="header-img" />
              </figure>
            );
          })}
        </div>
      </div>
      {/* HEADER ARROWS */}
      <div className="header__arrows">
        <FaChevronUp onClick={nextImg} />
        <FaChevronDown onClick={prevImg} />
      </div>
      {/* HEADER SOCIAL ICONS */}
      <div className="social-icons">
        <FaInstagram />
        <FaTwitter />
        <FaYoutube />
        <FaFacebookF />
      </div>
    </header>
  );
};

export default Header;
