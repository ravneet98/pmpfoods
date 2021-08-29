import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";
import Backdrop from "./Backdrop";

const override = css`
  display: block;
  margin: auto;
  border-color: red;
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 9999;
`;

const Loader = () => {
  let [color, setColor] = useState("#303030");

  return (
    <>
      <Backdrop></Backdrop>
      <HashLoader css={override} color={color} size={50} />;
    </>
  );
};

export default Loader;
