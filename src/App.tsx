import './App.css';
import CircularProgress from './chartjs/CircularProgress';
import CustomLineChart from './rechart/customLineChart/CustomLineChart';

function App() {

  return (
    <>
      <div>
        <h1>Circular Progress Bar with Labels</h1>
        {/* <CircularProgressBarWithLabels value={60} /> */}
      </div>
      <CircularProgress />
      <div></div>
      <CustomLineChart />
    </>
  );
}

export default App;
