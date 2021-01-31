import React, { useEffect, useState } from "react";
import "./App.css";
import FormControl from "@material-ui/core/FormControl";
import { Select, MenuItem, Card } from "@material-ui/core";
import InfoBox from "./components/InfoBox/InfoBox";
import Map from "./components/Map/Map";
import Table from "./components/Table/Table";
import { sortData } from "./utils";
import LineGraph from "./components/LineGraph/LineGraph";

// https://disease.sh/v3/covid-19/countries

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((resp) => resp.json())
        .then((data) => {
          const countries = data.map(({ country, countryInfo }) => ({
            name: country,
            value: countryInfo.iso2,
          }));
          const sortedData = sortData(data)
          setTableData(sortedData);
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

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          {/* Header with countries */}
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {allCountries}
            </Select>
          </FormControl>
        </div>

        {/* InfoBoxes */}
        <div className="app__stats">
          <InfoBox
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
            title="Coronavirus Cases"
          />
          <InfoBox
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
            title="Recovered"
          />
          <InfoBox
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
            title="Deaths"
          />
        </div>
        {/* Map */}
        <Map />
      </div>

      <Card className="app__right">
        {/* Table */}
        <h3>Live Cases by Country</h3>
        <Table countries={tableData} />
        <h3>Worldwide new cases</h3>
        {/* Graph */}
        <LineGraph />
      </Card>
    </div>
  );
}

export default App;
