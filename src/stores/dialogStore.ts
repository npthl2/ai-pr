import { create } from 'zustand';
import { DialogOptions } from '@model/dialog';

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