import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chart  from './pages/Chart';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App