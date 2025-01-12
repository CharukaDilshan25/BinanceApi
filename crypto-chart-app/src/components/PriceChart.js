import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPriceData } from '../Store/cryptoSlice';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PriceChart = () => {
  const dispatch = useDispatch();
  const { currencyPair, dateRange, priceData, status, error } = useSelector(
    (state) => state.crypto
  );

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      dispatch(
        fetchPriceData({
          currencyPair,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        })
      );
    }
  }, [currencyPair, dateRange, dispatch]);

  const data = {
    labels: priceData.map((item) => item.date),
    datasets: [
      {
        label: 'Closing Price',
        data: priceData.map((item) => item.close),
        borderColor: '#36a2eb',
        backgroundColor: '#36a2eb',
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: `Closing Prices for ${currencyPair}` },
    },
    scales: {
      x: { title: { display: true, text: 'Date' } },
      y: { title: { display: true, text: 'Closing Price (USDT)' } },
    },
  };

  return (
    <div className="w-full max-w-3xl p-4 bg-white rounded shadow">
      {status === 'idle' && (
        <p className="text-gray-600">Select a currency pair and date range to view data.</p>
      )}
      {status === 'loading' && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
          <p className="ml-2 text-gray-600">Loading...</p>
        </div>
      )}
      {status === 'failed' && <p className="text-red-500">Error: {error}</p>}
      {status === 'succeeded' && priceData.length === 0 && (
        <p className="text-gray-600">No data available for the selected range.</p>
      )}
      {status === 'succeeded' && priceData.length > 0 && (
        <div className="p-4">
          <Line data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default PriceChart;