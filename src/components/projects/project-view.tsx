import { useStore } from "@/store/store";
import { useState } from "react";

import { exportProject } from "@/lib/exporter"; // Import the exporter
import type { Job } from "@/types";
import { Plus } from "lucide-react";
import JobCard from "../jobs/job-card";
import AddJobModal from "../jobs/job-dialog";
import GridLayout from "../layout/grid-layout";
import { Button } from "../ui/button";
import ProjectHeader from "./project-header";

const ProjectView = () => {
    const { getCurrentProject, selectJob, selectProject } = useStore();
    const project = getCurrentProject();
    const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false);
    const [isExporting, setIsExporting] = useState(false);

    if (!project) return null;

    const handleExport = async () => {
        setIsExporting(true);
        try {
            await exportProject(project);
        } catch (error) {
            console.error("Failed to export project", error);
            alert("Failed to export project. Check console for details.");
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="p-8 h-[calc(100vh-80px)] flex flex-col">
            <AddJobModal
                isOpen={isAddJobModalOpen}
                onClose={() => setIsAddJobModalOpen(false)}
            />
            <ProjectHeader>
                <Button
                    variant="destructive"
                    onClick={() => selectProject(null)}
                >
                    Close
                </Button>
                <Button
                    variant="outline"
                    onClick={() => setIsAddJobModalOpen(true)}
                >
                    Add Job
                </Button>
                <Button
                    variant="default"
                    onClick={handleExport}
                    disabled={isExporting}
                >
                    {isExporting ? "Exporting..." : "Export Datapack"}
                </Button>
            </ProjectHeader>

            {/* Jobs Grid */}
            <GridLayout>
                {project.jobs.map((job: Job) => (
                    <Button
                        key={job.id}
                        variant="empty"
                        size="full"
                        className="text-left"
                        onClick={() => selectJob(job.id)}
                    >
                        <JobCard key={job.id} job={job} />
                    </Button>
                ))}
                <Button
                    variant="outline"
                    className="min-h-40 h-full"
                    onClick={() => setIsAddJobModalOpen(true)}
                >
                    <Plus /> Add Job
                </Button>
            </GridLayout>
        </div>
    );
};

export default ProjectView;
