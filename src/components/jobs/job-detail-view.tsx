import { useStore } from "@/store/store";
import { useState } from "react";

import type { JobAction } from "@/types";
import { Plus } from "lucide-react";
import ActionCard from "../actions/action-card";
import ActionDialog from "../actions/action-dialog";
import GridLayout from "../layout/grid-layout";
import ProjectHeader from "../projects/project-header";
import { Button } from "../ui/button";
import JobHeader from "./job-header";

const JobDetailView = () => {
    const { getCurrentJob, selectJob } = useStore();
    const job = getCurrentJob();
    const [isActionModalOpen, setIsActionModalOpen] = useState(false);
    const [selectedActionId, setSelectedActionId] = useState<string | null>(
        null
    );

    const { currentProjectId } = useStore();

    if (!job || !currentProjectId) return null;

    return (
        <div className="p-8 h-[calc(100vh-80px)] flex flex-col">
            <ActionDialog
                isOpen={isActionModalOpen}
                onClose={() => {
                    setIsActionModalOpen(false);
                    setSelectedActionId(null);
                }}
                projectId={currentProjectId}
                jobId={job.id}
                actionToEdit={
                    job.actions.find((a) => a.id === selectedActionId) || null
                }
            />

            <ProjectHeader>
                <Button variant="outline" onClick={() => selectJob(null)}>
                    Back to Jobs
                </Button>
            </ProjectHeader>
            <JobHeader openAddActionModal={() => setIsActionModalOpen(true)} />

            {/* Actions List */}
            <GridLayout>
                {job.actions.map((action: JobAction) => (
                    <Button
                        key={action.id}
                        variant="empty"
                        size="full"
                        className="text-left"
                        onClick={() => {
                            setSelectedActionId(action.id);
                            setIsActionModalOpen(true);
                        }}
                    >
                        <ActionCard action={action} />
                    </Button>
                ))}
                <Button
                    variant="outline"
                    className="min-h-48"
                    onClick={() => setIsActionModalOpen(true)}
                >
                    <Plus /> Add Action
                </Button>
            </GridLayout>
        </div>
    );
};

export default JobDetailView;
