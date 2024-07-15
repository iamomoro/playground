import './App.css';
import CircularProgress from './chartjs/CircularProgress';

function App() {

  return (
    <>
      <div>
        <h1>Circular Progress Bar with Labels</h1>
        {/* <CircularProgressBarWithLabels value={60} /> */}
      </div>
      <CircularProgress />
    </>
  );
}

export default App;
