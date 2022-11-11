import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Top3Display.css";

Top3Species.propTypes = {
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
  }).isRequired,
};

function Top3Species(props) {
  const { species } = props;
  return (
    <React.Fragment>
      <li>
        <img src={species.defaultImg} alt="Top3Species" />
        <h5
          style={{
            color: "white",
            paddingTop: "25px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "15px",
          }}
        >
          {species.speciesName}
        </h5>
      </li>
    </React.Fragment>
  );
}

Top3Variants.propTypes = {
  variants: PropTypes.shape({
    variantId: PropTypes.number,
    variantCode: PropTypes.number,
    level: PropTypes.number,
    count: PropTypes.number,
    rarity: PropTypes.string,
    name: PropTypes.string,
    imgPath: PropTypes.string,
    speciesId: PropTypes.number,
  }).isRequired,
};

function Top3Variants(props) {
  const { variants } = props;
  return (
    <React.Fragment>
      <li>
        <img src={variants.imgPath} alt="Top3Variant" />
        <h5
          style={{
            color: "white",
            paddingTop: "25px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "15px",
          }}
        >
          {variants.name}
        </h5>
      </li>
    </React.Fragment>
  );
}

export default function Top3Display() {
  const [top3Species, setTop3Species] = useState([]);
  const [top3Variants, setTop3Variants] = useState([]);

  useEffect(() => {
    (async () => {
      const url =
        "https://legendstrackerbackend20221109185207.azurewebsites.net/get-top3-species";
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
      const url =
        "https://legendstrackerbackend20221109185207.azurewebsites.net/get-top3-variants";
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
    <div className="Homepage">
      <div className="top3Container">
        <div className="title text-center">
          <h1 className="display-4">
            Top 3 <b style={{ color: "#ADD8E6" }}>Species</b>
          </h1>
        </div>
        <div className="top3Images">
          <ol className="top3Wrap top3Species">
            {top3Species.map((speciesList) => (
              <Top3Species key={speciesList.speciesId} species={speciesList} />
            ))}
          </ol>
        </div>
      </div>
      <div className="top3Container">
        <div className="title text-center">
          <h1 className="display-4">
            Top 3 <b style={{ color: "#90ee90" }}>Variants</b>
          </h1>
        </div>
        <div className="top3Images">
          <ol className="top3Wrap top3Variants">
            {top3Variants.map((variantList) => (
              <Top3Variants
                key={variantList.variantId}
                variants={variantList}
              />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
