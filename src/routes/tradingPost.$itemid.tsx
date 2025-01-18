import { createFileRoute, useLoaderData } from "@tanstack/react-router";
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
import { TTPItem } from "../Utils/types";
import "chartjs-adapter-date-fns";
import { getItemColor } from "../Components/TradingPost/TPItemListingComponent";
import TPPriceComponent from "../Components/TradingPost/TPPriceComponent";
import Navbar from "../Components/NavBar/Navbar";
import SkeletonLoader from "../Components/SkeletonLoading/SkeletonLoader";

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

export const Route = createFileRoute("/tradingPost/$itemid")({
  component: TradingPostItemComponent,
  loader: async ({ params }) => {
    const itemId = params.itemid;
    //@ts-ignore
    const APIBaseURL = import.meta.env.VITE_API_URL;

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
  const { item } = useLoaderData({ from: "/tradingPost/$itemid" });
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
            pointHoverRadius: 2,
          },
          {
            label: "Demand",
            data: filteredData.map((entry: any) => entry.demand),
            borderColor: "rgb(255, 206, 86)",
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            pointRadius: 0,
            pointHoverRadius: 2,
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

      const index =
        priceChartElements.length > 0
          ? priceChartElements[0].index
          : supplyDemandChartElements[0].index;

      if (index) {
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
      }
    }
  };

  if (!item) {
    return <SkeletonLoader amountOfRows={10} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <Navbar />
      <div className=" container m-auto flex flex-col gap-4 p-4 rounded-lg shadow-lg">
        <div className="container rounded-md ">
          <div className="bg-gray-800 p-4">
            <h1 className={`text-2xl font-bold ${getItemColor(item)}`}>
              {item.name}
            </h1>
            <div className="flex items-center gap-8">
              <img
                src={item.icon}
                alt={item.name}
                className="w-20 h-20 rounded-md"
              />
              <div className="flex flex-col justify-center">
                <p className={`${getItemColor(item)}`}>Rarity: {item.rarity}</p>
                <p>Level: {item.level}</p>
              </div>
              <div className="flex flex-row gap-6">
                <div>
                  <p>Vendor value: </p>
                  <p>Sell price: </p>
                  <p>Buy price: </p>
                  <p>Supply: </p>
                  <p>Demand: </p>
                </div>
                <div className="gap-4">
                  <TPPriceComponent price={item.vendorValue} />
                  <TPPriceComponent
                    price={item.LatestPrice.sellPrice.toString()}
                  />
                  <TPPriceComponent
                    price={item.LatestPrice.buyPrice.toString()}
                  />
                  <p className="text-right">
                    {item.LatestPrice.supply!.toLocaleString("en-US")}
                  </p>
                  <p className="text-right">
                    {item.LatestPrice.demand!.toLocaleString("en-US")}
                  </p>
                </div>
              </div>
            </div>
          </div>
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
                        mode: "index",
                        intersect: false,
                        callbacks: {
                          label: function (context) {
                            const label = context.dataset.label || "";
                            const value = context.raw;
                            return `${label} : ${value}`;
                          },
                        },
                      },
                    },
                    onHover: handleHover,
                    hover: {
                      mode: "index",
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
                        mode: "index",
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
                    onHover: handleHover,
                    hover: {
                      mode: "index",
                      intersect: false,
                    },
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
