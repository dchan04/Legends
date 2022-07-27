import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Top3Display.css";
import { PortraitOutlined } from "@mui/icons-material";

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
        <img src={species.defaultImg} />
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
        <img src={variants.imgPath} />
      </li>
    </React.Fragment>
  );
}

export default function Top3Display() {
  const [top3Species, setTop3Species] = useState([]);
  const [top3Variants, setTop3Variants] = useState([]);

  useEffect(() => {
    (async () => {
      const url = "https://localhost:7150/get-top3-species";
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
      const url = "https://localhost:7150/get-top3-variants";
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
      <div className="title text-center">
        <h1 class="display-4">
          Top 3 <b>Species</b>
        </h1>
      </div>
      <div className="top3Container">
        <ol className="tilesWrap">
          {top3Species.map((speciesList) => (
            <Top3Species key={speciesList.speciesId} species={speciesList} />
          ))}
        </ol>
      </div>
      <div className="title text-center">
        <h1 class="display-4">
          Top 3 <b>Variants</b>
        </h1>
      </div>
      <div className="top3Container">
        <ol className="tilesWrap">
          {top3Variants.map((variantList) => (
            <Top3Variants key={variantList.variantId} variants={variantList} />
          ))}
        </ol>
      </div>
    </div>
  );
}
