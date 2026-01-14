import { conditionTypes } from "@/lib/data";
import type { JobCondition } from "@/types";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader } from "../ui/card";

type Props = {
    condition: JobCondition;
    onRemoveCondition: (conditionId: string) => void;
};

const AdvancedConditionCard = ({ condition, onRemoveCondition }: Props) => {
    const conditionType = conditionTypes[condition.type];

    return (
        <Card className="w-full relative">
            <CardHeader>
                <div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => onRemoveCondition(condition.id)}
                    >
                        <X />
                    </Button>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-4">
                        <div className="flex items-center justify-center">
                            <p className="text-2xl">{conditionType.emoji}</p>
                        </div>
                        <h3 className="text-2xl! font-bold! whitespace-pre-wrap">
                            {conditionType.title}
                        </h3>
                    </div>
                    <div className="text-base font-normal">
                        <p>Placeholder condition description for now.</p>
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
};

export default AdvancedConditionCard;
