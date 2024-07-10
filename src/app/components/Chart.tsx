import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

interface Data {
  x: Number;
  y: Number;
}

interface Props {
  dataContent?: Data[];
}

const ScatterChart: React.FC<Props> = ({ dataContent }) => {
  const data = {
    datasets: [
      {
        label: 'Scatter Dataset',
        data: dataContent,
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Scatter Plot Example'
      }
    }
  };

  return <Scatter data={data} options={options} />;
};

export default ScatterChart;
