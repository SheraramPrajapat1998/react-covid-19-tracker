import React, { useEffect, useState } from "react";
import numeral from "numeral";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const buildChartData = (data, casesType = "cases") => {
  const chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      const newDataPoint = {
        date: date,
        cases: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function LineGraph({ casesType = "cases" }) {
  const [data, setData] = useState({});

  const url = "https://disease.sh/v3/covid-19/historical/all?lastdays=120";

  useEffect(() => {
    const fetchData = async () => {
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          setData(chartData);
        });
    };
    fetchData();
  }, [casesType]);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <h1>I'm a graph</h1>
      <ResponsiveContainer>
        <AreaChart width={400} height={400} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={(value) => numeral(value).format("0a")} />
          <Tooltip formatter={(value) => numeral(value).format("+0,0")} />
          <Area
            type="monotone"
            dataKey="cases"
            stroke="#ff0000"
            fill="#FF6347"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineGraph;
