import type { Project } from "@/types";
import { saveAs } from "file-saver";
import JSZip from "jszip";

const sanitizeId = (str: string) =>
    str.toLowerCase().replace(/[^a-z0-9_]/g, "_");

const flattenData = (obj: any) => {
    const { data, ...rest } = obj;
    return { ...rest, ...data };
};

export const exportProject = async (project: Project) => {
    const zip = new JSZip();
    const namespace = sanitizeId(project.name);

    const packMcmeta = {
        pack: {
            pack_format: 48,
            description: `Jobs+ Generator: ${project.name}`,
        },
    };
    zip.file("pack.mcmeta", JSON.stringify(packMcmeta, null, 2));

    const lang: Record<string, string> = {};

    project.jobs.forEach((job) => {
        const jobId = sanitizeId(job.name);
        const fullJobId = `${namespace}:${jobId}`;

        lang[`jobsplus.job.${namespace}.${jobId}.name`] = job.name;
        lang[`jobsplus.job.${namespace}.${jobId}.description`] =
            job.description;

        const jobJson = {
            name: job.name,
            price: job.price,
            color: job.color,
            icon: {
                id: job.icon,
            },
        };
        zip.file(
            `data/${namespace}/jobsplus/jobs/${jobId}.json`,
            JSON.stringify(jobJson, null, 2)
        );

        job.actions.forEach((action, index) => {
            const actionId = `${jobId}_action_${index}`;
            const conditions = action.conditions
                .map((c) => flattenData(c))
                .map((c) => {
                    c.type = "arc:" + c.type;
                    return c;
                });

            const actionRewards = [
                {
                    type: "jobsplus:job_exp",
                    min: action.min_experience || 0,
                    max: action.max_experience || 0,
                },
            ];

            const actionJson = {
                holder: {
                    type: "jobsplus:job",
                    id: fullJobId,
                },
                type: "arc:" + action.type,
                conditions: conditions.length > 0 ? conditions : undefined,
                rewards: actionRewards.length > 0 ? actionRewards : undefined,
                ...action.data,
            };

            delete (actionJson as any).rewards_internal;

            zip.file(
                `data/${namespace}/arc/${jobId}/${actionId}.json`,
                JSON.stringify(actionJson, null, 2)
            );
        });
    });

    zip.file(
        `assets/${namespace}/lang/en_us.json`,
        JSON.stringify(lang, null, 2)
    );

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `${sanitizeId(project.name)}-datapack.zip`);
};
