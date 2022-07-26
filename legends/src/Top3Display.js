import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Top3Display.css";

Top3.propTypes = {
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

function Top3(props) {
  const { species } = props;
  return (
    <React.Fragment>
      <li>
        <img src={species.defaultImg}/>
      </li>
    </React.Fragment>
  );
}

export default function Top3Display() {
  const [top3Species, setTop3Species] = useState([]);

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

  return (
    <div className="Homepage">
      <div className="title text-center">
        <h1 class="display-4">
          <b>Top 3 Little Legends</b>
        </h1>
      </div>
      <div className="top3Container">
        <ol className="tilesWrap">
          {top3Species.map((speciesList) => (
            <Top3 key={speciesList.speciesId} species={speciesList} />
          ))}
        </ol>
      </div>
    </div>
  );
}
