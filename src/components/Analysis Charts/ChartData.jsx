// ChartData.jsx
import React, { useState } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
);

const ChartData = () => {
  const [startDate1, setStartDate1] = useState(new Date());
  const [startDate2, setStartDate2] = useState(new Date());
  const [time1, setTime1] = useState(new Date());
  const [time2, setTime2] = useState(new Date());

  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales Data',
        data: [10, 20, 15, 30, 25, 40, 35],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
      },
    ],
  };

  const barChartData = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Sales Data',
        data: chartData.datasets[0].data,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const doughnutChartData = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Sales Data',
        data: chartData.datasets[0].data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(0, 0, 0, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(0, 0, 0, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Value: ${tooltipItem.raw}`,
        },
      },
    },
  };

  return (
    <div className="container mx-auto py-20">
      <h1 className="text-4xl mb-6">Analysis</h1>

      <div className=' flex flex-col md:flex-row space-x-2 md:space-x-4 mb-6'>
           {/* Date and Time Picker for From Date */}
      <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
        <div>
          <label className="block text-lg mb-2">From Date:</label>
          <DatePicker
            selected={startDate1}
            onChange={(date) => setStartDate1(date)}
            className="p-2 border border-gray-300 rounded-md"
            dateFormat="MMMM d, yyyy"
          />
        </div>
        <div>
          <label className="block text-lg mb-2">From Time:</label>
          <DatePicker
            selected={time1}
            onChange={(time) => setTime1(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>



   {/* Date and Time Picker for To Date */}
   <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
        <div>
          <label className="block text-lg mb-2">To Date:</label>
          <DatePicker
            selected={startDate2}
            onChange={(date) => setStartDate2(date)}
            className="p-2 border border-gray-300 rounded-md"
            dateFormat="MMMM d, yyyy"
          />
        </div>
        <div>
          <label className="block text-lg mb-2">To Time:</label>
          <DatePicker
            selected={time2}
            onChange={(time) => setTime2(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      </div>

   

   

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="chart-container h-72 sm:h-80 md:h-96 lg:h-80 xl:h-96">
          <h2 className="text-2xl mb-4">Line Chart</h2>
          <Line data={chartData} options={options} />
        </div>
        <div className="chart-container h-72 sm:h-80 md:h-96 lg:h-80 xl:h-96">
          <h2 className="text-2xl mb-4">Bar Chart</h2>
          <Bar data={barChartData} options={options} />
        </div>
        <div className="chart-container h-72 sm:h-80 md:h-96 lg:h-80 xl:h-96">
          <h2 className="text-2xl mb-4">Doughnut Chart</h2>
          <Doughnut data={doughnutChartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ChartData;
