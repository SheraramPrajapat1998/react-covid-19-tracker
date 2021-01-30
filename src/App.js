import React, { useEffect, useState } from "react";
import "./App.css";
import FormControl from "@material-ui/core/FormControl";
import { Select, MenuItem } from "@material-ui/core";
import InfoBox from "./components/InfoBox/InfoBox";

// https://disease.sh/v3/covid-19/countries

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((resp) => resp.json())
        .then((data) => {
          const countries = data.map(({ country, countryInfo }) => ({
            name: country,
            value: countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const allCountries = countries.map(({ name, value }) => {
    return (
      <MenuItem key={name} value={value}>
        {name}
      </MenuItem>
    );
  });

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };

  return (
    <div className="app">
      <div className="app__header">
        {/* Header with countries */}
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {allCountries}
          </Select>
        </FormControl>
      </div>

      {/* InfoBoxes */}
      <div className="app__stats">
        <InfoBox cases={120} total={1000} title="Coronavirus Cases" />
        <InfoBox cases={120} total={1000} title="Recovered" />
        <InfoBox cases={120} total={1000} title="Deaths" />
      </div>

      {/* Map */}

      {/* Table */}

      {/* Graph */}
    </div>
  );
}

export default App;
