import { useDialogStore } from '@stores/dialogStore';
import { DialogLayout } from '@layout/DialogLayout';

export const NestedDialog = () => {
    const dialogs = useDialogStore((state) => state.dialogs);
    const closeDialog = useDialogStore((state) => state.closeDialog);

    return (
        <>
            {dialogs.map((dialog) => (
                <DialogLayout
                    key={dialog.id}
                    open={dialog.isOpen}
                    onClose={() => closeDialog(dialog.id)}
                    isTopmost={dialog.zIndex === dialogs.length}
                    title={dialog.options?.title}
                    type={dialog.options?.type}
                    onConfirm={dialog.options?.onConfirm}
                    customActions={dialog.options?.customActions}
                    confirmText={dialog.options?.confirmText}
                    cancelText={dialog.options?.cancelText}
                >
                    {dialog.content}
                </DialogLayout>
            ))}
        </>
    );
}; 