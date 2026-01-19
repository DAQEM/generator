import { useStore } from "@/store/store";
import type { Project } from "@/types";

type Props = {
    children?: React.ReactNode;
    backButton?: React.ReactNode;
};

const ProjectHeader = ({ children, backButton }: Props) => {
    const { getCurrentProject } = useStore();
    const project: Project | undefined = getCurrentProject();

    if (!project) return null;

    return (
        <div className="flex justify-between items-center mb-8">
            <div className="flex items-end gap-4">
                {backButton}
                <h2 className="text-3xl font-bold font-heading leading-10">
                    {project.name}
                </h2>
            </div>
            <div className="flex gap-4">{children}</div>
        </div>
    );
};

export default ProjectHeader;
