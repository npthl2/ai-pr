import { Suspense } from 'react';
import CustomerDetail from './CustomerDetail';

const CustomerDetailContainer = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CustomerDetail />
    </Suspense>
  );
};

export default CustomerDetailContainer;
