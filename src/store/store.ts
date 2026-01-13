import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Project {
    id: string;
    name: string;
}

interface AppState {
    projects: Project[];
    activeProjectId: string | undefined;
    getProjectById: (id: string) => Project | undefined;
    getActiveProject: () => Project | undefined;
    addProject: (project: Project) => void;
    removeProject: (id: string) => void;
}

export const useStore = create<AppState>()(
    persist(
        (set, get) => ({
            projects: [],
            activeProjectId: undefined,

            getProjectById: (id: string) => {
                return get().projects.find((project) => project.id === id);
            },

            getActiveProject: () => {
                const activeId = get().activeProjectId;
                return activeId ? get().getProjectById(activeId) : undefined;
            },

            addProject: (project: Project) => {
                project.id = crypto.randomUUID();
                set((state) => ({ projects: [...state.projects, project] }));
            },

            removeProject: (id: string) =>
                set((state) => ({
                    projects: state.projects.filter(
                        (project) => project.id !== id
                    ),
                })),
        }),
        {
            name: "storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
