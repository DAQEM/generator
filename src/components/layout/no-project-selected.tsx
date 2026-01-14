import { useStore } from "@/store/store";
import AddProjectDialog from "../projects/add-project-dialog";
import OpenProjectDialog from "../projects/open-project-dialog";
import { Button } from "../ui/button";

const NoProjectSelected = () => {
    const { projects, selectProject } = useStore();
    const recentProjects = [...projects].sort(
        (a, b) => b.updated_at - a.updated_at
    );

    return (
        <div
            id="container"
            className="flex flex-col justify-center items-center gap-8 h-[calc(100vh-80px)] w-full pb-32"
        >
            <h1>Welcome to the Job Generator</h1>
            <div id="content" className="flex justify-center gap-8 w-full">
                <div
                    id="buttons"
                    className="flex flex-col gap-2 max-w-48 w-full"
                >
                    <AddProjectDialog />
                    <OpenProjectDialog />
                    <Button className="justify-start">Import Project</Button>
                </div>
                <div id="projects" className="flex flex-col gap-1">
                    <h4>Recent Projects</h4>
                    {recentProjects.length === 0 ? (
                        <p>No projects available.</p>
                    ) : (
                        recentProjects.slice(0, 4).map((project) => (
                            <Button
                                key={project.id}
                                variant="link"
                                className="justify-start"
                                onClick={() => selectProject(project.id)}
                            >
                                {project.name}
                            </Button>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
export default NoProjectSelected;
