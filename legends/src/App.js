import React, { Component, useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/Home";
import Top3 from "./Top3Display";
import LegendTable from "./LegendTable";
import Footer from "./Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="/legends" element={<LegendTable />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
