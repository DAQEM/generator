import { useStore } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const formSchema = z.object({
    name: z
        .string()
        .min(1, "Project name is required")
        .max(50, "Name is too long"),
});

const AddProjectDialog = () => {
    const { addProject } = useStore();
    const [open, setOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        addProject(values.name);
        toast.success("Project created successfully");
        setOpen(false);
        form.reset();
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="justify-start">Create Project</Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm" aria-describedby={undefined}>
                <DialogTitle asChild>
                    <h3 className="text-2xl! font-bold!">New Project</h3>
                </DialogTitle>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="My Awesome Project"
                                            {...field}
                                            value={
                                                (field.value as string) ?? ""
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-4 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="w-full">
                                Create Project
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default AddProjectDialog;
