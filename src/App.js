import React, { useEffect, useState } from "react";
import "./App.css";
import FormControl from "@material-ui/core/FormControl";
import { Select, MenuItem, Card } from "@material-ui/core";
import InfoBox from "./components/InfoBox/InfoBox";
import Map from "./components/Map/Map";
import Table from "./components/Table/Table";
import { sortData } from "./utils";
import LineGraph from "./components/LineGraph/LineGraph";
import { map } from "leaflet";
import { useMapEvents } from "react-leaflet";

// https://disease.sh/v3/covid-19/countries

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

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
          const sortedData = sortData(data);
          setCountries(countries);
          setTableData(sortedData);
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
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);

        // const map = useMapEvents({map.flyTo(
        //   [data.countryInfo.lat, data.countryInfo.long],
        //   14,
        //   {
        //     duration: 2,
        //   }
        // )})
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
        <Map center={mapCenter} zoom={mapZoom} />
      </div>

      <Card className="app__right">
        {/* Table */}
        <h3>Live Cases by Country</h3>
        <Table countries={tableData} />

        {/* Graph */}
        <h3>Worldwide new cases</h3>
        <LineGraph />
      </Card>
    </div>
  );
}

export default App;
