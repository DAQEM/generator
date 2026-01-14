import type { Project } from "@/types";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

type Props = {
    project: Project;
};

const ProjectCard = ({ project }: Props) => {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.jobs.length} Jobs</CardDescription>
            </CardHeader>
        </Card>
    );
};

export default ProjectCard;
