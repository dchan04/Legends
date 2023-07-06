import "./Home.css";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//const port = 7150;
const webAPI = `https://tftappbackend.onrender.com`;

Home.propTypes = {
	species: PropTypes.shape({
		speciesId: PropTypes.number,
		speciesCode: PropTypes.number,
		speciesName: PropTypes.string,
		totalCount: PropTypes.number,
		defaultImg: PropTypes.string,
		variants: PropTypes.arrayOf(
			PropTypes.shape({
				variantId: PropTypes.number,
				variantCode: PropTypes.number,
				level: PropTypes.number,
				count: PropTypes.number,
				rarity: PropTypes.string,
				name: PropTypes.string,
				imgPath: PropTypes.string,
				speciesId: PropTypes.number,
			})
		),
	}),
};

Home.propTypes = {
	variants: PropTypes.shape({
		variantId: PropTypes.number,
		variantCode: PropTypes.number,
		level: PropTypes.number,
		count: PropTypes.number,
		rarity: PropTypes.string,
		name: PropTypes.string,
		imgPath: PropTypes.string,
		speciesId: PropTypes.number,
	}),
};

function Top3Species(props) {
	const { species } = props;
	return (
		<React.Fragment>
			<li>
				<img
					src={species.defaultImg}
					alt="Top 3 Species"
					loading="lazy"
				/>
				<h5
					style={{
						color: "white",
						paddingTop: "5px",
						textAlign: "left",
						fontWeight: "600",
						fontSize: "1.1vw",
					}}
				>
					{species.speciesName}
				</h5>
			</li>
		</React.Fragment>
	);
}

function Top3Variants(props) {
	const { variants } = props;
	return (
		<React.Fragment>
			<li>
				<img
					src={variants.imgPath}
					alt="Top 3 Variant"
					loading="lazy"
				/>
				<h5
					style={{
						color: "white",
						paddingTop: "5px",
						textAlign: "left",
						fontWeight: "600",
						fontSize: "1.1vw",
					}}
				>
					{variants.name}
				</h5>
			</li>
		</React.Fragment>
	);
}
function Home() {
	const [top3Species, setTop3Species] = useState([]);
	const [top3Variants, setTop3Variants] = useState([]);

	useEffect(() => {
		(async () => {
			const url = `${webAPI}/get-top3-species`;
			fetch(url, {
				method: "GET",
			})
				.then((Response) => Response.json())
				.then((data) => {
					console.log(data);
					setTop3Species(data);
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const url = `${webAPI}/get-top3-variants`;
			fetch(url, {
				method: "GET",
			})
				.then((Response) => Response.json())
				.then((data) => {
					console.log(data);
					setTop3Variants(data);
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		})();
	}, []);

	return (
		<div className="home-container">
			<div className="home-content">
				<div className="middle-content">
					<div className="title">Legends</div>
					<div className="description">
						Find Out Which Little Legends Are Most Picked
					</div>
					<div id="topSpecies-container">
						<div className="top3-title">
							Top 3 <span id="species-title">Species</span>
						</div>
						<div className="top3-list">
							<ol>
								{top3Species &&
									top3Species.map((speciesList) => (
										<Top3Species
											key={speciesList.speciesId}
											species={speciesList}
										/>
									))}
							</ol>
						</div>
					</div>
					<div id="topVariant-container">
						<div className="top3-title">
							Top 3 <span id="variant-title">Variants</span>
						</div>
						<div className="top3-list">
							<ol>
								{top3Variants &&
									top3Variants.map((variantList) => (
										<Top3Variants
											key={variantList.variantId}
											variants={variantList}
										/>
									))}
							</ol>
						</div>
					</div>
					<div id="view-all-button-container">
						<Link to="/legends" id="view-all-button">
							See More
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
