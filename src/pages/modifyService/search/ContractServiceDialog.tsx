import Dialog from '@components/Dialog';

interface ContractServiceDialogProps {
  open: boolean;
  title: string;
  content: string;
  onClose: () => void;
}

const ContractServiceDialog = ({ open, title, content, onClose }: ContractServiceDialogProps) => {
  return (
    <Dialog
      open={open}
      closeLabel='확인'
      title={title}
      content={content}
      onClose={onClose}
      size='small'
      disableRestoreFocus
      data-testid='service-search-change-blocked-dialog'
      sx={{
        '& .MuiDialog-paper': {
          height: '190px',
          width: '420px',
        },
        '& [data-testid="component-dialog-close-button"]': {
          backgroundColor: 'primary.main',
          borderColor: 'primary.main',
          '& .MuiTypography-root': {
            color: 'primary.contrastText',
          },
        },
      }}
    />
  );
};

export default ContractServiceDialog;
