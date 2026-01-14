import { useStore } from "@/store/store";
import type { Job } from "@/types";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ColorPicker } from "../ui/color-picker";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { ItemPicker } from "../ui/item-picker";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    jobToEdit?: Job | null;
}

const JobDialog = ({ isOpen, onClose, jobToEdit }: Props) => {
    const { currentProjectId, addJob, updateJob } = useStore();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("#F2F4F8");
    const [icon, setIcon] = useState("");
    const [price, setPrice] = useState("");

    const isEditMode = !!jobToEdit;

    useEffect(() => {
        if (isOpen) {
            if (jobToEdit) {
                setName(jobToEdit.name);
                setDescription(jobToEdit.description || "");
                setColor(jobToEdit.color || "#F2F4F8");
                setIcon(jobToEdit.icon || "");
                setPrice(String(jobToEdit.price || ""));
            } else {
                setName("");
                setDescription("");
                setColor("#F2F4F8");
                setIcon("");
                setPrice("");
            }
        }
    }, [isOpen, jobToEdit]);

    function handleClose() {
        onClose();
    }

    const handleSave = () => {
        const payload = {
            name,
            description,
            color,
            icon,
            price: Number(price),
        };

        if (isEditMode && jobToEdit) {
            if (updateJob) {
                updateJob(currentProjectId!, jobToEdit.id, payload);
            } else {
                console.error("updateJob function missing from store");
            }
        } else {
            addJob(currentProjectId!, payload);
        }

        handleClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-3xl" aria-describedby={undefined}>
                <DialogTitle asChild>
                    <h3 className="text-2xl! font-bold!">
                        {isEditMode ? "Edit Job" : "New Job"}
                    </h3>
                </DialogTitle>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-4">
                        <div className="grid w-full items-center gap-3">
                            <Label htmlFor="name">Job Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Your Job Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col w-full gap-3 h-full">
                            <Label htmlFor="description">Job Description</Label>
                            <Textarea
                                id="description"
                                className="h-full"
                                placeholder="Your Job Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="grid w-full items-center gap-3">
                            <Label htmlFor="color">Color</Label>
                            <ColorPicker
                                className="h-9 border-0 border-b border-border"
                                value={color}
                                onChange={setColor}
                            />
                        </div>
                        <div className="grid w-full items-center gap-3">
                            <Label htmlFor="icon">Icon Item</Label>
                            <ItemPicker 
                                value={icon} 
                                onChange={setIcon} 
                            />
                        </div>
                        <div className="grid w-full items-center gap-3">
                            <Label htmlFor="price">Price</Label>
                            <Input
                                id="price"
                                type="text"
                                min={0}
                                placeholder="Job Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button className="w-full" onClick={handleSave}>
                        {isEditMode ? "Save Changes" : "Add Job"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default JobDialog;