type DialogType = 'alert' | 'confirm' | 'custom' | 'none';

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

export interface DialogState {
    dialogs: {
        id: string;
        isOpen: boolean;
        content: React.ReactNode;
        zIndex: number;
        options?: DialogOptions;
    }[];
    openDialog: (id: string, content: React.ReactNode, options?: DialogOptions) => void;
    closeDialog: (id: string) => void;
} 