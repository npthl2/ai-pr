import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@api/queryClient';
import Layout from '@layout/Layout';
import ProtectedRoute from '@router/ProtectedRoute';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { getTheme } from '@theme/theme';
import { Toast } from '@components/Toast';
import MainLayout from '@layout/MainLayout';
import CustomerLayout from '@layout/CustomerLayout';

import NestedDialogExample from '@pages/examples/nestedDialog/DialogExample';
import SelectExample from '@pages/examples/select/SelectExample';
import CheckboxExample from '@pages/examples/checkbox/CheckboxExample';
import ButtonExample from '@pages/examples/button/ButtonExample';
import RadioExample from '@pages/examples/radio/RadioExample';
import BoardExample from '@pages/examples/board/BoardExample';
import LoginExample from '@pages/examples/login/LoginExample';
import AutocompleteExample from '@pages/examples/autocomplete/AutocompleteExample';
import ChipExample from '@pages/examples/chip/ChipExample';
import TextFieldExample from '@pages/examples/textField/TextFieldExample';
import TooltipExample from '@pages/examples/tooltip/TooltipExample';
import AlertExample from '@pages/examples/alert/AlertExample';
import DialogExample from '@pages/examples/dialog/DialogExample';
import TabsExample from '@pages/examples/tabs/TabsExample';
import TableExample from '@pages/examples/table/TableExample';
import ToastExample from '@pages/examples/toast/ToastExmple';
import ApiTestExample from './pages/examples/apiTest/ApiTestExample';
import Board from '@pages/test/board/Board';
import RegistBoard from '@pages/test/board/component/RegistBoard';
import MemoTestPage from '@pages/memoAndSendHistory/MemoTestPage';
import MemoAndHistoryPanel from '@pages/memoAndSendHistory/MemoAndSendHistoryPanel';
import { useState } from 'react';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={getTheme('light')}>
        <CssBaseline />
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
                <Route path='autocomplete' element={<AutocompleteExample />} />
                <Route path='chip' element={<ChipExample />} />
                <Route path='textField' element={<TextFieldExample />} />
                <Route path='tooltip' element={<TooltipExample />} />
                <Route path='alert' element={<AlertExample />} />
                <Route path='dialog' element={<DialogExample />} />
                <Route path='tabs' element={<TabsExample />} />
                <Route path='table' element={<TableExample />} />
                <Route path='toast' element={<ToastExample />} />
                <Route path='api-test' element={<ApiTestExample />} />
                {/* TO-DO : 레이아웃 구성전 임시 페이지. 삭제 필요 */}
                <Route path='memo-test' element={<MemoTestPage />} />
              </Route>
              <Route path='test'>
                <Route path='board' element={<Board />} />
                <Route path='board/regist' element={<RegistBoard />} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                  <Route path='/' element={<CustomerLayout />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
        {/* TO-DO : cypress 에서 test id 중복으로 오류 발생해서 임시 주석 처리 */}
        {/* <MemoAndHistoryPanel /> */}
        <Toast />
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
