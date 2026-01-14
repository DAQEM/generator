import { useStore } from "@/store/store";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import ProjectCard from "./project-card";

const OpenProjectDialog = () => {
    const { selectProject, projects } = useStore();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="justify-start"
                    disabled={projects.length === 0}
                >
                    Open Project
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm" aria-describedby={undefined}>
                <div>
                    <DialogTitle asChild>
                        <h3 className="text-2xl! font-bold!">Open Project</h3>
                    </DialogTitle>
                    <p>Select a project from the list below:</p>
                </div>
                <div className="grid gap-4 max-h-48 overflow-y-auto">
                    {projects.length === 0 ? (
                        <p>No projects available.</p>
                    ) : (
                        projects.map((project) => (
                            <Button
                                key={project.id}
                                variant="empty"
                                size="full"
                                className="text-left"
                                onClick={() => selectProject(project.id)}
                            >
                                <ProjectCard project={project} />
                            </Button>
                        ))
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default OpenProjectDialog;
