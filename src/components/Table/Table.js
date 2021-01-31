import React from 'react';
import "./Table.css";
import numeral from 'numeral';
function Table({countries}) {
  return (
    <div className="table">
      {countries.map(({ countryInfo, country, cases }) => (
        <tr
          key={country}
          style={{
            display: "flex",
            alignContent: 'center',
          }}
        >
          <td>
            <img src={countryInfo.flag} alt="country" width={50} />
          </td>
          <td>{country}</td>
          <td>
            <strong>{numeral(cases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
