import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@api/queryClient';
import Layout from '@layout/Layout';
import ProtectedRoute from '@router/ProtectedRoute';

import NestedDialogExample from '@/pages/examples/nestedDialog/DialogExample';
import SelectExample from '@pages/examples/select/SelectExample';
import CheckboxExample from '@pages/examples/checkbox/CheckboxExample';
import ButtonExample from '@pages/examples/button/ButtonExample';
import RadioExample from '@pages/examples/radio/RadioExample';
import BoardExample from '@pages/examples/board/BoardExample';
import LoginExample from '@pages/examples/login/LoginExample';
import TextFieldExample from '@pages/examples/textField/TextFieldExample';
import AlertExample from '@pages/examples/alert/AlertExample';
import DialogExample from '@/pages/examples/dialog/DialogExample';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='example'>
              <Route path='login' element={<LoginExample />} />
              <Route path='nestedDialog' element={<NestedDialogExample />} />
              <Route path='select' element={<SelectExample />} />
              <Route path='checkbox' element={<CheckboxExample />} />
              <Route path='button' element={<ButtonExample />} />
              <Route path='radio' element={<RadioExample />} />
              <Route path='board' element={<BoardExample />} />
              <Route path='textField' element={<TextFieldExample />} />
              <Route path='alert' element={<AlertExample />} />
              <Route path='dialog' element={<DialogExample />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path='/' element={<BoardExample />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
