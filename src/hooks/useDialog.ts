import { useDialogStore } from '../stores/dialogStore';
import { ReactNode } from 'react';

interface DialogOptions {
    title?: string;
    confirmText?: string;
    cancelText?: string;
    onClose?: () => void;
}

export const useDialog = () => {
    const openDialog = useDialogStore((state) => state.openDialog);

    const alert = (content: ReactNode, options?: DialogOptions) => {
        openDialog('alert-dialog', content, {
            type: 'alert',
            title: options?.title ?? '알림',
            confirmText: options?.confirmText ?? '확인',
            onClose: options?.onClose
        });
    };

    const confirm = (
        content: ReactNode,
        onConfirm: () => void,
        options?: DialogOptions & { onCancel?: () => void }
    ) => {
        openDialog('confirm-dialog', content, {
            type: 'confirm',
            title: options?.title ?? '확인',
            onConfirm,
            onCancel: options?.onCancel,
            onClose: options?.onClose,
            confirmText: options?.confirmText ?? '확인',
            cancelText: options?.cancelText ?? '취소'
        });
    };

    const custom = (
        content: ReactNode,
        customActions: ReactNode,
        options?: DialogOptions
    ) => {
        openDialog('custom-dialog', content, {
            type: 'custom',
            title: options?.title,
            customActions,
            onClose: options?.onClose
        });
    };

    return {
        alert,
        confirm,
        custom,
        openDialog
    };
}; 