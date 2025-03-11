import Dialog from '@components/Dialog';
import DaumPostcode from 'react-daum-postcode';

interface InvoicePostCodeModalProps {
  open: boolean;
  postcode: string;
  onClose: () => void;
  onComplete: (data: unknown) => void;
}

const InvoicePostCodeModal = ({
  open,
  onClose,
  onComplete,
  postcode,
}: InvoicePostCodeModalProps) => {
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

export default InvoicePostCodeModal;
