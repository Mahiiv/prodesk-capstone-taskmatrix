import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      {/* placeholder for now, real dashboard comes later */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;