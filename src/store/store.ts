import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Job, JobAction, JobCondition, Project } from "../types";

interface AppState {
    projects: Project[];
    currentProjectId: string | null;
    currentJobId: string | null;

    // Actions
    addProject: (name: string) => void;
    importProject: (project: Project) => void;
    selectProject: (id: string | null) => void;
    selectJob: (id: string | null) => void;
    deleteProject: (id: string) => void;
    updateProject: (id: string, data: Partial<Project>) => void;

    addJob: (projectId: string, job: Omit<Job, "id" | "actions">) => void;
    updateJob: (projectId: string, jobId: string, data: Partial<Job>) => void;
    deleteJob: (projectId: string, jobId: string) => void;

    addAction: (
        projectId: string,
        jobId: string,
        action: Omit<JobAction, "id">
    ) => void;
    updateAction: (
        projectId: string,
        jobId: string,
        actionId: string,
        data: Partial<JobAction>
    ) => void;
    deleteAction: (projectId: string, jobId: string, actionId: string) => void;

    addCondition: (
        projectId: string,
        jobId: string,
        actionId: string,
        condition: Omit<JobCondition, "id">
    ) => void;
    updateCondition: (
        projectId: string,
        jobId: string,
        actionId: string,
        conditionId: string,
        data: Partial<JobCondition>
    ) => void;
    deleteCondition: (
        projectId: string,
        jobId: string,
        actionId: string,
        conditionId: string
    ) => void;

    getCurrentProject: () => Project | undefined;
    getCurrentJob: () => Job | undefined;
}

export const useStore = create<AppState>()(
    persist(
        (set, get) => ({
            projects: [],
            currentProjectId: null,
            currentJobId: null,

            addProject: (name) => {
                const newProject: Project = {
                    id: uuidv4(),
                    name,
                    created_at: Date.now(),
                    updated_at: Date.now(),
                    jobs: [],
                };
                set((state) => ({
                    projects: [...state.projects, newProject],
                    currentProjectId: newProject.id,
                }));
            },

            importProject: (project) => {
                // We regenerate the ID to treat it as a copy/import and avoid collisions
                const importedProject: Project = {
                    ...project,
                    id: uuidv4(),
                    name: `${project.name} (Imported)`,
                    updated_at: Date.now(),
                };

                set((state) => ({
                    projects: [...state.projects, importedProject],
                    currentProjectId: importedProject.id,
                    currentJobId: null,
                }));
            },

            selectProject: (id) => {
                set({ currentProjectId: id, currentJobId: null });
            },

            selectJob: (id) => {
                set({ currentJobId: id });
            },

            deleteProject: (id) => {
                set((state) => ({
                    projects: state.projects.filter((p) => p.id !== id),
                    currentProjectId:
                        state.currentProjectId === id
                            ? null
                            : state.currentProjectId,
                }));
            },

            updateProject: (id, data) => {
                set((state) => ({
                    projects: state.projects.map((p) =>
                        p.id === id
                            ? { ...p, ...data, updated_at: Date.now() }
                            : p
                    ),
                }));
            },

            addJob: (projectId, jobData) => {
                set((state) => ({
                    projects: state.projects.map((p) => {
                        if (p.id !== projectId) return p;
                        return {
                            ...p,
                            updated_at: Date.now(),
                            jobs: [
                                ...p.jobs,
                                {
                                    ...jobData,
                                    id: uuidv4(),
                                    actions: [],
                                },
                            ],
                        };
                    }),
                }));
            },

            updateJob: (projectId, jobId, data) => {
                set((state) => ({
                    projects: state.projects.map((p) => {
                        if (p.id !== projectId) return p;
                        return {
                            ...p,
                            updated_at: Date.now(),
                            jobs: p.jobs.map((j) =>
                                j.id === jobId ? { ...j, ...data } : j
                            ),
                        };
                    }),
                }));
            },

            deleteJob: (projectId, jobId) => {
                set((state) => ({
                    projects: state.projects.map((p) => {
                        if (p.id !== projectId) return p;
                        return {
                            ...p,
                            updated_at: Date.now(),
                            jobs: p.jobs.filter((j) => j.id !== jobId),
                        };
                    }),
                    currentJobId: null,
                }));
            },

            addAction: (projectId, jobId, actionData) => {
                set((state) => ({
                    projects: state.projects.map((p) => {
                        if (p.id !== projectId) return p;
                        return {
                            ...p,
                            updated_at: Date.now(),
                            jobs: p.jobs.map((j) => {
                                if (j.id !== jobId) return j;
                                return {
                                    ...j,
                                    actions: [
                                        ...j.actions,
                                        { ...actionData, id: uuidv4() },
                                    ],
                                };
                            }),
                        };
                    }),
                }));
            },

            updateAction: (projectId, jobId, actionId, data) => {
                set((state) => ({
                    projects: state.projects.map((p) => {
                        if (p.id !== projectId) return p;
                        return {
                            ...p,
                            updated_at: Date.now(),
                            jobs: p.jobs.map((j) => {
                                if (j.id !== jobId) return j;
                                return {
                                    ...j,
                                    actions: j.actions.map((a) =>
                                        a.id === actionId
                                            ? { ...a, ...data }
                                            : a
                                    ),
                                };
                            }),
                        };
                    }),
                }));
            },

            deleteAction: (projectId, jobId, actionId) => {
                set((state) => ({
                    projects: state.projects.map((p) => {
                        if (p.id !== projectId) return p;
                        return {
                            ...p,
                            updated_at: Date.now(),
                            jobs: p.jobs.map((j) => {
                                if (j.id !== jobId) return j;
                                return {
                                    ...j,
                                    actions: j.actions.filter(
                                        (a) => a.id !== actionId
                                    ),
                                };
                            }),
                        };
                    }),
                }));
            },

            addCondition: (projectId, jobId, actionId, conditionData) => {
                set((state) => ({
                    projects: state.projects.map((p) => {
                        if (p.id !== projectId) return p;
                        return {
                            ...p,
                            updated_at: Date.now(),
                            jobs: p.jobs.map((j) => {
                                if (j.id !== jobId) return j;
                                return {
                                    ...j,
                                    actions: j.actions.map((a) => {
                                        if (a.id !== actionId) return a;
                                        return {
                                            ...a,
                                            conditions: [
                                                ...a.conditions,
                                                {
                                                    ...conditionData,
                                                    id: uuidv4(),
                                                },
                                            ],
                                        };
                                    }),
                                };
                            }),
                        };
                    }),
                }));
            },

            updateCondition: (
                projectId,
                jobId,
                actionId,
                conditionId,
                data
            ) => {
                set((state) => ({
                    projects: state.projects.map((p) => {
                        if (p.id !== projectId) return p;
                        return {
                            ...p,
                            updated_at: Date.now(),
                            jobs: p.jobs.map((j) => {
                                if (j.id !== jobId) return j;
                                return {
                                    ...j,
                                    actions: j.actions.map((a) => {
                                        if (a.id !== actionId) return a;
                                        return {
                                            ...a,
                                            conditions: a.conditions.map((c) =>
                                                c.id === conditionId
                                                    ? { ...c, ...data }
                                                    : c
                                            ),
                                        };
                                    }),
                                };
                            }),
                        };
                    }),
                }));
            },

            deleteCondition: (projectId, jobId, actionId, conditionId) => {
                set((state) => ({
                    projects: state.projects.map((p) => {
                        if (p.id !== projectId) return p;
                        return {
                            ...p,
                            updated_at: Date.now(),
                            jobs: p.jobs.map((j) => {
                                if (j.id !== jobId) return j;
                                return {
                                    ...j,
                                    actions: j.actions.map((a) => {
                                        if (a.id !== actionId) return a;
                                        return {
                                            ...a,
                                            conditions: a.conditions.filter(
                                                (c) => c.id !== conditionId
                                            ),
                                        };
                                    }),
                                };
                            }),
                        };
                    }),
                }));
            },

            getCurrentProject: () => {
                return get().projects.find(
                    (p) => p.id === get().currentProjectId
                );
            },

            getCurrentJob: () => {
                const project = get().getCurrentProject();
                return project?.jobs.find((j) => j.id === get().currentJobId);
            },
        }),
        {
            name: "jobs-generator-storage",
        }
    )
);
