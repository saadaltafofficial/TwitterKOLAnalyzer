import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { Filler } from 'chart.js';

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

// Register chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Chart = ({ time, price }) => {
  // Check if time and price arrays are provided and valid
  if (!time || !price || time.length !== price.length) {
    return <div>Invalid data</div>;
  }

  const data = {
    labels: time,  // Time array for x-axis
    datasets: [
      {
        label: 'Price History',
        data: price,  // Price array for y-axis
        borderColor: 'rgb(125, 102, 240, 1)',
        backgroundColor: 'rgb(125, 102, 240, 0.2)',
        fill: true,
        tension: 0.4,
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
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        beginAtZero: false,
      },
    },
  };

  return <Line data={data} options={options} />;
};

Chart.propTypes = {
  time: PropTypes.array.isRequired,
  price: PropTypes.array.isRequired,
};
export default Chart;


