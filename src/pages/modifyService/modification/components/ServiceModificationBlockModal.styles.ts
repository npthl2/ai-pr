/**
 * 요금제 변경 불가 알림 모달 스타일
 */
export const styles = {
  modalContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
    gap: '24px',
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
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    py: 3,
    gap: 2,
  },
  messageText: {
    fontSize: '16px',
    textAlign: 'center',
    color: '#333',
    fontWeight: 400,
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    mt: 2,
  },
  contentContainerWithStart: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'left',
    py: 3,
    gap: 2,
  },
  messageTextWithPreLine: {
    fontSize: '16px',
    textAlign: 'left',
    color: '#333',
    fontWeight: 400,
    whiteSpace: 'pre-line',
  },
  modalFooterWithCancel: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    mt: 2,
  },
  modalFooterWithoutCancel: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    mt: 2,
  },
};
