export const styles = {
  modalContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
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
    mb: 3,
  },
  searchLabel: {
    mr: 2,
    fontWeight: 500,
  },
  searchInput: {
    width: '70%',
    mr: 2,
  },
  searchButton: {
    minWidth: '80px',
  },
  tableContainer: {
    mb: 3,
  },
  tableTitle: {
    fontWeight: 'bold',
    mb: 1,
  },
  table: {
    boxShadow: 'none',
    border: '1px solid #e0e0e0',
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
    mt: 2,
  },
  cancelButton: {
    mr: 1,
  },
  selectButton: {
    minWidth: '80px',
  },
};
