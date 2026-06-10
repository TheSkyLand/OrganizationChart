import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chart  from './pages/Chart';
import CustomChart from './pages/CustomChart';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chart />} />
        <Route path="/mychart" element={<CustomChart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App