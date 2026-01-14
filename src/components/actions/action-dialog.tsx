import { actionTypes, type ActionTypesKeys } from "@/lib/data";
import { useStore } from "@/store/store";
import type { JobCondition } from "@/types";
import _ from "lodash";
import { useEffect, useState } from "react";
import AddConditionDialog from "../conditions/add-condition-dialog";
import AdvancedConditionCard from "../conditions/advanced-condition-card";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

interface ActionData {
    id: string;
    type: ActionTypesKeys;
    min_experience: number;
    max_experience: number;
    conditions: any[];
    data: any;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    projectId: string;
    jobId: string;
    actionToEdit?: ActionData | null;
}

const ActionDialog = ({ isOpen, onClose, actionToEdit }: Props) => {
    const { currentProjectId, currentJobId, addAction, updateAction } =
        useStore();

    const [actionType, setActionType] = useState<ActionTypesKeys>(
        Object.keys(actionTypes)[0] as ActionTypesKeys
    );
    const [minExperience, setMinExperience] = useState("");
    const [maxExperience, setMaxExperience] = useState("");

    const [conditions, setConditions] = useState<JobCondition[]>([]);

    const isEditMode = !!actionToEdit;

    useEffect(() => {
        if (isOpen) {
            if (actionToEdit) {
                setActionType(actionToEdit.type);
                setMinExperience(String(actionToEdit.min_experience || ""));
                setMaxExperience(String(actionToEdit.max_experience || ""));
                setConditions(actionToEdit.conditions || []);
            } else {
                setActionType(Object.keys(actionTypes)[0] as ActionTypesKeys);
                setMinExperience("");
                setMaxExperience("");
                setConditions([]);
            }
        }
    }, [isOpen, actionToEdit]);

    function handleClose() {
        onClose();
    }

    const handleSave = () => {
        const payload = {
            type: actionType,
            min_experience: Number(minExperience),
            max_experience: Number(maxExperience),
            conditions: conditions,
            data: actionToEdit ? actionToEdit.data : {},
        };

        if (isEditMode && actionToEdit) {
            updateAction(
                currentProjectId!,
                currentJobId!,
                actionToEdit.id,
                payload
            );
        } else {
            addAction(currentProjectId!, currentJobId!, payload);
        }

        handleClose();
    };

    const handleUpdateCondition = (
        conditionId: string,
        data: Record<string, any>
    ) => {
        setConditions((prev) =>
            prev.map((c) =>
                c.id === conditionId
                    ? { ...c, data: { ...c.data, ...data } }
                    : c
            )
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent
                className="max-w-6xl p-0 max-h-172 h-full flex flex-col"
                aria-describedby={undefined}
            >
                <div className="grid grid-cols-3 h-full overflow-hidden">
                    <div className="col-span-1 bg-neutral-100 p-4 flex flex-col gap-4 overflow-y-auto">
                        <DialogTitle asChild>
                            <h3 className="text-2xl! font-bold!">
                                {isEditMode ? "Edit Action" : "New Action"}
                            </h3>
                        </DialogTitle>

                        <div className="grid w-full max-w-sm items-center gap-3 ">
                            <Label htmlFor="type">Action Type</Label>
                            <Select
                                value={actionType}
                                onValueChange={(value) =>
                                    setActionType(value as ActionTypesKeys)
                                }
                            >
                                <SelectTrigger className="w-full bg-white">
                                    <SelectValue placeholder="Select an action type" />
                                </SelectTrigger>
                                <SelectContent position="item-aligned">
                                    {Object.entries(
                                        Object.groupBy(
                                            Object.entries(actionTypes),
                                            ([, value]) => value.category
                                        )
                                    )
                                        .sort(([a], [b]) => a.localeCompare(b))
                                        .map(([category, actions]) => (
                                            <SelectGroup key={category}>
                                                <SelectLabel>
                                                    {_.startCase(category)}
                                                </SelectLabel>
                                                {actions?.map(
                                                    ([key, value]) => (
                                                        <SelectItem
                                                            key={key}
                                                            value={key}
                                                        >
                                                            {value.title}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectGroup>
                                        ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex gap-4">
                            <div className="grid w-full max-w-sm items-center gap-3">
                                <Label htmlFor="minExperience">
                                    Minimum Experience
                                </Label>
                                <Input
                                    id="minExperience"
                                    className="bg-white"
                                    type="text"
                                    placeholder="Min Exp"
                                    value={minExperience}
                                    onChange={(e) =>
                                        setMinExperience(e.target.value)
                                    }
                                />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-3">
                                <Label htmlFor="maxExperience">
                                    Maximum Experience
                                </Label>
                                <Input
                                    id="maxExperience"
                                    className="bg-white"
                                    type="text"
                                    placeholder="Max Exp"
                                    value={maxExperience}
                                    onChange={(e) =>
                                        setMaxExperience(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-2 p-4 flex flex-col gap-4 h-full overflow-hidden">
                        <h4 className="shrink-0">Conditions</h4>

                        <div className="flex flex-col gap-4 h-full overflow-hidden">
                            <div className="shrink-0">
                                <AddConditionDialog
                                    conditions={conditions}
                                    onConditionsChange={setConditions}
                                    actionType={actionType}
                                />
                            </div>

                            <div className="flex-1 overflow-y-auto flex flex-col gap-4">
                                {conditions.length === 0 ? (
                                    <p className="text-muted-foreground text-center">
                                        No conditions added yet.
                                    </p>
                                ) : (
                                    conditions.map((condition) => (
                                        <AdvancedConditionCard
                                            key={condition.id}
                                            condition={condition}
                                            onUpdateCondition={
                                                handleUpdateCondition
                                            }
                                            onRemoveCondition={(
                                                conditionId
                                            ) => {
                                                const updatedConditions =
                                                    conditions.filter(
                                                        (condition) =>
                                                            condition.id !==
                                                            conditionId
                                                    );
                                                setConditions(
                                                    updatedConditions
                                                );
                                            }}
                                        />
                                    ))
                                )}
                            </div>

                            <div className="shrink-0">
                                <DialogFooter>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        className="w-full"
                                        onClick={handleSave}
                                    >
                                        {isEditMode
                                            ? "Save Changes"
                                            : "Add Action"}
                                    </Button>
                                </DialogFooter>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ActionDialog;
