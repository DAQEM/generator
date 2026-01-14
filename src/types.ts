import type { ActionTypesKeys, ConditionTypesKeys } from "./lib/data";

export interface Project {
    id: string;
    name: string;
    created_at: number;
    updated_at: number;
    jobs: Job[];
}

export interface Job {
    id: string;
    name: string;
    description: string;
    color: string;
    icon: string;
    price: number;
    actions: JobAction[];
}

export interface JobAction {
    id: string;
    type: ActionTypesKeys;
    conditions: JobCondition[];
    min_experience: number;
    max_experience: number;
    data: Record<string, any>;
}

export interface JobCondition {
    id: string;
    type: ConditionTypesKeys;
    data: Record<string, any>;
}
