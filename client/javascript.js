import { createChart, createPoints } from "./charts.js";

const getMinAmplitude = (data) => {
    return data.reduce((prev, curr) =>
      prev.amplitude < curr.amplitude ? prev : curr
    );
  };
  
  const getMaxAmplitude = (data) => {
    return data.reduce((prev, curr) =>
      prev.amplitude > curr.amplitude ? prev : curr
    );
  };
  

const getData = async () => {
  try {
    const response = await fetch("../api/outputs/20240829_194648.json");
    const data = await response.json();

    console.log(getMaxAmplitude(data));

    createChart(getMinAmplitude(data).amplitude, getMaxAmplitude(data).amplitude, data.pop().time);
    createPoints(data)

  } catch (error) {
    console.log("Error loading data :(", error);
  }
};

getData();
