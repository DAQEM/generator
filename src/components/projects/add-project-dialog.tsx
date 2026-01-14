import { useStore } from "@/store/store";
import { useState } from "react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const AddProjectDialog = () => {
    const { addProject } = useStore();
    const [name, setName] = useState("");

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="justify-start">Create Project</Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm" aria-describedby={undefined}>
                <DialogTitle asChild>
                    <h3 className="text-2xl! font-bold!">New Project</h3>
                </DialogTitle>
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="name">Project Name</Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Your Project Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="w-full">
                        Cancel
                    </Button>
                    <Button className="w-full" onClick={() => addProject(name)}>
                        Create Project
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddProjectDialog;
