import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip);

interface Data {
  x: number;
  y: number;
}

interface Props {
  dataContent?: Data[];
}

const ScatterChart: React.FC<Props> = ({ dataContent }) => {
  const data = {
    datasets: [
      {
        data: dataContent,
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {}
  };

  return <Scatter data={data} options={options} />;
};

export default ScatterChart;
