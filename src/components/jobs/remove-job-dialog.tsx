import { useStore } from "@/store/store";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";

type Props = {
    jobId: string;
    children: React.ReactNode;
};

const RemoveJobDialog = ({ jobId, children }: Props) => {
    const { currentProjectId, deleteJob } = useStore();

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-sm" aria-describedby={undefined}>
                <DialogTitle asChild>
                    <h3 className="text-2xl! font-bold!">Remove Job</h3>
                </DialogTitle>
                <p>Are you sure you want to remove this job?</p>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        type="submit"
                        onClick={() => {
                            deleteJob(currentProjectId!, jobId);
                        }}
                    >
                        Remove Job
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default RemoveJobDialog;
