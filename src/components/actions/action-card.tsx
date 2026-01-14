import { actionTypes } from "@/lib/data";
import { useStore } from "@/store/store";
import type { JobAction } from "@/types";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader } from "../ui/card";

type Props = {
    action: JobAction;
};

const ActionCard = ({ action }: Props) => {
    const { currentProjectId, currentJobId, deleteAction } = useStore();

    const actionData = actionTypes[action.type];

    if (!actionData) {
        return null;
    }

    return (
        <Card className="w-full h-full min-h-40 relative">
            <CardHeader>
                <div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteAction(
                                currentProjectId!,
                                currentJobId!,
                                action.id
                            );
                        }}
                    >
                        <X />
                    </Button>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-4">
                        <div className="flex items-center justify-center">
                            <p className="text-4xl">{actionData.emoji}</p>
                        </div>
                        <h3>{actionData.title}</h3>
                    </div>
                    <div className="text-base font-normal">
                        <p>Placeholder action description for now.</p>
                    </div>
                    <div>
                        <div className="text-neutral-500 text-sm font-normal">
                            <p>{action.conditions.length} Conditions</p>
                        </div>
                        <div className="text-neutral-500 text-sm font-normal">
                            <p>
                                {action.min_experience}XP -{" "}
                                {action.max_experience}
                                XP
                            </p>
                        </div>
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
};

export default ActionCard;
