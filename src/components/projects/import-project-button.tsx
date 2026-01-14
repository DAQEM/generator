import { useStore } from "@/store/store";
import type { Project } from "@/types";
import JSZip from "jszip";
import { useRef, useState } from "react";
import { Button } from "../ui/button";

const ImportProjectButton = () => {
    const { importProject } = useStore();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsLoading(true);
        try {
            const zip = new JSZip();
            const loadedZip = await zip.loadAsync(file);

            const stateFile = loadedZip.file("project_state.json");

            if (!stateFile) {
                alert(
                    "Error: This ZIP file does not contain a valid project_state.json. " +
                        "Only projects exported with the new version of this tool can be imported."
                );
                return;
            }

            const content = await stateFile.async("string");
            const projectData = JSON.parse(content) as Project;

            if (!projectData.name || !Array.isArray(projectData.jobs)) {
                throw new Error("Invalid project structure");
            }

            importProject(projectData);
        } catch (error) {
            console.error("Failed to import project:", error);
            alert(
                "Failed to import project. Please check if the file is a valid archive."
            );
        } finally {
            setIsLoading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".zip"
                onChange={handleFileChange}
            />
            <Button
                className="justify-start"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
            >
                {isLoading ? "Importing..." : "Import Project"}
            </Button>
        </>
    );
};

export default ImportProjectButton;
