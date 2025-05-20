import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription, DialogFooter
} from "~/components/shadcn/dialog";
import {Button} from "~/components/shadcn/button";

interface ConfirmDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    title: string;
    text: string;
    handleConfirm: () => void;
}

export default function ConfirmDialog({open, setOpen, title, text, handleConfirm}: ConfirmDialogProps) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription/>
                </DialogHeader>
                <div className="mb-5">
                    <span>{text}</span>
                </div>
                <DialogFooter>
                    <Button className="cursor-pointer" variant="outline" onClick={() => setOpen(false)}>
                        Annuler
                    </Button>
                    <Button className="cursor-pointer" onClick={() => {
                        handleConfirm();
                        setOpen(false);
                    }}>
                        Confirmer
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

