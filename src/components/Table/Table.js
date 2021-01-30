import React from 'react';
import "./Table.css";

function Table({countries}) {
  return (
    <div className="table">
      {countries.map(({ countryInfo, country, cases }) => (
        <tr
          key={country}
          style={{
            display: "flex",
            alignContent: 'center',
            // justifyContent: "space-between",
          }}
        >
          <td>
            <img src={countryInfo.flag} alt="country" width={50} />
          </td>
          <td>{country}</td>
          <td>
            <strong>{cases}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
