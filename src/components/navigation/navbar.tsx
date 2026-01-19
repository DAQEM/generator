import logo from "@/assets/logo.svg";
import { exportProject } from "@/lib/exporter";
import { useStore } from "@/store/store";
import { useState } from "react";
import { Button } from "../ui/button";

const Navbar = () => {
    const { selectProject, selectJob, getCurrentProject } = useStore();
    const project = getCurrentProject();
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async () => {
        if (!project) return;
        setIsExporting(true);
        try {
            await exportProject(project);
        } catch (error) {
            console.error("Failed to export project", error);
            alert("Failed to export project. Check console for details.");
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <header className="h-20 w-full px-4 py-2 bg-white">
            <div className="px-4 flex items-center justify-between h-full w-full">
                <div className="flex-1 flex justify-start">
                    <Button
                        variant="ghost"
                        className="w-32.5 h-14 p-0 hover:bg-transparent"
                        onClick={() => {
                            selectProject(null);
                            selectJob(null);
                        }}
                    >
                        <img
                            src={logo}
                            alt="Logo"
                            height="56px"
                            width="130px"
                        />
                    </Button>
                </div>

                <div className="flex-1 flex gap-4 justify-end">
                    {project && (
                        <Button
                            variant="default"
                            onClick={handleExport}
                            disabled={isExporting}
                        >
                            {isExporting ? "Exporting..." : "Export Datapack"}
                        </Button>
                    )}
                    <Button asChild>
                        <a
                            href="https://daqem.com/discord"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Join our Discord"
                        >
                            Join Our Discord
                        </a>
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
