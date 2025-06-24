// Example snippet for App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
    </Routes>
  );
}

export default App;