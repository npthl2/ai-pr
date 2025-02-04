import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@api/queryClient';
import Layout from '@layout/Layout';
import Home from '@pages/home/Home';
import Login from '@pages/login/Login';
import ProtectedRoute from '@router/ProtectedRoute';
import { Example } from '@pages/example/Example';
import SelectExample from '@pages/selectExample/SelectExample';
import CheckboxExample from '@/pages/checkboxExample/CheckboxExample';
import ButtonExample from './pages/buttonExample/ButtonExample';
import RadioExample from './pages/radioExample/RadioExample';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/login' element={<Login />} />
            <Route path='/dialog-ex' element={<Example />} />
            <Route path='/select-ex' element={<SelectExample />} />
            <Route path='/checkbox-ex' element={<CheckboxExample />} />
            <Route path='/button-ex' element={<ButtonExample />} />
            <Route path='/radio-ex' element={<RadioExample />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/' element={<Home />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
