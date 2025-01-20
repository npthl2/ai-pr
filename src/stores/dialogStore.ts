import { create } from 'zustand';
import { ReactNode } from 'react';

interface DialogOptions {
    type?: 'alert' | 'confirm' | 'custom' | 'none';
    title?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    onClose?: () => void;
    customActions?: ReactNode;
    confirmText?: string;
    cancelText?: string;
}

interface DialogState {
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

export const useDialogStore = create<DialogState>()((set) => ({
    dialogs: [],
    openDialog: (id, content, options) =>
        set((state) => ({
            dialogs: [...state.dialogs, {
                id,
                isOpen: true,
                content,
                zIndex: state.dialogs.length + 1,
                options
            }]
        })),
    closeDialog: (id) =>
        set((state) => ({
            dialogs: state.dialogs.filter(dialog => dialog.id !== id)
        })),
})); 