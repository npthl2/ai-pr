import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@layout/Layout';
import Home from '@pages/home/Home';
import Login from '@pages/login/Login';
import ProtectedRoute from '@router/ProtectedRoute';
import { Example } from '@pages/example/Example';
import SelectExample from '@pages/selectExample/SelectExample';
import CheckboxExample from '@/pages/checkboxExample/CheckboxExample';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/dialog-ex' element={<Example />} />
          <Route path='/select-ex' element={<SelectExample />} />
          <Route path='/checkbox-ex' element={<CheckboxExample />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
