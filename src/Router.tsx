import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route path="*" element={<div>Página não encontrada</div>} />
    </Routes>
  );
}