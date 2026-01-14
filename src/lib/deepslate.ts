import { ItemStack } from "deepslate/core";
import { NbtString, type NbtTag } from "deepslate/nbt";
import {
    BlockDefinition,
    BlockModel,
    Identifier,
    ItemModel,
    ItemRenderer,
    TextureAtlas,
    upperPowerOfTwo,
    type ItemRendererResources,
} from "deepslate/render";

const MCMETA_BASE = "https://raw.githubusercontent.com/misode/mcmeta/summary";
const ATLAS_BASE = "https://raw.githubusercontent.com/misode/mcmeta/atlas";

class ResourceManager implements ItemRendererResources {
    private blockDefinitions: Record<string, BlockDefinition> = {};
    private blockModels: Record<string, BlockModel> = {};
    private itemModels: Record<string, ItemModel> = {};
    private textureAtlas: TextureAtlas | null = null;

    private missingModel = new BlockModel(undefined, undefined, undefined);

    async load() {
        const [blockDefs, models, itemDefs, atlasData, atlasImg] =
            await Promise.all([
                fetch(
                    `${MCMETA_BASE}/assets/block_definition/data.min.json`
                ).then((r) => r.json()),
                fetch(`${MCMETA_BASE}/assets/model/data.min.json`).then((r) =>
                    r.json()
                ),
                fetch(
                    `${MCMETA_BASE}/assets/item_definition/data.min.json`
                ).then((r) => r.json()),
                fetch(`${ATLAS_BASE}/all/data.min.json`).then((r) => r.json()),
                new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = new Image();
                    img.crossOrigin = "Anonymous";
                    img.src = `${ATLAS_BASE}/all/atlas.png`;
                    img.onload = () => resolve(img);
                    img.onerror = reject;
                }),
            ]);

        // Normalize keys to full identifiers (e.g. "stone" -> "minecraft:stone")
        for (const [id, data] of Object.entries(blockDefs)) {
            this.blockDefinitions[Identifier.create(id).toString()] =
                BlockDefinition.fromJson(data);
        }

        for (const [id, data] of Object.entries(models)) {
            this.blockModels[Identifier.create(id).toString()] =
                BlockModel.fromJson(data);
        }

        for (const [id, data] of Object.entries(itemDefs)) {
            this.itemModels[Identifier.create(id).toString()] =
                ItemModel.fromJson((data as any).model);
        }

        for (const model of Object.values(this.blockModels)) {
            // @ts-ignore
            model.flatten(this);
        }

        const canvas = document.createElement("canvas");
        const w = upperPowerOfTwo(atlasImg.width);
        const h = upperPowerOfTwo(atlasImg.height);
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(atlasImg, 0, 0);
        const imgData = ctx.getImageData(0, 0, w, h);

        const idMap: Record<string, [number, number, number, number]> = {};
        for (const [key, value] of Object.entries(atlasData)) {
            const [u, v, du, dv] = value as [number, number, number, number];
            // Ensure atlas keys are also normalized
            idMap[Identifier.create(key).toString()] = [
                u / w,
                v / h,
                (u + du) / w,
                (v + dv) / h,
            ];
        }

        this.textureAtlas = new TextureAtlas(imgData, idMap);
    }

    getBlockDefinition(id: Identifier): BlockDefinition | null {
        return this.blockDefinitions[id.toString()] || null;
    }

    getBlockModel(id: Identifier): BlockModel | null {
        return this.blockModels[id.toString()] || this.missingModel;
    }

    getTextureAtlas(): ImageData {
        if (this.textureAtlas) {
            return this.textureAtlas.getTextureAtlas();
        }
        return new ImageData(1, 1);
    }

    getTextureUV(id: Identifier): [number, number, number, number] {
        if (this.textureAtlas) {
            return this.textureAtlas.getTextureUV(id);
        }
        return [0, 0, 0, 0];
    }

    getBlockFlags(id: Identifier): { opaque: boolean } | null {
        return { opaque: false };
    }

    getBlockProperties(id: Identifier): Record<string, string[]> | null {
        return null;
    }

    getDefaultBlockProperties(id: Identifier): Record<string, string> | null {
        return null;
    }

    getItemModel(id: Identifier): ItemModel | null {
        return this.itemModels[id.toString()] || null;
    }

    getItemComponents(id: Identifier): Map<string, NbtTag> {
        const map = new Map<string, NbtTag>();
        map.set("minecraft:item_model", new NbtString(id.toString()));
        return map;
    }
}

let resources: ResourceManager | null = null;
let loadingPromise: Promise<ResourceManager> | null = null;

export async function getDeepslateResources(): Promise<ResourceManager> {
    if (resources) return resources;
    if (loadingPromise) return loadingPromise;

    loadingPromise = (async () => {
        const res = new ResourceManager();
        await res.load();
        resources = res;
        return res;
    })();
    return loadingPromise;
}

class RendererService {
    private canvas: HTMLCanvasElement | null = null;
    private gl: WebGL2RenderingContext | null = null;
    private queue: { id: string; resolve: (url: string) => void }[] = [];
    private processing = false;

    private getContext() {
        if (!this.canvas) {
            this.canvas = document.createElement("canvas");
            this.canvas.width = 64;
            this.canvas.height = 64;
            this.gl = this.canvas.getContext("webgl2", {
                preserveDrawingBuffer: true,
                alpha: true,
                antialias: true,
            });
        }
        return { canvas: this.canvas, gl: this.gl };
    }

    async render(id: string): Promise<string> {
        return new Promise((resolve) => {
            this.queue.push({ id, resolve });
            try {
                this.processQueue();
            } catch (e) {
                console.error("Failed to process render queue", e);
            }
        });
    }

    private async processQueue() {
        if (this.processing) return;
        this.processing = true;

        try {
            const resources = await getDeepslateResources();
            const { canvas, gl } = this.getContext();

            if (!gl || !canvas) {
                this.processing = false;
                return;
            }

            while (this.queue.length > 0) {
                const task = this.queue.shift();
                if (!task) break;

                try {
                    gl.clearColor(0, 0, 0, 0);
                    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                    gl.viewport(0, 0, canvas.width, canvas.height);

                    const itemId = Identifier.parse(task.id);

                    if (resources.getItemModel(itemId)) {
                        const item = new ItemStack(itemId, 1);
                        const renderer = new ItemRenderer(gl, item, resources, {
                            display_context: "gui",
                        });
                        renderer.drawItem();
                        task.resolve(canvas.toDataURL());
                    } else {
                        task.resolve("");
                    }
                } catch (e) {
                    console.warn("Render error", task.id, e);
                    task.resolve("");
                }

                await new Promise((r) => setTimeout(r, 0));
            }
        } finally {
            this.processing = false;
        }
    }
}

export const rendererService = new RendererService();
