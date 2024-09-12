import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Trip } from './pages/Trip';

export function Router() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<Home />} />
        <Route path="/viagem" element={<Trip />} />
      </Route>

      <Route path="*" element={<div>Página não encontrada</div>} />
    </Routes>
  );
}
