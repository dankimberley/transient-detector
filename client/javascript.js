import { createChart, createWaveform, createPoints } from "./charts.js";

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
    const response = await fetch("../api/outputs/output.json");
    const data = await response.json()

    console.log(getMaxAmplitude(data.waveform));

    createChart(getMinAmplitude(data.waveform).amplitude, getMaxAmplitude(data.waveform).amplitude, data.waveform.pop().time);
    createWaveform(data)
    createPoints(data)

  } catch (error) {
    console.log("Error loading data :(", error);
  }
};

getData();
