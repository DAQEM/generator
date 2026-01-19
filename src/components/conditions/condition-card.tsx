import { conditionTypes } from "@/lib/data";
import type { JobCondition } from "@/types";
import { Card, CardHeader } from "../ui/card";

type Props = {
    condition: Omit<JobCondition, "id">;
};

const ConditionCard = ({ condition }: Props) => {
    console.log(condition.type);

    const conditionType = conditionTypes[condition.type];

    if (!conditionType) {
        return null;
    }

    return (
        <Card className="w-full">
            <CardHeader>
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

export default ConditionCard;
