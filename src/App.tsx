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
      <CircularProgress /> <h1>Custome Line Chart With Arrow</h1>
      <div className="tw-border tw-w-full tw-aspect-square tw-mt-8">
        <CustomLineChart />
      </div>
    </>
  );
}

export default App;
