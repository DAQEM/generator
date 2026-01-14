export type ActionDataTypes =
    | "arc:block_state"
    | "arc:block_position"
    | "arc:exp_drop"
    | "arc:exp_level"
    | "arc:world"
    | "arc:damage_source"
    | "arc:entity"
    | "arc:damage_amount"
    | "arc:distance_in_cm"
    | "arc:item_stack"
    | "arc:item"
    | "arc:advancement"
    | "arc:mob_effect_instance"
    | "arc:recipe";

export const actionDataTypes: {
    [key in ActionDataTypes]: { description: string };
} = {
    "arc:block_state": {
        description:
            "Represents the state of a block, including its type and properties.",
    },
    "arc:block_position": {
        description:
            "Specifies the coordinates (x, y, z) of a block in the world.",
    },
    "arc:exp_drop": {
        description:
            "Defines the amount of experience points dropped by an action or entity.",
    },
    "arc:exp_level": {
        description:
            "Indicates the amount of experience levels used by an action.",
    },
    "arc:world": {
        description: "Refers to the world/dimension where the action occurs.",
    },
    "arc:damage_source": {
        description:
            "Identifies the source of damage, such as an entity, environment, or effect.",
    },
    "arc:entity": {
        description:
            "Represents an entity in the game, such as a player, mob, or item.",
    },
    "arc:damage_amount": {
        description:
            "Quantifies the amount of damage dealt or received in an action.",
    },
    "arc:distance_in_cm": {
        description:
            "Measures a distance in centimeters, often used for proximity-based actions.",
    },
    "arc:item_stack": {
        description:
            "Represents a stack of items, including item type and quantity.",
    },
    "arc:item": {
        description: "Refers to a single item type without stack information.",
    },
    "arc:advancement": {
        description: "Represents an in-game advancement that was earned.",
    },
    "arc:mob_effect_instance": {
        description:
            "Describes a specific instance of a mob effect, including type, duration, and amplifier.",
    },
    "arc:recipe": {
        description: "Defines a crafting or smelting recipe used in an action.",
    },
};

type SidebarItem = {
    title: string;
    emoji: string;
};

export type ActionType = {
    id: ActionTypesKeys;
    category:
        | "advancements"
        | "blocks"
        | "entities"
        | "items"
        | "movement"
        | "players";
    producesData: readonly ActionDataTypes[];
} & SidebarItem;

const actionTypesDefinition = {
    on_advancement: {
        id: "on_advancement",
        title: "On Advancement",
        emoji: "🏆",
        category: "advancements",
        producesData: ["arc:advancement"],
    },
    on_break_block: {
        id: "on_break_block",
        title: "On Break Block",
        emoji: "⛏️",
        category: "blocks",
        producesData: [
            "arc:block_state",
            "arc:block_position",
            "arc:exp_drop",
            "arc:world",
        ],
    },
    on_get_destroy_speed: {
        id: "on_get_destroy_speed",
        title: "On Get Destroy Speed",
        emoji: "⚡",
        category: "blocks",
        producesData: [
            "arc:item_stack",
            "arc:item",
            "arc:block_state",
            "arc:block_position",
        ],
    },
    on_harvest_crop: {
        id: "on_harvest_crop",
        title: "On Harvest Crop",
        emoji: "🌾",
        category: "blocks",
        producesData: ["arc:block_state", "arc:block_position", "arc:world"],
    },
    on_interact_block: {
        id: "on_interact_block",
        title: "On Interact Block",
        emoji: "🖱️",
        category: "blocks",
        producesData: ["arc:block_state", "arc:block_position", "arc:world"],
    },
    on_place_block: {
        id: "on_place_block",
        title: "On Place Block",
        emoji: "🧱",
        category: "blocks",
        producesData: ["arc:block_state", "arc:block_position", "arc:world"],
    },
    on_plant_crop: {
        id: "on_plant_crop",
        title: "On Plant Crop",
        emoji: "🌱",
        category: "blocks",
        producesData: ["arc:block_state", "arc:block_position", "arc:world"],
    },
    on_breed_animal: {
        id: "on_breed_animal",
        title: "On Breed Animal",
        emoji: "🐑",
        category: "entities",
        producesData: ["arc:entity"],
    },
    on_death: {
        id: "on_death",
        title: "On Death",
        emoji: "💀",
        category: "players",
        producesData: ["arc:damage_source"],
    },
    on_get_hurt: {
        id: "on_get_hurt",
        title: "On Get Hurt",
        emoji: "🤕",
        category: "players",
        producesData: ["arc:damage_source", "arc:damage_amount"],
    },
    on_hurt_entity: {
        id: "on_hurt_entity",
        title: "On Hurt Entity",
        emoji: "🗡️",
        category: "entities",
        producesData: ["arc:entity", "arc:damage_source", "arc:damage_amount"],
    },
    on_hurt_player: {
        id: "on_hurt_player",
        title: "On Hurt Player",
        emoji: "🩸",
        category: "players",
        producesData: ["arc:entity", "arc:damage_amount"],
    },
    on_interact_entity: {
        id: "on_interact_entity",
        title: "On Interact Entity",
        emoji: "🖱️",
        category: "entities",
        producesData: ["arc:item_stack", "arc:item", "arc:entity"],
    },
    on_kill_entity: {
        id: "on_kill_entity",
        title: "On Kill Entity",
        emoji: "💀",
        category: "entities",
        producesData: [
            "arc:entity",
            "arc:block_position",
            "arc:world",
            "arc:exp_drop",
        ],
    },
    on_tame_animal: {
        id: "on_tame_animal",
        title: "On Tame Animal",
        emoji: "🐾",
        category: "entities",
        producesData: ["arc:entity"],
    },
    on_craft_item: {
        id: "on_craft_item",
        title: "On Craft Item",
        emoji: "🛠️",
        category: "items",
        producesData: ["arc:item_stack", "arc:world", "arc:recipe"],
    },
    on_drop_item: {
        id: "on_drop_item",
        title: "On Drop Item",
        emoji: "🪣",
        category: "items",
        producesData: ["arc:item", "arc:item_stack"],
    },
    on_enchant_item: {
        id: "on_enchant_item",
        title: "On Enchant Item",
        emoji: "✨",
        category: "items",
        producesData: ["arc:item_stack", "arc:exp_level"],
    },
    on_fished_up_item: {
        id: "on_fished_up_item",
        title: "On Fished Up Item",
        emoji: "🎣",
        category: "items",
        producesData: ["arc:item_stack", "arc:item"],
    },
    on_grind_item: {
        id: "on_grind_item",
        title: "On Grind Item",
        emoji: "⚙️",
        category: "items",
        producesData: [],
    },
    on_hurt_item: {
        id: "on_hurt_item",
        title: "On Hurt Item",
        emoji: "🗡️",
        category: "items",
        producesData: ["arc:item_stack", "arc:item"],
    },
    on_smelt_item: {
        id: "on_smelt_item",
        title: "On Smelt Item",
        emoji: "🔥",
        category: "items",
        producesData: [
            "arc:item_stack",
            "arc:block_position",
            "arc:block_state",
            "arc:world",
            "arc:recipe",
        ],
    },
    on_throw_item: {
        id: "on_throw_item",
        title: "On Throw Item",
        emoji: "🏹",
        category: "items",
        producesData: ["arc:item_stack", "arc:entity"],
    },
    on_use_item: {
        id: "on_use_item",
        title: "On Use Item",
        emoji: "🖱️",
        category: "items",
        producesData: ["arc:item"],
    },
    on_crouch: {
        id: "on_crouch",
        title: "On Crouch",
        emoji: "🦶",
        category: "movement",
        producesData: ["arc:distance_in_cm"],
    },
    on_crouch_start: {
        id: "on_crouch_start",
        title: "On Start Crouching",
        emoji: "🦶",
        category: "movement",
        producesData: [],
    },
    on_crouch_stop: {
        id: "on_crouch_stop",
        title: "On Stop Crouching",
        emoji: "🦶",
        category: "movement",
        producesData: [],
    },
    on_elytra_fly: {
        id: "on_elytra_fly",
        title: "On Elytra Fly",
        emoji: "🪂",
        category: "movement",
        producesData: ["arc:distance_in_cm"],
    },
    on_elytra_fly_start: {
        id: "on_elytra_fly_start",
        title: "On Start Elytra Flying",
        emoji: "🪂",
        category: "movement",
        producesData: [],
    },
    on_elytra_fly_stop: {
        id: "on_elytra_fly_stop",
        title: "On Stop Elytra Flying",
        emoji: "🪂",
        category: "movement",
        producesData: [],
    },
    on_horse_ride: {
        id: "on_horse_ride",
        title: "On Horse Ride",
        emoji: "🐎",
        category: "movement",
        producesData: ["arc:distance_in_cm"],
    },
    on_horse_ride_start: {
        id: "on_horse_ride_start",
        title: "On Start Horse Riding",
        emoji: "🐎",
        category: "movement",
        producesData: [],
    },
    on_horse_ride_stop: {
        id: "on_horse_ride_stop",
        title: "On Stop Horse Riding",
        emoji: "🐎",
        category: "movement",
        producesData: [],
    },
    on_sprint: {
        id: "on_sprint",
        title: "On Sprint",
        emoji: "🏃‍♂️",
        category: "movement",
        producesData: ["arc:distance_in_cm"],
    },
    on_sprint_start: {
        id: "on_sprint_start",
        title: "On Start Sprinting",
        emoji: "🏃‍♂️",
        category: "movement",
        producesData: [],
    },
    on_sprint_stop: {
        id: "on_sprint_stop",
        title: "On Stop Sprinting",
        emoji: "🏃‍♂️",
        category: "movement",
        producesData: [],
    },
    on_swim: {
        id: "on_swim",
        title: "On Swim",
        emoji: "🏊‍♂️",
        category: "movement",
        producesData: ["arc:distance_in_cm"],
    },
    on_swim_start: {
        id: "on_swim_start",
        title: "On Start Swimming",
        emoji: "🏊‍♂️",
        category: "movement",
        producesData: [],
    },
    on_swim_stop: {
        id: "on_swim_stop",
        title: "On Stop Swimming",
        emoji: "🏊‍♂️",
        category: "movement",
        producesData: [],
    },
    on_walk: {
        id: "on_walk",
        title: "On Walk",
        emoji: "🚶‍♂️",
        category: "movement",
        producesData: ["arc:distance_in_cm"],
    },
    on_walk_start: {
        id: "on_walk_start",
        title: "On Start Walking",
        emoji: "🚶‍♂️",
        category: "movement",
        producesData: [],
    },
    on_walk_stop: {
        id: "on_walk_stop",
        title: "On Stop Walking",
        emoji: "🚶‍♂️",
        category: "movement",
        producesData: [],
    },
    on_brew_potion: {
        id: "on_brew_potion",
        title: "On Brew Potion",
        emoji: "🧪",
        category: "players",
        producesData: [
            "arc:item_stack",
            "arc:block_position",
            "arc:block_state",
            "arc:world",
        ],
    },
    on_drink: {
        id: "on_drink",
        title: "On Drink",
        emoji: "🥤",
        category: "players",
        producesData: ["arc:item_stack"],
    },
    on_eat: {
        id: "on_eat",
        title: "On Eat",
        emoji: "🍽️",
        category: "players",
        producesData: ["arc:item_stack"],
    },
    on_effect_added: {
        id: "on_effect_added",
        title: "On Effect Added",
        emoji: "💉",
        category: "players",
        producesData: ["arc:mob_effect_instance", "arc:entity"],
    },
    on_get_attack_speed: {
        id: "on_get_attack_speed",
        title: "On Get Attack Speed",
        emoji: "⚔️",
        category: "players",
        producesData: ["arc:item_stack", "arc:item"],
    },
    on_rod_reel_in: {
        id: "on_rod_reel_in",
        title: "On Rod Reel In",
        emoji: "🎣",
        category: "players",
        producesData: ["arc:entity", "arc:block_position", "arc:world"],
    },
    on_shoot_projectile: {
        id: "on_shoot_projectile",
        title: "On Shoot Projectile",
        emoji: "🏹",
        category: "players",
        producesData: ["arc:item_stack", "arc:entity"],
    },
    on_strip_log: {
        id: "on_strip_log",
        title: "On Strip Log",
        emoji: "🪵",
        category: "players",
        producesData: ["arc:block_state", "arc:block_position", "arc:world"],
    },
    on_use_anvil: {
        id: "on_use_anvil",
        title: "On Use Anvil",
        emoji: "⚒️",
        category: "players",
        producesData: ["arc:item_stack", "arc:item"],
    },
} as const;

export type ActionTypesKeys = keyof typeof actionTypesDefinition;

export type ActionTypes = {
    [key in ActionTypesKeys]: ActionType;
};

export const actionTypes: ActionTypes = actionTypesDefinition;

export type ConditionType = {
    id: ConditionTypesKeys;
    category:
        | "none"
        | "blocks"
        | "effects"
        | "entities"
        | "experience"
        | "items"
        | "movement"
        | "recipes"
        | "scoreboard"
        | "teams"
        | "world";
    isActionCompatible: (action: ActionType) => boolean;
    readonly parameters: readonly {
        readonly name: string;
        readonly types: readonly {
            readonly type: string;
            readonly typeURL?: string;
        }[];
        readonly required: boolean;
        readonly default?: string | number | boolean;
        readonly description: string;
    }[];
} & SidebarItem;

export const conditionTypesDefinition = {
    block: {
        id: "block",
        title: "Block",
        emoji: "🧱",
        category: "blocks",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:block_state"),
        parameters: [
            {
                name: "block",
                types: [
                    {
                        type: "Block",
                        typeURL: "/docs/daqem/wiki/json_formats/block",
                    },
                ],
                required: true,
                description: "The block to check.",
            },
        ],
    },
    block_hardness: {
        id: "block_hardness",
        title: "Block Hardness",
        emoji: "🪨",
        category: "blocks",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:block_state") &&
            action.producesData.includes("arc:block_position"),
        parameters: [
            {
                name: "min",
                types: [{ type: "float" }],
                required: false,
                default: "1.4e-45",
                description: "The minimum hardness value.",
            },
            {
                name: "max",
                types: [{ type: "float" }],
                required: false,
                default: "3.4028235e+38",
                description: "The maximum hardness value.",
            },
        ],
    },
    blocks: {
        id: "blocks",
        title: "Blocks",
        emoji: "🧱🧱",
        category: "blocks",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:block_state"),
        parameters: [
            {
                name: "blocks",
                types: [{ type: "string[]" }],
                required: true,
                description: "The blocks/block tags to check.",
            },
        ],
    },
    crop_age: {
        id: "crop_age",
        title: "Crop Age",
        emoji: "🌱",
        category: "blocks",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:block_state"),
        parameters: [
            {
                name: "age",
                types: [{ type: "int" }],
                required: true,
                description: "The age of the crop.",
            },
        ],
    },
    crop_fully_grown: {
        id: "crop_fully_grown",
        title: "Crop Fully Grown",
        emoji: "🌾",
        category: "blocks",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:block_state"),
        parameters: [],
    },
    is_ore: {
        id: "is_ore",
        title: "Is Ore",
        emoji: "💎",
        category: "blocks",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:block_state"),
        parameters: [],
    },
    not_in_block_pos_cache: {
        id: "not_in_block_pos_cache",
        title: "Not In Block Pos Cache",
        emoji: "❌🧱",
        category: "blocks",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:block_position"),
        parameters: [],
    },
    effect: {
        id: "effect",
        title: "Effect",
        emoji: "💉",
        category: "effects",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:mob_effect_instance"),
        parameters: [
            {
                name: "effect",
                types: [
                    {
                        type: "Effect",
                        typeURL: "/projects/arc/wiki/json_formats/#effect",
                    },
                ],
                required: true,
                description: "The effect to check.",
            },
        ],
    },
    effect_category: {
        id: "effect_category",
        title: "Effect Category",
        emoji: "💉",
        category: "effects",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:mob_effect_instance"),
        parameters: [
            {
                name: "category",
                types: [
                    {
                        type: "EffectCategory",
                        typeURL: "/projects/arc/wiki/json_formats/#effect-category",
                    },
                ],
                required: true,
                description: "The category of the effect.",
            },
        ],
    },
    damage_source: {
        id: "damage_source",
        title: "Damage Source",
        emoji: "💥",
        category: "entities",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:damage_source"),
        parameters: [
            {
                name: "source",
                types: [{ type: "string" }],
                required: true,
                description: "The damage source to check.",
            },
        ],
    },
    entity_in_block: {
        id: "entity_in_block",
        title: "Entity In Block",
        emoji: "👤🧱",
        category: "entities",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:entity"),
        parameters: [
            {
                name: "block",
                types: [
                    {
                        type: "Block",
                        typeURL: "https://minecraft.wiki/w/List_of_blocks_by_version",
                    },
                ],
                required: true,
                description: "The block to check.",
            },
        ],
    },
    entity_type: {
        id: "entity_type",
        title: "Entity Type",
        emoji: "👤",
        category: "entities",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:entity"),
        parameters: [
            {
                name: "entity_type",
                types: [
                    {
                        type: "EntityType",
                        typeURL: "/projects/arc/wiki/json_formats/#entity-type",
                    },
                ],
                required: true,
                description: "The entity type to check.",
            },
        ],
    },
    entity_types: {
        id: "entity_types",
        title: "Entity Types",
        emoji: "👥",
        category: "entities",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:entity"),
        parameters: [
            {
                name: "entity_types",
                types: [
                    {
                        type: "EntityType[]",
                        typeURL: "/projects/arc/wiki/json_formats/#entity-type",
                    },
                ],
                required: true,
                description: "A list of entity types to check.",
            },
        ],
    },
    ready_for_shearing: {
        id: "ready_for_shearing",
        title: "Ready For Shearing",
        emoji: "✂️🐑",
        category: "entities",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:entity"),
        parameters: [],
    },
    exp_drop: {
        id: "exp_drop",
        title: "Experience Drop",
        emoji: "💰",
        category: "experience",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:exp_drop"),
        parameters: [
            {
                name: "min",
                types: [{ type: "int" }],
                required: true,
                description: "The minimum amount of experience dropped.",
            },
            {
                name: "max",
                types: [{ type: "int" }],
                required: true,
                description: "The maximum amount of experience dropped.",
            },
        ],
    },
    exp_level: {
        id: "exp_level",
        title: "Experience Level",
        emoji: "📈",
        category: "experience",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:exp_level"),
        parameters: [
            {
                name: "level",
                types: [{ type: "int" }],
                required: true,
                description: "The experience level to check.",
            },
        ],
    },
    item: {
        id: "item",
        title: "Item",
        emoji: "🪙",
        category: "items",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:item") ||
            action.producesData.includes("arc:item_stack"),
        parameters: [
            {
                name: "item",
                types: [
                    {
                        type: "Item",
                        typeURL: "/projects/arc/wiki/json_formats/#item",
                    },
                ],
                required: true,
                description: "The item to check.",
            },
            {
                name: "check_components",
                types: [{ type: "boolean" }],
                required: false,
                default: true,
                description: "Whether to check item components.",
            },
        ],
    },
    item_equipped: {
        id: "item_equipped",
        title: "Item Equipped",
        emoji: "🪙✅",
        category: "items",
        isActionCompatible: (action: ActionType) => true,
        parameters: [
            {
                name: "item",
                types: [
                    {
                        type: "Item",
                        typeURL: "/projects/arc/wiki/json_formats/#item",
                    },
                ],
                required: true,
                description: "The item to check.",
            },
        ],
    },
    item_in_hand: {
        id: "item_in_hand",
        title: "Item In Hand",
        emoji: "🪙✋",
        category: "items",
        isActionCompatible: (action: ActionType) => true,
        parameters: [
            {
                name: "item",
                types: [
                    {
                        type: "Item",
                        typeURL: "/projects/arc/wiki/json_formats/#item",
                    },
                ],
                required: true,
                description: "The item to check.",
            },
            {
                name: "hand",
                types: [
                    {
                        type: "Hand",
                        typeURL: "/projects/arc/wiki/json_formats/#hand",
                    },
                ],
                required: false,
                default: "null",
                description: "The hand to check. Checks both hands if not set.",
            },
        ],
    },
    item_in_inventory: {
        id: "item_in_inventory",
        title: "Item In Inventory",
        emoji: "🪙📦",
        category: "items",
        isActionCompatible: (action: ActionType) => true,
        parameters: [
            {
                name: "item",
                types: [
                    {
                        type: "Item",
                        typeURL: "/projects/arc/wiki/json_formats/#item",
                    },
                ],
                required: true,
                description: "The item to check.",
            },
        ],
    },
    items: {
        id: "items",
        title: "Items",
        emoji: "🪙🪙",
        category: "items",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:item") ||
            action.producesData.includes("arc:item_stack"),
        parameters: [
            {
                name: "items",
                types: [{ type: "string[]" }],
                required: true,
                description: "The items/item tags to check.",
            },
        ],
    },
    distance: {
        id: "distance",
        title: "Distance",
        emoji: "📏",
        category: "movement",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:distance_in_cm"),
        parameters: [
            {
                name: "distance_in_blocks",
                types: [{ type: "int" }],
                required: true,
                description: "The distance in blocks.",
            },
        ],
    },
    not: {
        id: "not",
        title: "Not",
        emoji: "🚫",
        category: "none",
        isActionCompatible: (action: ActionType) => true,
        parameters: [
            {
                name: "conditions",
                types: [
                    {
                        type: "Condition[]",
                        typeURL: "/projects/arc/wiki/conditions",
                    },
                ],
                required: true,
                description: "A list of conditions to check.",
            },
        ],
    },
    or: {
        id: "or",
        title: "Or",
        emoji: "🔀",
        category: "none",
        isActionCompatible: (action: ActionType) => true,
        parameters: [
            {
                name: "conditions",
                types: [
                    {
                        type: "Condition[]",
                        typeURL: "/projects/arc/wiki/conditions",
                    },
                ],
                required: true,
                description: "A list of conditions to check.",
            },
        ],
    },
    is_blasting_recipe: {
        id: "is_blasting_recipe",
        title: "Is Blasting Recipe",
        emoji: "🔥💎",
        category: "recipes",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:recipe"),
        parameters: [],
    },
    is_smoking_recipe: {
        id: "is_smoking_recipe",
        title: "Is Smoking Recipe",
        emoji: "🔥🍖",
        category: "recipes",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:recipe"),
        parameters: [],
    },
    scoreboard: {
        id: "scoreboard",
        title: "Scoreboard",
        emoji: "📋",
        category: "scoreboard",
        isActionCompatible: (action: ActionType) => true,
        parameters: [
            {
                name: "objective",
                types: [{ type: "string" }],
                required: true,
                description: "The scoreboard objective to check.",
            },
            {
                name: "min",
                types: [{ type: "int" }],
                required: true,
                description: "The minimum score.",
            },
            {
                name: "max",
                types: [{ type: "int" }],
                required: true,
                description: "The maximum score.",
            },
        ],
    },
    team: {
        id: "team",
        title: "Team",
        emoji: "👥",
        category: "teams",
        isActionCompatible: (action: ActionType) => true,
        parameters: [
            {
                name: "team",
                types: [{ type: "string" }],
                required: true,
                description: "The team name to check.",
            },
        ],
    },
    dimension: {
        id: "dimension",
        title: "Dimension",
        emoji: "🌍",
        category: "world",
        isActionCompatible: (action: ActionType) => true,
        parameters: [
            {
                name: "dimension",
                types: [{ type: "Dimension" }],
                required: true,
                description: "The dimension to check.",
            },
        ],
    },
} as const;

export type ConditionTypesKeys = keyof typeof conditionTypesDefinition;

export type ConditionTypes = {
    [key in ConditionTypesKeys]: ConditionType;
};

export const conditionTypes: ConditionTypes = conditionTypesDefinition;

export type RewardType = {
    id: RewardTypesKeys;
    category:
        | "none"
        | "blocks"
        | "effects"
        | "entities"
        | "experience"
        | "items"
        | "players"
        | "server";
    isActionCompatible: (action: ActionType) => boolean;
    readonly parameters: readonly {
        readonly name: string;
        readonly types: readonly {
            readonly type: string;
            readonly typeURL?: string;
        }[];
        readonly required: boolean;
        readonly default?: string | number | boolean;
        readonly description: string;
    }[];
} & SidebarItem;

export const rewardTypesDefinition = {
    block_drop_multiplier: {
        id: "block_drop_multiplier",
        title: "Block Drop Multiplier",
        emoji: "🧱",
        category: "blocks",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:block_state") &&
            action.producesData.includes("arc:block_position"),
        parameters: [
            {
                name: "multiplier",
                types: [{ type: "int" }],
                required: true,
                description: "The multiplier for block drops.",
            },
        ],
    },
    destroy_speed_multiplier: {
        id: "destroy_speed_multiplier",
        title: "Destroy Speed Multiplier",
        emoji: "⚡",
        category: "blocks",
        isActionCompatible: (action: ActionType) =>
            action.id === "on_get_destroy_speed",
        parameters: [
            {
                name: "multiplier",
                types: [{ type: "float" }],
                required: true,
                description: "The multiplier for destroy speed.",
            },
        ],
    },
    cancel_action: {
        id: "cancel_action",
        title: "Cancel Action",
        emoji: "❌",
        category: "none",
        isActionCompatible: (action: ActionType) => {
            const allowedActions: ActionTypesKeys[] = [
                "on_place_block",
                "on_break_block",
                "on_interact_block",
                "on_harvest_crop",
                "on_plant_crop",
                "on_tame_animal",
                "on_breed_animal",
                "on_interact_entity",
                "on_hurt_entity",
                "on_hurt_item",
                "on_hurt_player",
                "on_effect_added",
                "on_get_hurt",
            ];
            return allowedActions.includes(action.id);
        },
        parameters: [],
    },
    effect: {
        id: "effect",
        title: "Potion Effect",
        emoji: "💉",
        category: "effects",
        isActionCompatible: (action: ActionType) => true,
        parameters: [
            {
                name: "effect",
                types: [
                    {
                        type: "Effect",
                        typeURL: "/projects/arc/wiki/json_formats/#effect",
                    },
                ],
                required: true,
                description: "The effect to apply.",
            },
            {
                name: "duration",
                types: [{ type: "int" }],
                required: true,
                description: "The duration of the effect in ticks.",
            },
            {
                name: "amplifier",
                types: [{ type: "int" }],
                required: false,
                default: 0,
                description: "The amplifier of the effect.",
            },
        ],
    },
    effect_amplifier_addition: {
        id: "effect_amplifier_addition",
        title: "Effect Amplifier Addition",
        emoji: "➕💉",
        category: "effects",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:mob_effect_instance"),
        parameters: [
            {
                name: "addition",
                types: [{ type: "int" }],
                required: true,
                description: "The amount to add to the effect's amplifier.",
            },
        ],
    },
    effect_duration_multiplier: {
        id: "effect_duration_multiplier",
        title: "Effect Duration Multiplier",
        emoji: "⏳💉",
        category: "effects",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:mob_effect_instance"),
        parameters: [
            {
                name: "multiplier",
                types: [{ type: "double" }],
                required: true,
                description: "The multiplier for the effect's duration.",
            },
        ],
    },
    remove_effect: {
        id: "remove_effect",
        title: "Remove Effect",
        emoji: "❌💉",
        category: "effects",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:mob_effect_instance"),
        parameters: [],
    },
    damage_multiplier: {
        id: "damage_multiplier",
        title: "Damage Multiplier",
        emoji: "⚔️",
        category: "entities",
        isActionCompatible: (action: ActionType) =>
            action.id === "on_get_hurt" || action.id === "on_hurt_player",
        parameters: [
            {
                name: "multiplier",
                types: [{ type: "double" }],
                required: true,
                description: "The multiplier for the damage.",
            },
        ],
    },
    entity_on_fire: {
        id: "entity_on_fire",
        title: "Entity On Fire",
        emoji: "🔥👤",
        category: "entities",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:entity"),
        parameters: [
            {
                name: "ticks",
                types: [{ type: "int" }],
                required: true,
                description: "The duration of the fire in ticks.",
            },
        ],
    },
    multiple_arrows: {
        id: "multiple_arrows",
        title: "Multiple Arrows",
        emoji: "➡️➡️",
        category: "entities",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:entity"),
        parameters: [
            {
                name: "amount",
                types: [{ type: "int" }],
                required: true,
                description: "The number of arrows to shoot.",
            },
        ],
    },
    exp: {
        id: "exp",
        title: "Experience",
        emoji: "✨",
        category: "experience",
        isActionCompatible: (action: ActionType) => true,
        parameters: [
            {
                name: "min",
                types: [{ type: "int" }],
                required: true,
                description: "The minimum amount of experience to give.",
            },
            {
                name: "max",
                types: [{ type: "int" }],
                required: true,
                description: "The maximum amount of experience to give.",
            },
        ],
    },
    exp_multiplier: {
        id: "exp_multiplier",
        title: "Experience Multiplier",
        emoji: "✨➕",
        category: "experience",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:exp_drop") &&
            action.producesData.includes("arc:block_position"),
        parameters: [
            {
                name: "multiplier",
                types: [{ type: "int" }],
                required: true,
                description: "The multiplier for the experience.",
            },
        ],
    },
    drop_item: {
        id: "drop_item",
        title: "Drop Item",
        emoji: "🪙",
        category: "items",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:block_position"),
        parameters: [
            {
                name: "item",
                types: [
                    {
                        type: "Item",
                        typeURL: "/projects/arc/wiki/json_formats/#item",
                    },
                ],
                required: true,
                description: "The item to drop.",
            },
        ],
    },
    item: {
        id: "item",
        title: "Item",
        emoji: "🪙",
        category: "items",
        isActionCompatible: (action: ActionType) => true,
        parameters: [
            {
                name: "item",
                types: [
                    {
                        type: "Item",
                        typeURL: "/projects/arc/wiki/json_formats/#item",
                    },
                ],
                required: true,
                description: "The item to give.",
            },
            {
                name: "amount",
                types: [{ type: "int" }],
                required: false,
                default: 1,
                description: "The amount of the item to give.",
            },
        ],
    },
    attack_speed_multiplier: {
        id: "attack_speed_multiplier",
        title: "Attack Speed Multiplier",
        emoji: "⚡",
        category: "players",
        isActionCompatible: (action: ActionType) =>
            action.id === "on_get_attack_speed",
        parameters: [
            {
                name: "multiplier",
                types: [{ type: "float" }],
                required: true,
                description: "The multiplier for the attack speed.",
            },
        ],
    },
    move_to_entity: {
        id: "move_to_entity",
        title: "Move To Entity",
        emoji: "👤➡️",
        category: "players",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:entity"),
        parameters: [
            {
                name: "force",
                types: [{ type: "float" }],
                required: true,
                description: "The force to move the player with.",
            },
        ],
    },
    command: {
        id: "command",
        title: "Command",
        emoji: "💻",
        category: "server",
        isActionCompatible: (action: ActionType) => true,
        parameters: [
            {
                name: "command",
                types: [{ type: "string" }],
                required: true,
                description: "The command to execute.",
            },
        ],
    },
} as const;

export type RewardTypesKeys = keyof typeof rewardTypesDefinition;

export type RewardTypes = {
    [key in RewardTypesKeys]: RewardType;
};

export const rewardTypes: RewardTypes = rewardTypesDefinition;