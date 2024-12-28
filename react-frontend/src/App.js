import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../src/Business/Components/NavBar";
import { productsDataSelector } from "../src/Business/Store/productsSlice";
import "./App.css";
import RoutesConfig from "./Business/RoutesConfig";

const App = () => {
  const productsData = useSelector(productsDataSelector);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <NavBar />
      <RoutesConfig />
    </div>
  );
};

export default App;
