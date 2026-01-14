import { useStore } from "@/store/store";
import type { Job } from "@/types";
import { useState } from "react";
import { Button } from "../ui/button";
import { DeepslateItem } from "../ui/deepslate-item";
import JobDialog from "./job-dialog";
import RemoveJobDialog from "./remove-job-dialog";

type Props = {
    openAddActionModal: () => void;
};

const JobHeader = ({ openAddActionModal }: Props) => {
    const { getCurrentJob } = useStore();
    const job: Job | undefined = getCurrentJob();
    const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);

    if (!job) return null;

    return (
        <div className="bg-white flex justify-between items-center py-4 px-8 mb-8">
            <div className="flex flex-col gap-2">
                <div className="flex gap-4">
                    <div className="size-16 rounded-md flex items-center justify-center">
                        {job.icon && (
                            <DeepslateItem id={job.icon} className="size-16" />
                        )}
                    </div>
                    <h3>{job.name}</h3>
                </div>
                <p>{job.description}</p>
            </div>
            <div className="flex gap-4">
                <Button variant="outline" onClick={openAddActionModal}>
                    Add Action
                </Button>
                <Button
                    variant="outline"
                    onClick={() => setIsJobDialogOpen(true)}
                >
                    Edit Job
                </Button>
                <JobDialog
                    isOpen={isJobDialogOpen}
                    onClose={() => setIsJobDialogOpen(false)}
                    jobToEdit={job}
                />
                <RemoveJobDialog jobId={job.id}>
                    <Button variant="destructive">Remove Job</Button>
                </RemoveJobDialog>
            </div>
        </div>
    );
};

export default JobHeader;
