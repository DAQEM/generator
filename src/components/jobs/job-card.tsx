import type { Job } from "@/types";
import { Card, CardHeader } from "../ui/card";
import { DeepslateItem } from "../ui/deepslate-item";

type Props = {
    job: Job;
};

const JobCard = ({ job }: Props) => {
    return (
        <Card className="w-full h-full min-h-40 relative">
            <CardHeader>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-4">
                        <div className="size-16 flex items-center justify-center rounded-md">
                            {job.icon ? (
                                <DeepslateItem
                                    id={job.icon}
                                    className="size-16"
                                />
                            ) : (
                                <span className="text-3xl text-neutral-400">
                                    ?
                                </span>
                            )}
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
