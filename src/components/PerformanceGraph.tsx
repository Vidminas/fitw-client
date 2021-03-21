import { IonItem } from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { AppState, UserState } from "../redux/store";
import "./PerformanceGraph.css";

const PerformanceGraph: React.FC<{}> = () => {
  const chartRef = useRef<Line>(null);
  const [chartTitle, setChartTitle] = useState("");
  const [chartData, setChartData] = useState<{ t: Date; y: number }[]>(
    [
      1,
      2,
      3,
      4,
      7,
      8,
      9,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
    ].map((n) => ({
      t: new Date(2021, 2, n),
      y: 10 + n,
    }))
  );
  const userState = useSelector<AppState, UserState>((state) => state.user);

  useEffect(() => {
    if (userState.user?.datesPoints) {
      let totalPoints = 0;
      setChartData(
        userState.user.datesPoints.map((dp) => {
          totalPoints += dp.points;
          return {
            t: dp.date,
            y: dp.points,
          };
        })
      );
      setChartTitle(`Total points: ${totalPoints}`);
    }
  }, [userState.user]);

  const data = {
    labels: [],
    datasets: [
      {
        label: "Points",
        borderColor: "rgba(254,139,54,1)",
        backgroundColor: "rgb(254,139,54,0.2)",
        borderWidth: 1,
        lineTension: 0,
        pointBackgroundColor: "#fff",
        pointRadius: 5,
        pointBorderWidth: 3,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 3,
        pointHitRadius: 7,
        data: chartData,
      },
    ],
  };

  return (
    <IonItem className="performance-graph" onClick={(e) => e.stopPropagation()}>
      <Line
        ref={chartRef}
        height={400}
        width={data.datasets[0].data.length * 30}
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          legend: {
            display: false,
          },
          title: {
            display: !!chartTitle,
            fontSize: 16,
            text: chartTitle,
          },
          scales: {
            xAxes: [
              {
                type: "time",
                distribution: "linear",
                time: {
                  unit: "day",
                  // https://momentjscom.readthedocs.io/en/latest/moment/01-parsing/03-string-format/
                  //   parser: "MM/DD/YYYY",
                  tooltipFormat: "LL",
                  bounds: "ticks",
                },
                ticks: {
                  // Ensure the graph goes up to today
                  // This helps to see why a winning streak is lost
                  max: new Date(),
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
      />
    </IonItem>
  );
};

export default PerformanceGraph;
