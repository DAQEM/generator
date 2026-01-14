import { useStore } from "@/store/store";
import type { Project } from "@/types";

type Props = {
    children?: React.ReactNode;
};

const ProjectHeader = ({ children }: Props) => {
    const { getCurrentProject } = useStore();
    const project: Project | undefined = getCurrentProject();

    if (!project) return null;

    return (
        <div className="flex justify-between items-center mb-8">
            <div>
                <h2 className="text-3xl font-bold font-heading">
                    {project.name}
                </h2>
            </div>
            <div className="flex gap-4">{children}</div>
        </div>
    );
};

export default ProjectHeader;
