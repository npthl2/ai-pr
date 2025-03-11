import Dialog from '@components/Dialog';
import DaumPostcode from 'react-daum-postcode';

interface InvoiceAddressSearchModalProps {
  open: boolean;
  postcode: string;
  onClose: () => void;
  onComplete: (data: { address: string; zonecode: string }) => void;
}

const InvoiceAddressSearchModal = ({
  open,
  onClose,
  onComplete,
  postcode,
}: InvoiceAddressSearchModalProps) => {
  return (
    <Dialog
      title='주소 검색'
      size='medium'
      content={<DaumPostcode onComplete={onComplete} defaultQuery={postcode} />}
      onClose={onClose}
      open={open}
    />
  );
};

export default InvoiceAddressSearchModal;
