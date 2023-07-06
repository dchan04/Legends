import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/Home";
import LegendTable from "./components/LegendTable";
import Footer from "./components/Footer";

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
