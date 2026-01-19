import { actionTypes, type ActionTypesKeys } from "@/lib/data";
import { useStore } from "@/store/store";
import type { JobCondition } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import AddConditionDialog from "../conditions/add-condition-dialog";
import AdvancedConditionCard from "../conditions/advanced-condition-card";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
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

// Reusable schema for validating strings as positive numbers
const numericStringSchema = z
    .string()
    .trim()
    .min(1, "Experience is required")
    .refine(
        (val) => !isNaN(Number(val)) && val !== "",
        "Must be a valid number"
    )
    .refine((val) => Number(val) >= 0, "Experience cannot be negative");

const formSchema = z
    .object({
        type: z.string().min(1, "Action type is required"),
        min_experience: numericStringSchema,
        max_experience: numericStringSchema,
    })
    .refine(
        (data) => Number(data.max_experience) >= Number(data.min_experience),
        {
            message: "Max experience must be >= min experience",
            path: ["max_experience"],
        }
    );

type FormValues = z.infer<typeof formSchema>;

const ActionDialog = ({
    isOpen,
    onClose,
    actionToEdit,
    projectId,
    jobId,
}: Props) => {
    const { addAction, updateAction } = useStore();
    const [conditions, setConditions] = useState<JobCondition[]>([]);
    const isEditMode = !!actionToEdit;

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: Object.keys(actionTypes)[0],
            min_experience: "",
            max_experience: "",
        },
    });

    const watchedActionType = form.watch("type") as ActionTypesKeys;

    useEffect(() => {
        if (isOpen) {
            if (actionToEdit) {
                form.reset({
                    type: actionToEdit.type,
                    min_experience: String(actionToEdit.min_experience),
                    max_experience: String(actionToEdit.max_experience),
                });
                setConditions(actionToEdit.conditions || []);
            } else {
                form.reset({
                    type: Object.keys(actionTypes)[0],
                    min_experience: "",
                    max_experience: "",
                });
                setConditions([]);
            }
        }
    }, [isOpen, actionToEdit, form]);

    function handleClose() {
        onClose();
    }

    function onSubmit(values: FormValues) {
        // Manually transform to numbers here
        const payload = {
            type: values.type as ActionTypesKeys,
            min_experience: Number(values.min_experience),
            max_experience: Number(values.max_experience),
            conditions: conditions,
            data: actionToEdit ? actionToEdit.data : {},
        };

        if (isEditMode && actionToEdit) {
            updateAction(projectId, jobId, actionToEdit.id, payload);
            toast.success("Action updated successfully");
        } else {
            addAction(projectId, jobId, payload);
            toast.success("Action added successfully");
        }

        handleClose();
    }

    const handleUpdateCondition = (
        conditionId: string,
        updates: Partial<JobCondition>
    ) => {
        setConditions((prev) =>
            prev.map((c) => (c.id === conditionId ? { ...c, ...updates } : c))
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent
                className="max-w-6xl p-0 max-h-172 h-full flex flex-col"
                aria-describedby={undefined}
            >
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid grid-cols-3 h-full overflow-hidden w-full"
                    >
                        <div className="col-span-1 bg-neutral-100 p-4 flex flex-col gap-4 overflow-y-auto border-r">
                            <DialogTitle asChild>
                                <h3 className="text-2xl! font-bold!">
                                    {isEditMode ? "Edit Action" : "New Action"}
                                </h3>
                            </DialogTitle>

                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Action Type</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full bg-white">
                                                    <SelectValue placeholder="Select an action type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent position="item-aligned">
                                                {Object.entries(
                                                    Object.groupBy(
                                                        Object.entries(
                                                            actionTypes
                                                        ),
                                                        ([, value]) =>
                                                            value.category
                                                    )
                                                )
                                                    .sort(([a], [b]) =>
                                                        a.localeCompare(b)
                                                    )
                                                    .map(
                                                        ([
                                                            category,
                                                            actions,
                                                        ]) => (
                                                            <SelectGroup
                                                                key={category}
                                                            >
                                                                <SelectLabel>
                                                                    {_.startCase(
                                                                        category
                                                                    )}
                                                                </SelectLabel>
                                                                {actions?.map(
                                                                    ([
                                                                        key,
                                                                        value,
                                                                    ]) => (
                                                                        <SelectItem
                                                                            key={
                                                                                key
                                                                            }
                                                                            value={
                                                                                key
                                                                            }
                                                                        >
                                                                            {
                                                                                value.title
                                                                            }
                                                                        </SelectItem>
                                                                    )
                                                                )}
                                                            </SelectGroup>
                                                        )
                                                    )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex gap-4">
                                <FormField
                                    control={form.control}
                                    name="min_experience"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Min XP</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="bg-white"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="max_experience"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Max XP</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="bg-white"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="col-span-2 p-4 flex flex-col gap-4 h-full overflow-hidden">
                            <h4 className="shrink-0 font-bold">Conditions</h4>

                            <div className="flex flex-col gap-4 h-full overflow-hidden">
                                <div className="shrink-0">
                                    <AddConditionDialog
                                        conditions={conditions}
                                        onConditionsChange={setConditions}
                                        actionType={watchedActionType}
                                    />
                                </div>

                                <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-2">
                                    {conditions.length === 0 ? (
                                        <p className="text-muted-foreground text-center py-8">
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

                                <div className="shrink-0 pt-2 border-t">
                                    <DialogFooter>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full"
                                            onClick={handleClose}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="w-full"
                                        >
                                            {isEditMode
                                                ? "Save Changes"
                                                : "Add Action"}
                                        </Button>
                                    </DialogFooter>
                                </div>
                            </div>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
export default ActionDialog;
