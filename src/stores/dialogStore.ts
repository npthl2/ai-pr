import { create } from 'zustand';
import { DialogState } from '../model/dialog';

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