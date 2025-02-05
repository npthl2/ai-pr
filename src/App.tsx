import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@api/queryClient';
import Layout from '@layout/Layout';
import ProtectedRoute from '@router/ProtectedRoute';

import DialogExample from '@/pages/dialogExample/DialogExample';
import SelectExample from '@pages/selectExample/SelectExample';
import CheckboxExample from '@/pages/checkboxExample/CheckboxExample';
import ButtonExample from './pages/buttonExample/ButtonExample';
import RadioExample from './pages/radioExample/RadioExample';
import HomeExample from '@/pages/homeExample/HomeExample';
import LoginExample from '@/pages/loginExample/LoginExample';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='example'>
              <Route path='login' element={<LoginExample />} />
              <Route path='dialog' element={<DialogExample />} />
              <Route path='select' element={<SelectExample />} />
              <Route path='checkbox' element={<CheckboxExample />} />
              <Route path='button' element={<ButtonExample />} />
              <Route path='radio' element={<RadioExample />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path='/' element={<HomeExample />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
