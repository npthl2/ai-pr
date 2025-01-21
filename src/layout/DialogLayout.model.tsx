import { DialogType } from '@model/Dialog';

export interface DialogLayoutProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  isTopmost: boolean;
  type?: DialogType;
  onConfirm?: () => void;
  onCancel?: () => void;
  onCloseDialog?: () => void;
  customActions?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
}
