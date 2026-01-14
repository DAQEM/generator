import { actionTypes, conditionTypes, type ActionTypesKeys } from "@/lib/data";
import type { JobCondition } from "@/types";
import { useState } from "react";
import { v4 } from "uuid";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import ConditionCard from "./condition-card";
type Props = {
    conditions: JobCondition[];
    onConditionsChange: (conditions: JobCondition[]) => void;
    actionType: ActionTypesKeys;
};
const AddConditionDialog = ({
    conditions,
    onConditionsChange,
    actionType,
}: Props) => {
    const [query, setQuery] = useState<string | undefined>(undefined);
    const [open, setOpen] = useState(false);
    const compatibleConditions = Object.entries(conditionTypes).filter(
        ([, condition]) => {
            return condition.isActionCompatible(actionTypes[actionType]);
        }
    );
    const filteredConditions = query
        ? compatibleConditions.filter(
              ([key, condition]) =>
                  condition.title.toLowerCase().includes(query.toLowerCase()) ||
                  key.toLowerCase().includes(query.toLowerCase())
          )
        : compatibleConditions;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                    Add Condition
                </Button>
            </DialogTrigger>
            <DialogContent
                className="max-w-3xl max-h-128 h-full flex flex-col"
                aria-describedby={undefined}
            >
                <DialogTitle asChild>
                    <h3 className="text-2xl! font-bold!">New Condition</h3>
                </DialogTitle>

                <div className="flex flex-col h-full gap-4 overflow-hidden">
                    <div className="grid w-full items-center gap-3">
                        <Label htmlFor="query">Search</Label>
                        <Input
                            id="query"
                            type="text"
                            placeholder="Search Conditions"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 overflow-y-auto">
                        {filteredConditions.length === 0 ? (
                            <p>No compatible conditions found.</p>
                        ) : (
                            filteredConditions.map(([key, condition]) => (
                                <Button
                                    key={key}
                                    type="submit"
                                    variant="empty"
                                    size="full"
                                    className="text-left"
                                    onClick={() => {
                                        const newCondition: JobCondition = {
                                            id: v4(),
                                            type: condition.id,
                                            data: {},
                                            inverted: false,
                                        };

                                        onConditionsChange([
                                            ...conditions,
                                            newCondition,
                                        ]);

                                        setOpen(false);
                                    }}
                                >
                                    <ConditionCard
                                        condition={{
                                            type: condition.id,
                                            data: {},
                                        }}
                                    />
                                </Button>
                            ))
                        )}
                    </div>
                </div>

                <DialogFooter className="gap-4 pt-2">
                    <DialogClose asChild>
                        <Button variant="outline" className="w-full">
                            Cancel
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default AddConditionDialog;
