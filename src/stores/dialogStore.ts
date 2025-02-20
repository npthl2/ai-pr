import { create } from 'zustand';
import { DialogOptions } from '@model/Dialog';
import { mountStoreDevtool } from 'simple-zustand-devtools';

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
      dialogs: [
        ...state.dialogs,
        {
          id,
          isOpen: true,
          content,
          zIndex: state.dialogs.length + 1,
          options,
        },
      ],
    })),
  closeDialog: (id) =>
    set((state) => ({
      dialogs: state.dialogs.filter((dialog) => dialog.id !== id),
    })),
}));

if (import.meta.env.DEV) {
  mountStoreDevtool('Dialog Store', useDialogStore); // 개발도구에 노출될 적절한 문자열을 지정해 주세요.
}
