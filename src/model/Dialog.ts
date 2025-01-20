export type DialogType = 'alert' | 'confirm' | 'custom' | 'none';

// 다이얼로그 관련 인터페이스
export interface DialogOptions {
    title?: string;
    confirmText?: string;
    cancelText?: string;
    onClose?: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
    customActions?: React.ReactNode;
    type?: DialogType;
}