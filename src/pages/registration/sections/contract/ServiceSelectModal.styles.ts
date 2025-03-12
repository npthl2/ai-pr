export const styles = {
  modalContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
    gap: '24px',
    marginLeft: '24px',
    marginRight: '24px',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 3,
  },
  closeButton: {
    p: 0,
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '64px',
    paddingTop: '16px',
    paddingRight: '24px',
    paddingBottom: '16px',
    paddingLeft: '24px',
    backgroundColor: '#EDEFF1',
  },

  searchInput: {
    width: '362px',
    height: '32px',
    backgroundColor: '#FFFFFF',
  },
  searchButton: {
    minWidth: '61px',
    padding: '8px',
  },
  tableContainer: {
    height: '300px',
    overflow: 'auto',
  },
  tableTitle: {
    fontWeight: 'bold',
    mb: 1,
  },
  table: {
    boxShadow: 'none',
  },
  tableHeaderCell: {
    backgroundColor: '#f5f5f5',
    fontWeight: 500,
  },
  tableRow: {
    '&:last-child td, &:last-child th': { border: 0 },
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    mt: 2,
  },
  cancelButton: {
    mr: 1,
  },
  selectButton: {
    mr: 1,
  },
};
