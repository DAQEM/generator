const REGISTRIES_URL =
    "https://raw.githubusercontent.com/misode/mcmeta/summary/registries/data.min.json";
const LANG_URL =
    "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/lang/en_us.json";

export async function fetchMinecraftItems(): Promise<string[]> {
    try {
        const response = await fetch(REGISTRIES_URL);
        if (!response.ok) throw new Error("Failed to fetch registries");
        const data = await response.json();
        const items = data["minecraft:item"] || data["item"] || [];
        return items
            .map((id: string) => (id.includes(":") ? id : `minecraft:${id}`))
            .sort();
    } catch (error) {
        console.error("Failed to fetch Minecraft items:", error);
        return [];
    }
}

export async function fetchMinecraftBlocks(): Promise<string[]> {
    try {
        const response = await fetch(REGISTRIES_URL);
        if (!response.ok) throw new Error("Failed to fetch registries");
        const data = await response.json();
        const blocks = data["minecraft:block"] || data["block"] || [];
        return blocks
            .map((id: string) => (id.includes(":") ? id : `minecraft:${id}`))
            .sort();
    } catch (error) {
        console.error("Failed to fetch Minecraft blocks:", error);
        return [];
    }
}

export async function fetchMinecraftLanguage(): Promise<
    Record<string, string>
> {
    try {
        const response = await fetch(LANG_URL);
        if (!response.ok) throw new Error("Failed to fetch language");
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch Minecraft language:", error);
        return {};
    }
}

export function getItemName(
    id: string,
    lang: Record<string, string> | undefined
): string {
    if (!id) return "";

    // Default formatting if language isn't loaded yet or key missing
    const formatId = (str: string) => {
        const path = str.split(":")[1] || str;
        return path
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    if (!lang) return formatId(id);

    try {
        const [namespace, path] = id.split(":");
        const validPath = path || namespace;
        const validNamespace = path ? namespace : "minecraft";

        const itemKey = `item.${validNamespace}.${validPath}`;
        const blockKey = `block.${validNamespace}.${validPath}`;

        if (lang[itemKey]) return lang[itemKey];
        if (lang[blockKey]) return lang[blockKey];

        return formatId(id);
    } catch (e) {
        return formatId(id);
    }
}
