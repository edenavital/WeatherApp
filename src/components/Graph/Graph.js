import React from "react";
import "./Graph.css";
import { connect } from "react-redux";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

//Should fill this data with the temperatures
//props will be a fixed json with all the data I need in order to display this component
const Graph = ({ graphData }) => {
  console.log(graphData);

  const data = [
    {
      name: graphData[0].name,
      temperature: graphData[0].temperature
    },
    {
      name: graphData[1].name,
      temperature: graphData[1].temperature
    },
    {
      name: graphData[2].name,
      temperature: graphData[2].temperature
    },
    {
      name: graphData[3].name,
      temperature: graphData[3].temperature
    },
    {
      name: graphData[4].name,
      temperature: graphData[4].temperature
    }
  ];

  return (
    <div className="Graph">
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 40,
            left: 0,
            bottom: 0
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="temperature"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    forecastDataFromApi: state.weatherForecast.forecastDataFromApi
  };
};

export default connect(mapStateToProps)(Graph);
