/*
  This file was entirely AI generated and I have no clue what is going on in terms of the chart code;
*/

import { createFileRoute, Link, useLoaderData } from "@tanstack/react-router";
import axios, { AxiosRequestConfig } from "axios";
import {
  ChartEvent,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { APIBaseURL } from "../Utils/settings";
import { TTPItem } from "../Utils/types";
import "chartjs-adapter-date-fns";
import TPPriceComponent from "../Components/TradingPost/TPPriceComponent";
import { getItemColor } from "../Components/TradingPost/TPItemListingComponent";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

export const Route = createFileRoute("/TradingPost/$itemid")({
  component: TradingPostItemComponent,
  loader: async ({ params }) => {
    const itemId = params.itemid;
    const config: AxiosRequestConfig = {
      method: "post",
      url: `${APIBaseURL}api/tradingPost/item/`,
      data: {
        id: itemId,
      },
    };
    const response = await axios(config);
    return { item: response.data.data as TTPItem };
  },
});

function TradingPostItemComponent() {
  const { item } = useLoaderData({ from: "/TradingPost/$itemid" });
  const [timeStep, setTimeStep] = useState<string>("1day");
  const [priceChartData, setPriceChartData] = useState<any>(null);
  const [supplyDemandChartData, setSupplyDemandChartData] = useState<any>(null);
  const priceChartRef = useRef<ChartJS<"line"> | null>(null);
  const supplyDemandChartRef = useRef<ChartJS<"line"> | null>(null);

  useEffect(() => {
    if (item && item.PriceHistory) {
      const data = item.PriceHistory;
      const filteredData = filterDataByTimeStep(data, timeStep);
      setPriceChartData({
        labels: filteredData.map((entry: any) => entry.timestamp),
        datasets: [
          {
            label: "Sell Price",
            data: filteredData.map((entry: any) => entry.sellPrice),
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            pointRadius: 0,
            pointHoverRadius: 2,
          },
          {
            label: "Buy Price",
            data: filteredData.map((entry: any) => entry.buyPrice),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            pointRadius: 0,
            pointHoverRadius: 2,
          },
        ],
      });
      setSupplyDemandChartData({
        labels: filteredData.map((entry: any) => entry.timestamp),
        datasets: [
          {
            label: "Supply",
            data: filteredData.map((entry: any) => entry.supply),
            borderColor: "rgb(54, 162, 235)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            pointRadius: 0,
            pointHoverRadius: 0,
          },
          {
            label: "Demand",
            data: filteredData.map((entry: any) => entry.demand),
            borderColor: "rgb(255, 206, 86)",
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            pointRadius: 0,
            pointHoverRadius: 0,
          },
        ],
      });
    }
  }, [item, timeStep]);

  const filterDataByTimeStep = (data: any[], timeStep: string) => {
    const now = new Date();
    let filteredData = data;

    if (timeStep === "1day") {
      filteredData = data.filter((entry) => {
        const entryDate = new Date(entry.timestamp);
        return now.getTime() - entryDate.getTime() <= 24 * 60 * 60 * 1000;
      });
    }
    return filteredData;
  };

  const handleHover = (event: ChartEvent) => {
    const priceChart = priceChartRef.current;
    const supplyDemandChart = supplyDemandChartRef.current;

    if (priceChart && supplyDemandChart) {
      const x = event.x ?? 0;

      const priceChartElements = priceChart.getElementsAtEventForMode(
        event as unknown as MouseEvent,
        "nearest",
        { intersect: false },
        false
      );
      const supplyDemandChartElements =
        supplyDemandChart.getElementsAtEventForMode(
          event as unknown as MouseEvent,
          "nearest",
          { intersect: false },
          false
        );

      if (priceChartElements.length > 0) {
        const index = priceChartElements[0].index;

        priceChart.tooltip &&
          priceChart.tooltip.setActiveElements(
            priceChart.data.datasets.map((_, datasetIndex) => ({
              datasetIndex,
              index,
            })),
            { x, y: 0 }
          );
        supplyDemandChart.tooltip &&
          supplyDemandChart.tooltip.setActiveElements(
            supplyDemandChart.data.datasets.map((_, datasetIndex) => ({
              datasetIndex,
              index,
            })),
            { x, y: 0 }
          );
        priceChart.update();
        supplyDemandChart.update();
      } else if (supplyDemandChartElements.length > 0) {
        const index = supplyDemandChartElements[0].index;

        priceChart.tooltip &&
          priceChart.tooltip.setActiveElements(
            priceChart.data.datasets.map((_, datasetIndex) => ({
              datasetIndex,
              index,
            })),
            { x, y: 0 }
          );
        supplyDemandChart.tooltip &&
          supplyDemandChart.tooltip.setActiveElements(
            supplyDemandChart.data.datasets.map((_, datasetIndex) => ({
              datasetIndex,
              index,
            })),
            { x, y: 0 }
          );
        priceChart.update("none");
        supplyDemandChart.update("none");
      }
    }
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto p-4 bg-sunset h-screen">
      <div className="bg-gray-800 text-white p-4 rounded-md flex gap-6 flex-row">
        <div className="mt-8">
          <Link
            to="/TradingPost" // Navigate back to trading post
            className="px-4 py-2 mb-4 bg-gray-300 text-black rounded-md inline-block"
          >
            Back
          </Link>
        </div>
        <div>
          <h1 className={`text-2xl font-bold ${getItemColor(item)} `}>
            {item.name}
          </h1>
          <div className="flex items-center gap-4">
            <img src={item.icon} alt={item.name} className="w-16 h-16" />
            <div>
              <p className={`${getItemColor(item)}`}>Rarity: {item.rarity}</p>
              <p>Level: {item.level}</p>
              <TPPriceComponent price={item.vendorValue} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-center gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded-md ${timeStep === "1day" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
            onClick={() => setTimeStep("1day")}
          >
            1 Day
          </button>
        </div>

        {priceChartData && supplyDemandChartData && (
          <>
            <div className="bg-gray-800 p-4 rounded-md">
              <div className="h-72">
                <Line
                  ref={priceChartRef}
                  data={priceChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        type: "time",
                        time: {
                          unit: "hour",
                        },
                        min: new Date(
                          Date.now() - 24 * 60 * 60 * 1000
                        ).getTime(),
                        max: new Date().getTime(),
                        title: {
                          display: true,
                          text: "Time",
                        },
                      },
                      y: {
                        title: {
                          display: true,
                          text: "Sell/Buy Price",
                        },
                      },
                    },
                    plugins: {
                      tooltip: {
                        mode: "nearest",
                        intersect: false,
                        callbacks: {
                          label: function (context) {
                            const label = context.dataset.label || "";
                            const value = context.raw;
                            return `${label}: ${value}`;
                          },
                        },
                      },
                    },
                    events: [
                      "mousemove",
                      "mouseout",
                      "click",
                      "touchstart",
                      "touchmove",
                    ],
                    onHover: handleHover,
                    hover: {
                      mode: "nearest",
                      intersect: false,
                    },
                  }}
                />
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-md mt-4">
              <div className="h-72">
                <Line
                  ref={supplyDemandChartRef}
                  data={supplyDemandChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        type: "time",
                        time: {
                          unit: "hour",
                        },
                        min: new Date(
                          Date.now() - 24 * 60 * 60 * 1000
                        ).getTime(),
                        max: new Date().getTime(),
                        title: {
                          display: true,
                          text: "Time",
                        },
                      },
                      y: {
                        title: {
                          display: true,
                          text: "Supply/Demand",
                        },
                      },
                    },
                    plugins: {
                      tooltip: {
                        mode: "nearest",
                        intersect: false,
                        callbacks: {
                          label: function (context) {
                            const label = context.dataset.label || "";
                            const value = context.raw;
                            return `${label}: ${value}`;
                          },
                        },
                      },
                    },
                    events: [
                      "mousemove",
                      "mouseout",
                      "click",
                      "touchstart",
                      "touchmove",
                    ],
                    onHover: handleHover,
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
