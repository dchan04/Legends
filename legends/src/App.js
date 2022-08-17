import React, { Component, useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import { Routes, Route } from "react-router-dom";
import Top3 from "./Top3Display";
import LegendTable from "./LegendTable";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Top3 />} />
          <Route path="/legends" element={<LegendTable />} />
        </Routes>
      </div>
    </>
  );
}
