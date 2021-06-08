import React, { useState, useEffect } from "react";
import "./component.css";

function asCurrency(price) {
  const formatter = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  });
  return formatter.format(price);
}

const Edeka = ({ market }) => {
  if (!market) throw "market not defined";

  const [offers, setOffers] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [selectedWG, setSelectedWG] = useState("");
  const [availableWGs, setAvailableWGs] = useState([]);

  useEffect(() => {
    console.log(`fetching edeka (${market}) data`);
    fetch(`http://localhost:3001?market=${market}`)
      .then((data) => data.json())
      .then((data) => {
        console.log("received edeka data", data);
        const sorted = data.docs
          ? data.docs
              .map((item) => {
                return {
                  ...item,
                  nachlassAbs: parseInt(
                    item?.nachlass?.replaceAll("[^0-9]", "")
                  ),
                };
              })
              .sort((a, b) => Math.abs(b.nachlassAbs) - Math.abs(a.nachlassAbs))
          : [];

        const wgs = new Set();
        sorted.forEach((item) => wgs.add(item.warengruppe));
        setAvailableWGs(Array.from(wgs));
        console.log(availableWGs);

        setOffers(sorted);
        console.log(sorted);
      });
  }, []);

  return (
    <div className="edeka-angebote">
      <h1>Angebote</h1>
      <div className="filter">
        <input
          type="text"
          name="name"
          id="fName"
          value={filterName}
          onInput={(e) => setFilterName(e.target.value)}
        />
        <select name="warengruppe" id="fWarengruppe">
          {["", ...availableWGs].map((item) => {
            return (
              <option
                value={item}
                onClick={(e) => setSelectedWG(e.target.value)}
              >
                {item}
              </option>
            );
          })}
        </select>{" "}
      </div>
      <br />

      <ul>
        {offers
          ? offers
              ?.filter((item) =>
                filterName ? item.titel.includes(filterName) : true
              )
              .filter((item) =>
                selectedWG ? item.warengruppe.includes(selectedWG) : true
              )
              .map((item) => {
                return (
                  <li>
                    <div>
                      <h2>{item.titel}</h2>
                      <p>
                        {asCurrency(item.preis)}{" "}
                        <em
                          className={item.nachlassAbs <= -42 ? "red-txt" : ""}
                        >
                          {" "}
                          ({item.nachlass})
                        </em>
                      </p>
                    </div>
                    <div>
                      <img src={item.bild_app} alt={item.titel} />
                    </div>
                  </li>
                );
              })
          : "not found"}
      </ul>
    </div>
  );
};

export default Edeka;
