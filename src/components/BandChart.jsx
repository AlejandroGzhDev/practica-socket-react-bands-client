import React, { useContext, useState } from "react";

import { useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import { Bar } from "react-chartjs-2";

const BandChart = () => {
  const { socket } = useContext(SocketContext);

  const [data, setdata] = useState({});
  useEffect(() => {
    socket.on("current-bands", (bands) => {
      crearGrafica(bands);
    });
  }, [socket]);

  const crearGrafica = (bands) => {
    const data = {
      labels: bands.map((band) => band.name),
      datasets: [
        {
          label: "# of Votes",
          data: bands.map((band) => band.vote),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    setdata(data);
  };
  const options = {
    indexAxis: "y",
    animation: {
        duration: 0
    },
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Chart.js Horizontal Bar Chart",
      },
    },
  }; 
  return (
    <>
      <div>
        <Bar data={data} options={options} />
      </div>
    </>
  );
};

export default BandChart;