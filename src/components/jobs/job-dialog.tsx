import { useStore } from "@/store/store";
import type { Job } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { ColorPicker } from "../ui/color-picker";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { ItemPicker } from "../ui/item-picker";
import { Textarea } from "../ui/textarea";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    jobToEdit?: Job | null;
}

// Schema validates STRINGS only. No transformation here to avoid type conflicts.
const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    color: z.string().min(1, "Color is required"),
    icon: z.string().optional(),
    price: z
        .string()
        .trim()
        .min(1, "Price is required")
        .refine(
            (val) => !isNaN(Number(val)) && val !== "",
            "Must be a valid number"
        )
        .refine((val) => Number(val) >= 0, "Price must be positive"),
});

type FormValues = z.infer<typeof formSchema>;

const JobDialog = ({ isOpen, onClose, jobToEdit }: Props) => {
    const { currentProjectId, addJob, updateJob } = useStore();
    const isEditMode = !!jobToEdit;

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            color: "#F2F4F8",
            icon: "",
            price: "",
        },
    });

    useEffect(() => {
        if (isOpen) {
            form.reset({
                name: jobToEdit?.name || "",
                description: jobToEdit?.description || "",
                color: jobToEdit?.color || "#F2F4F8",
                icon: jobToEdit?.icon || "",
                price: jobToEdit ? String(jobToEdit.price) : "",
            });
        }
    }, [isOpen, jobToEdit, form]);

    const handleClose = () => {
        form.reset();
        onClose();
    };

    function onSubmit(values: FormValues) {
        // Manually transform to number here
        const payload = {
            name: values.name,
            description: values.description || "",
            color: values.color,
            icon: values.icon || "",
            price: Number(values.price),
        };

        if (isEditMode && jobToEdit) {
            updateJob(currentProjectId!, jobToEdit.id, payload);
        } else {
            addJob(currentProjectId!, payload);
        }

        handleClose();
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-3xl" aria-describedby={undefined}>
                <DialogTitle asChild>
                    <h3 className="text-2xl! font-bold!">
                        {isEditMode ? "Edit Job" : "New Job"}
                    </h3>
                </DialogTitle>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Job Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Miner"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col h-full">
                                            <FormLabel>
                                                Job Description
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Mine blocks to earn money."
                                                    className="h-full min-h-[100px]"
                                                    {...field}
                                                    value={field.value ?? ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex flex-col gap-4">
                                <FormField
                                    control={form.control}
                                    name="color"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Color</FormLabel>
                                            <FormControl>
                                                <ColorPicker
                                                    className="h-9 border-0 border-b border-border w-full"
                                                    {...field}
                                                    value={
                                                        field.value ?? "#F2F4F8"
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="icon"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Icon Item</FormLabel>
                                            <FormControl>
                                                <ItemPicker
                                                    {...field}
                                                    value={field.value ?? ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="1000"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="w-full">
                                {isEditMode ? "Save Changes" : "Add Job"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default JobDialog;
