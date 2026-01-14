import type { Job } from "@/types";
import { Card, CardHeader } from "../ui/card";

type Props = {
    job: Job;
};

const JobCard = ({ job }: Props) => {
    return (
        <Card className="w-full h-full min-h-48 relative">
            <CardHeader>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-4">
                        <div className="size-20 bg-neutral-200">
                            <img src={job.icon} alt={job.name} />
                        </div>
                        <h3>{job.name}</h3>
                    </div>
                    <div className="text-base font-normal">
                        <p>{job.description}</p>
                    </div>
                    <div className="text-neutral-500">
                        <p>
                            {job.actions.length} Actions, {job.price} Coins
                        </p>
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
};

export default JobCard;
