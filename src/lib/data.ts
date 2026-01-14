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
    | "arc:recipe"
    | "arc:hand"
    | "arc:fall_distance"
    | "arc:from_dimension"
    | "arc:to_dimension"
    | "arc:trade_offer"
    | "arc:is_critical_hit"
    | "jobsplus:job_exp"
    | "jobsplus:only_for_job";

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
    "arc:hand": {
        description: "The hand used to perform the action.",
    },
    "arc:fall_distance": {
        description: "The distance the entity fell.",
    },
    "arc:from_dimension": {
        description: "The dimension the entity came from.",
    },
    "arc:to_dimension": {
        description: "The dimension the entity is going to.",
    },
    "arc:trade_offer": {
        description: "The trade offer involved in the action.",
    },
    "arc:is_critical_hit": {
        description: "Whether the hit was critical.",
    },
    "jobsplus:job_exp": {
        description: "The amount of job experience.",
    },
    "jobsplus:only_for_job": {
        description: "The job this action is restricted to.",
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
        | "players"
        | "jobsplus";
    producesData: readonly ActionDataTypes[];
} & SidebarItem;

const actionTypesDefinition = {
    // Arc Actions
    on_advancement: {
        id: "arc:on_advancement",
        title: "On Advancement",
        emoji: "🏆",
        category: "advancements",
        producesData: ["arc:advancement"],
    },
    on_break_block: {
        id: "arc:on_break_block",
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
        id: "arc:on_get_destroy_speed",
        title: "On Get Destroy Speed",
        emoji: "⚡",
        category: "blocks",
        producesData: [
            "arc:item_stack",
            "arc:item",
            "arc:block_state",
            "arc:block_position",
            "arc:world",
        ],
    },
    on_harvest_crop: {
        id: "arc:on_harvest_crop",
        title: "On Harvest Crop",
        emoji: "🌾",
        category: "blocks",
        producesData: [
            "arc:block_state",
            "arc:block_position",
            "arc:world",
            "arc:exp_drop",
        ],
    },
    on_interact_block: {
        id: "arc:on_interact_block",
        title: "On Interact Block",
        emoji: "🖱️",
        category: "blocks",
        producesData: [
            "arc:block_state",
            "arc:block_position",
            "arc:world",
            "arc:item_stack",
            "arc:hand",
        ],
    },
    on_place_block: {
        id: "arc:on_place_block",
        title: "On Place Block",
        emoji: "🧱",
        category: "blocks",
        producesData: ["arc:block_state", "arc:block_position", "arc:world"],
    },
    on_plant_crop: {
        id: "arc:on_plant_crop",
        title: "On Plant Crop",
        emoji: "🌱",
        category: "blocks",
        producesData: ["arc:block_state", "arc:block_position", "arc:world"],
    },
    on_till_soil: {
        id: "arc:on_till_soil",
        title: "On Till Soil",
        emoji: "🌾",
        category: "blocks",
        producesData: [
            "arc:block_state",
            "arc:block_position",
            "arc:world",
            "arc:item_stack",
        ],
    },
    on_breed_animal: {
        id: "arc:on_breed_animal",
        title: "On Breed Animal",
        emoji: "🐑",
        category: "entities",
        producesData: ["arc:entity"],
    },
    on_death: {
        id: "arc:on_death",
        title: "On Death",
        emoji: "💀",
        category: "players",
        producesData: [
            "arc:entity",
            "arc:damage_source",
            "arc:block_position",
            "arc:world",
            "arc:exp_drop",
        ],
    },
    on_get_hurt: {
        id: "arc:on_get_hurt",
        title: "On Get Hurt",
        emoji: "🤕",
        category: "players",
        producesData: ["arc:entity", "arc:damage_source", "arc:damage_amount"],
    },
    on_hurt_entity: {
        id: "arc:on_hurt_entity",
        title: "On Hurt Entity",
        emoji: "🗡️",
        category: "entities",
        producesData: ["arc:entity", "arc:damage_source", "arc:damage_amount"],
    },
    on_hurt_player: {
        id: "arc:on_hurt_player",
        title: "On Hurt Player",
        emoji: "🩸",
        category: "players",
        producesData: ["arc:entity", "arc:damage_source", "arc:damage_amount"],
    },
    on_interact_entity: {
        id: "arc:on_interact_entity",
        title: "On Interact Entity",
        emoji: "🖱️",
        category: "entities",
        producesData: [
            "arc:item_stack",
            "arc:item",
            "arc:hand",
            "arc:entity",
            "arc:world",
        ],
    },
    on_kill_entity: {
        id: "arc:on_kill_entity",
        title: "On Kill Entity",
        emoji: "💀",
        category: "entities",
        producesData: [
            "arc:entity",
            "arc:damage_source",
            "arc:block_position",
            "arc:world",
            "arc:exp_drop",
        ],
    },
    on_tame_animal: {
        id: "arc:on_tame_animal",
        title: "On Tame Animal",
        emoji: "🐾",
        category: "entities",
        producesData: ["arc:entity", "arc:block_position", "arc:world"],
    },
    on_trade_with_villager: {
        id: "arc:on_trade_with_villager",
        title: "On Trade With Villager",
        emoji: "🤝",
        category: "entities",
        producesData: [
            "arc:entity",
            "arc:item_stack",
            "arc:trade_offer",
            "arc:world",
        ],
    },
    on_craft_item: {
        id: "arc:on_craft_item",
        title: "On Craft Item",
        emoji: "🛠️",
        category: "items",
        producesData: ["arc:recipe", "arc:item", "arc:item_stack", "arc:world"],
    },
    on_drop_item: {
        id: "arc:on_drop_item",
        title: "On Drop Item",
        emoji: "🪣",
        category: "items",
        producesData: [
            "arc:entity",
            "arc:item",
            "arc:item_stack",
            "arc:world",
            "arc:block_position",
        ],
    },
    on_enchant_item: {
        id: "arc:on_enchant_item",
        title: "On Enchant Item",
        emoji: "✨",
        category: "items",
        producesData: ["arc:item_stack", "arc:exp_level"],
    },
    on_fished_up_item: {
        id: "arc:on_fished_up_item",
        title: "On Fished Up Item",
        emoji: "🎣",
        category: "items",
        producesData: ["arc:item_stack", "arc:item"],
    },
    on_grind_item: {
        id: "arc:on_grind_item",
        title: "On Grind Item",
        emoji: "⚙️",
        category: "items",
        producesData: [
            "arc:item_stack",
            "arc:item",
            "arc:world",
            "arc:block_position",
            "arc:exp_drop",
        ],
    },
    on_hurt_item: {
        id: "arc:on_hurt_item",
        title: "On Hurt Item",
        emoji: "🗡️",
        category: "items",
        producesData: [
            "arc:item_stack",
            "arc:item",
            "arc:world",
            "arc:damage_amount",
        ],
    },
    on_item_break: {
        id: "arc:on_item_break",
        title: "On Item Break",
        emoji: "💥",
        category: "items",
        producesData: [
            "arc:item_stack",
            "arc:item",
            "arc:block_position",
            "arc:world",
        ],
    },
    on_pickup_item: {
        id: "arc:on_pickup_item",
        title: "On Pickup Item",
        emoji: "🤲",
        category: "items",
        producesData: [
            "arc:entity",
            "arc:item_stack",
            "arc:item",
            "arc:block_position",
            "arc:world",
        ],
    },
    on_smelt_item: {
        id: "arc:on_smelt_item",
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
        id: "arc:on_throw_item",
        title: "On Throw Item",
        emoji: "🏹",
        category: "items",
        producesData: ["arc:item_stack", "arc:entity", "arc:item", "arc:world"],
    },
    on_use_item: {
        id: "arc:on_use_item",
        title: "On Use Item",
        emoji: "🖱️",
        category: "items",
        producesData: ["arc:item_stack", "arc:item", "arc:world", "arc:hand"],
    },
    on_fill_bucket: {
        id: "arc:on_fill_bucket",
        title: "On Fill Bucket",
        emoji: "🪣",
        category: "items",
        producesData: [
            "arc:item_stack",
            "arc:item",
            "arc:block_position",
            "arc:block_state",
            "arc:world",
        ],
    },
    on_empty_bucket: {
        id: "arc:on_empty_bucket",
        title: "On Empty Bucket",
        emoji: "🪣",
        category: "items",
        producesData: [
            "arc:item_stack",
            "arc:item",
            "arc:block_position",
            "arc:block_state",
            "arc:world",
        ],
    },
    on_crouch: {
        id: "arc:on_crouch",
        title: "On Crouch",
        emoji: "🦶",
        category: "movement",
        producesData: ["arc:distance_in_cm", "arc:world", "arc:block_position"],
    },
    on_crouch_start: {
        id: "arc:on_crouch_start",
        title: "On Start Crouching",
        emoji: "🦶",
        category: "movement",
        producesData: ["arc:world", "arc:block_position"],
    },
    on_crouch_stop: {
        id: "arc:on_crouch_stop",
        title: "On Stop Crouching",
        emoji: "🦶",
        category: "movement",
        producesData: ["arc:world", "arc:block_position"],
    },
    on_elytra_fly: {
        id: "arc:on_elytra_fly",
        title: "On Elytra Fly",
        emoji: "🪂",
        category: "movement",
        producesData: ["arc:distance_in_cm", "arc:world", "arc:block_position"],
    },
    on_elytra_fly_start: {
        id: "arc:on_elytra_fly_start",
        title: "On Start Elytra Flying",
        emoji: "🪂",
        category: "movement",
        producesData: ["arc:world", "arc:block_position"],
    },
    on_elytra_fly_stop: {
        id: "arc:on_elytra_fly_stop",
        title: "On Stop Elytra Flying",
        emoji: "🪂",
        category: "movement",
        producesData: ["arc:world", "arc:block_position"],
    },
    on_horse_ride: {
        id: "arc:on_horse_ride",
        title: "On Horse Ride",
        emoji: "🐎",
        category: "movement",
        producesData: ["arc:distance_in_cm", "arc:world", "arc:block_position"],
    },
    on_horse_ride_start: {
        id: "arc:on_horse_ride_start",
        title: "On Start Horse Riding",
        emoji: "🐎",
        category: "movement",
        producesData: ["arc:world", "arc:block_position"],
    },
    on_horse_ride_stop: {
        id: "arc:on_horse_ride_stop",
        title: "On Stop Horse Riding",
        emoji: "🐎",
        category: "movement",
        producesData: ["arc:world", "arc:block_position"],
    },
    on_sprint: {
        id: "arc:on_sprint",
        title: "On Sprint",
        emoji: "🏃‍♂️",
        category: "movement",
        producesData: ["arc:distance_in_cm", "arc:world", "arc:block_position"],
    },
    on_sprint_start: {
        id: "arc:on_sprint_start",
        title: "On Start Sprinting",
        emoji: "🏃‍♂️",
        category: "movement",
        producesData: ["arc:world", "arc:block_position"],
    },
    on_sprint_stop: {
        id: "arc:on_sprint_stop",
        title: "On Stop Sprinting",
        emoji: "🏃‍♂️",
        category: "movement",
        producesData: ["arc:world", "arc:block_position"],
    },
    on_swim: {
        id: "arc:on_swim",
        title: "On Swim",
        emoji: "🏊‍♂️",
        category: "movement",
        producesData: ["arc:distance_in_cm", "arc:world", "arc:block_position"],
    },
    on_swim_start: {
        id: "arc:on_swim_start",
        title: "On Start Swimming",
        emoji: "🏊‍♂️",
        category: "movement",
        producesData: ["arc:world", "arc:block_position"],
    },
    on_swim_stop: {
        id: "arc:on_swim_stop",
        title: "On Stop Swimming",
        emoji: "🏊‍♂️",
        category: "movement",
        producesData: ["arc:world", "arc:block_position"],
    },
    on_walk: {
        id: "arc:on_walk",
        title: "On Walk",
        emoji: "🚶‍♂️",
        category: "movement",
        producesData: ["arc:distance_in_cm", "arc:world", "arc:block_position"],
    },
    on_walk_start: {
        id: "arc:on_walk_start",
        title: "On Start Walking",
        emoji: "🚶‍♂️",
        category: "movement",
        producesData: ["arc:world", "arc:block_position"],
    },
    on_walk_stop: {
        id: "arc:on_walk_stop",
        title: "On Stop Walking",
        emoji: "🚶‍♂️",
        category: "movement",
        producesData: ["arc:world", "arc:block_position"],
    },
    on_jump: {
        id: "arc:on_jump",
        title: "On Jump",
        emoji: "🦘",
        category: "movement",
        producesData: ["arc:block_position", "arc:world"],
    },
    on_land: {
        id: "arc:on_land",
        title: "On Land",
        emoji: "🦶",
        category: "movement",
        producesData: ["arc:fall_distance", "arc:block_position", "arc:world"],
    },
    on_change_dimension: {
        id: "arc:on_change_dimension",
        title: "On Change Dimension",
        emoji: "🌍",
        category: "movement",
        producesData: ["arc:from_dimension", "arc:to_dimension", "arc:world"],
    },
    on_brew_potion: {
        id: "arc:on_brew_potion",
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
        id: "arc:on_drink",
        title: "On Drink",
        emoji: "🥤",
        category: "players",
        producesData: [
            "arc:item_stack",
            "arc:item",
            "arc:world",
            "arc:block_position",
        ],
    },
    on_eat: {
        id: "arc:on_eat",
        title: "On Eat",
        emoji: "🍽️",
        category: "players",
        producesData: [
            "arc:item_stack",
            "arc:item",
            "arc:world",
            "arc:block_position",
        ],
    },
    on_effect_added: {
        id: "arc:on_add_effect",
        title: "On Effect Added",
        emoji: "💉",
        category: "players",
        producesData: [
            "arc:mob_effect_instance",
            "arc:entity",
            "arc:world",
            "arc:block_position",
        ],
    },
    on_get_attack_speed: {
        id: "arc:on_get_attack_speed",
        title: "On Get Attack Speed",
        emoji: "⚔️",
        category: "players",
        producesData: [
            "arc:item_stack",
            "arc:item",
            "arc:world",
            "arc:block_position",
        ],
    },
    on_rod_reel_in: {
        id: "arc:on_rod_reel_in",
        title: "On Rod Reel In",
        emoji: "🎣",
        category: "players",
        producesData: [
            "arc:entity",
            "arc:block_position",
            "arc:block_state",
            "arc:world",
        ],
    },
    on_shoot_projectile: {
        id: "arc:on_shoot_projectile",
        title: "On Shoot Projectile",
        emoji: "🏹",
        category: "players",
        producesData: [
            "arc:item_stack",
            "arc:entity",
            "arc:world",
            "arc:block_position",
        ],
    },
    on_strip_log: {
        id: "arc:on_strip_log",
        title: "On Strip Log",
        emoji: "🪵",
        category: "players",
        producesData: [
            "arc:block_state",
            "arc:block_position",
            "arc:world",
            "arc:item_stack",
            "arc:item",
            "arc:hand",
        ],
    },
    on_use_anvil: {
        id: "arc:on_use_anvil",
        title: "On Use Anvil",
        emoji: "⚒️",
        category: "players",
        producesData: [
            "arc:item_stack",
            "arc:item",
            "arc:world",
            "arc:block_position",
            "arc:exp_level",
        ],
    },
    on_block_with_shield: {
        id: "arc:on_block_with_shield",
        title: "On Block With Shield",
        emoji: "🛡️",
        category: "players",
        producesData: [
            "arc:damage_source",
            "arc:damage_amount",
            "arc:entity",
            "arc:block_position",
            "arc:world",
        ],
    },
    // JobsPlus Actions
    on_job_exp: {
        id: "jobsplus:on_job_exp",
        title: "On Job Experience",
        emoji: "💼",
        category: "jobsplus",
        producesData: ["jobsplus:job_exp", "jobsplus:only_for_job"],
    },
    on_job_level_up: {
        id: "jobsplus:on_job_level_up",
        title: "On Job Level Up",
        emoji: "🆙",
        category: "jobsplus",
        producesData: ["jobsplus:only_for_job"],
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
        | "world"
        | "jobsplus";
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
    // Arc Conditions
    block: {
        id: "arc:block",
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
        id: "arc:block_hardness",
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
        id: "arc:blocks",
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
        id: "arc:crop_age",
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
        id: "arc:crop_fully_grown",
        title: "Crop Fully Grown",
        emoji: "🌾",
        category: "blocks",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:block_state"),
        parameters: [],
    },
    is_ore: {
        id: "arc:is_ore",
        title: "Is Ore",
        emoji: "💎",
        category: "blocks",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:block_state"),
        parameters: [],
    },
    not_in_block_pos_cache: {
        id: "arc:not_in_block_pos_cache",
        title: "Not In Block Pos Cache",
        emoji: "❌🧱",
        category: "blocks",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:block_position"),
        parameters: [],
    },
    effect: {
        id: "arc:effect",
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
        id: "arc:effect_category",
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
                        typeURL:
                            "/projects/arc/wiki/json_formats/#effect-category",
                    },
                ],
                required: true,
                description: "The category of the effect.",
            },
        ],
    },
    damage_source: {
        id: "arc:damage_source",
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
        id: "arc:entity_in_block",
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
                        typeURL:
                            "https://minecraft.wiki/w/List_of_blocks_by_version",
                    },
                ],
                required: true,
                description: "The block to check.",
            },
        ],
    },
    entity_type: {
        id: "arc:entity_type",
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
        id: "arc:entity_types",
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
        id: "arc:ready_for_shearing",
        title: "Ready For Shearing",
        emoji: "✂️🐑",
        category: "entities",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:entity"),
        parameters: [],
    },
    entity_data: {
        id: "arc:entity_data",
        title: "Entity Data",
        emoji: "📊",
        category: "entities",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:entity"),
        parameters: [
            {
                name: "properties",
                types: [{ type: "EntityDataProperty[]" }],
                required: true,
                description: "The properties to check.",
            },
            {
                name: "target",
                types: [{ type: "string" }],
                required: false,
                default: "player",
                description: "The target entity (player or entity).",
            },
        ],
    },
    on_fire: {
        id: "arc:on_fire",
        title: "On Fire",
        emoji: "🔥",
        category: "entities",
        isActionCompatible: () => true,
        parameters: [],
    },
    health: {
        id: "arc:health",
        title: "Health",
        emoji: "❤️",
        category: "entities",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "health",
                types: [{ type: "double" }],
                required: true,
                description: "The health value.",
            },
            {
                name: "comparison",
                types: [{ type: "ComparisonType" }],
                required: false,
                default: "EQUAL",
                description: "The comparison type.",
            },
            {
                name: "is_percentage",
                types: [{ type: "boolean" }],
                required: false,
                default: false,
                description: "Whether to use percentage.",
            },
        ],
    },
    food_level: {
        id: "arc:food_level",
        title: "Food Level",
        emoji: "🍗",
        category: "entities",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "food_level",
                types: [{ type: "int" }],
                required: true,
                description: "The food level.",
            },
            {
                name: "comparison",
                types: [{ type: "ComparisonType" }],
                required: false,
                default: "EQUAL",
                description: "The comparison type.",
            },
        ],
    },
    saturation_level: {
        id: "arc:saturation_level",
        title: "Saturation Level",
        emoji: "🍖",
        category: "entities",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "saturation_level",
                types: [{ type: "float" }],
                required: true,
                description: "The saturation level.",
            },
            {
                name: "comparison",
                types: [{ type: "ComparisonType" }],
                required: false,
                default: "EQUAL",
                description: "The comparison type.",
            },
        ],
    },
    is_wet: {
        id: "arc:is_wet",
        title: "Is Wet",
        emoji: "💧",
        category: "entities",
        isActionCompatible: () => true,
        parameters: [],
    },
    is_underwater: {
        id: "arc:is_underwater",
        title: "Is Underwater",
        emoji: "🌊",
        category: "entities",
        isActionCompatible: () => true,
        parameters: [],
    },
    is_sleeping: {
        id: "arc:is_sleeping",
        title: "Is Sleeping",
        emoji: "😴",
        category: "entities",
        isActionCompatible: () => true,
        parameters: [],
    },
    is_sneaking: {
        id: "arc:is_sneaking",
        title: "Is Sneaking",
        emoji: "👟",
        category: "entities",
        isActionCompatible: () => true,
        parameters: [],
    },
    is_blocking: {
        id: "arc:is_blocking",
        title: "Is Blocking",
        emoji: "🛡️",
        category: "entities",
        isActionCompatible: () => true,
        parameters: [],
    },
    is_riding: {
        id: "arc:is_riding",
        title: "Is Riding",
        emoji: "🐎",
        category: "entities",
        isActionCompatible: () => true,
        parameters: [],
    },
    riding_entity_type: {
        id: "arc:riding_entity_type",
        title: "Riding Entity Type",
        emoji: "🏇",
        category: "entities",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "entity_type",
                types: [{ type: "EntityType" }],
                required: true,
                description: "The entity type being ridden.",
            },
        ],
    },
    hand: {
        id: "arc:hand",
        title: "Hand",
        emoji: "✋",
        category: "entities",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:hand"),
        parameters: [
            {
                name: "hand",
                types: [{ type: "Hand" }],
                required: true,
                description: "The hand to check.",
            },
        ],
    },
    exp_drop: {
        id: "arc:exp_drop",
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
        id: "arc:exp_level",
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
        id: "arc:item",
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
        id: "arc:item_equipped",
        title: "Item Equipped",
        emoji: "🪙✅",
        category: "items",
        isActionCompatible: () => true,
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
        id: "arc:item_in_hand",
        title: "Item In Hand",
        emoji: "🪙✋",
        category: "items",
        isActionCompatible: () => true,
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
        id: "arc:item_in_inventory",
        title: "Item In Inventory",
        emoji: "🪙📦",
        category: "items",
        isActionCompatible: () => true,
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
        id: "arc:items",
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
    inventory_full: {
        id: "arc:inventory_full",
        title: "Inventory Full",
        emoji: "🈵",
        category: "items",
        isActionCompatible: () => true,
        parameters: [],
    },
    inventory_empty: {
        id: "arc:inventory_empty",
        title: "Inventory Empty",
        emoji: "🈳",
        category: "items",
        isActionCompatible: () => true,
        parameters: [],
    },
    item_durability: {
        id: "arc:item_durability",
        title: "Item Durability",
        emoji: "🛠️",
        category: "items",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:item_stack"),
        parameters: [
            {
                name: "durability",
                types: [{ type: "double" }],
                required: true,
                description: "The durability value.",
            },
            {
                name: "comparison",
                types: [{ type: "ComparisonType" }],
                required: false,
                default: "EQUAL",
                description: "The comparison type.",
            },
            {
                name: "is_percentage",
                types: [{ type: "boolean" }],
                required: false,
                default: false,
                description: "Whether to use percentage.",
            },
        ],
    },
    has_enchantment: {
        id: "arc:has_enchantment",
        title: "Has Enchantment",
        emoji: "✨",
        category: "items",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:item_stack"),
        parameters: [
            {
                name: "enchantment",
                types: [{ type: "ArcEnchantment" }],
                required: true,
                description: "The enchantment to check.",
            },
            {
                name: "comparison",
                types: [{ type: "ComparisonType" }],
                required: false,
                default: "EQUAL",
                description: "The comparison type.",
            },
        ],
    },
    full_armor_set: {
        id: "arc:full_armor_set",
        title: "Full Armor Set",
        emoji: "🛡️",
        category: "items",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "items",
                types: [{ type: "ArcItemStack[]" }],
                required: true,
                description: "The armor items to check.",
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
    distance: {
        id: "arc:distance",
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
        id: "arc:not",
        title: "Not",
        emoji: "🚫",
        category: "none",
        isActionCompatible: () => true,
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
        id: "arc:or",
        title: "Or",
        emoji: "🔀",
        category: "none",
        isActionCompatible: () => true,
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
    chance: {
        id: "arc:chance",
        title: "Chance",
        emoji: "🎲",
        category: "none",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "chance",
                types: [{ type: "double" }],
                required: true,
                description: "The chance percentage (0-100).",
            },
        ],
    },
    is_blasting_recipe: {
        id: "arc:is_blasting_recipe",
        title: "Is Blasting Recipe",
        emoji: "🔥💎",
        category: "recipes",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:recipe"),
        parameters: [],
    },
    is_smoking_recipe: {
        id: "arc:is_smoking_recipe",
        title: "Is Smoking Recipe",
        emoji: "🔥🍖",
        category: "recipes",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:recipe"),
        parameters: [],
    },
    scoreboard: {
        id: "arc:scoreboard",
        title: "Scoreboard",
        emoji: "📋",
        category: "scoreboard",
        isActionCompatible: () => true,
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
        id: "arc:team",
        title: "Team",
        emoji: "👥",
        category: "teams",
        isActionCompatible: () => true,
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
        id: "arc:dimension",
        title: "Dimension",
        emoji: "🌍",
        category: "world",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "dimension",
                types: [{ type: "Dimension" }],
                required: true,
                description: "The dimension to check.",
            },
        ],
    },
    y_level: {
        id: "arc:y_level",
        title: "Y Level",
        emoji: "↕️",
        category: "world",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "min_y",
                types: [{ type: "int" }],
                required: true,
                description: "The minimum Y level.",
            },
            {
                name: "max_y",
                types: [{ type: "int" }],
                required: true,
                description: "The maximum Y level.",
            },
        ],
    },
    time_of_day: {
        id: "arc:time_of_day",
        title: "Time Of Day",
        emoji: "⏰",
        category: "world",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "min_time",
                types: [{ type: "int" }],
                required: true,
                description: "The minimum time.",
            },
            {
                name: "max_time",
                types: [{ type: "int" }],
                required: true,
                description: "The maximum time.",
            },
        ],
    },
    weather: {
        id: "arc:weather",
        title: "Weather",
        emoji: "🌦️",
        category: "world",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "weather",
                types: [{ type: "ArcWeatherType" }],
                required: true,
                description: "The weather type (CLEAR, RAIN, THUNDER).",
            },
        ],
    },
    light_level: {
        id: "arc:light_level",
        title: "Light Level",
        emoji: "💡",
        category: "world",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "light_level",
                types: [{ type: "int" }],
                required: true,
                description: "The light level.",
            },
            {
                name: "comparison",
                types: [{ type: "ComparisonType" }],
                required: false,
                default: "EQUAL",
                description: "The comparison type.",
            },
        ],
    },
    biome: {
        id: "arc:biome",
        title: "Biome",
        emoji: "🌲",
        category: "world",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "biomes",
                types: [{ type: "Identifier[]" }],
                required: true,
                description: "The biomes to check.",
            },
        ],
    },
    structure: {
        id: "arc:structure",
        title: "Structure",
        emoji: "🏰",
        category: "world",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "structure",
                types: [{ type: "TagKey<Structure>" }],
                required: true,
                description: "The structure tag to check.",
            },
        ],
    },
    critical_hit: {
        id: "arc:critical_hit",
        title: "Critical Hit",
        emoji: "💥",
        category: "entities",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:is_critical_hit"),
        parameters: [],
    },
    target_health: {
        id: "arc:target_health",
        title: "Target Health",
        emoji: "🎯",
        category: "entities",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:entity"),
        parameters: [
            {
                name: "health",
                types: [{ type: "double" }],
                required: true,
                description: "The health value.",
            },
            {
                name: "comparison",
                types: [{ type: "ComparisonType" }],
                required: false,
                default: "EQUAL",
                description: "The comparison type.",
            },
            {
                name: "is_percentage",
                types: [{ type: "boolean" }],
                required: false,
                default: false,
                description: "Whether to use percentage.",
            },
        ],
    },
    // JobsPlus Conditions
    job_experience_percentage: {
        id: "jobsplus:job_experience_percentage",
        title: "Job Experience Percentage",
        emoji: "📊",
        category: "jobsplus",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("jobsplus:only_for_job"),
        parameters: [
            {
                name: "percentage",
                types: [{ type: "double" }],
                required: true,
                description: "The required experience percentage.",
            },
        ],
    },
    job_level: {
        id: "jobsplus:job_level",
        title: "Job Level",
        emoji: "🆙",
        category: "jobsplus",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "job",
                types: [{ type: "Job" }],
                required: true,
                description: "The job to check.",
            },
            {
                name: "level",
                types: [{ type: "int" }],
                required: true,
                description: "The required level.",
            },
        ],
    },
    powerup_not_active: {
        id: "jobsplus:powerup_not_active",
        title: "Powerup Not Active",
        emoji: "🚫⚡",
        category: "jobsplus",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "powerup",
                types: [{ type: "Powerup" }],
                required: true,
                description: "The powerup to check.",
            },
        ],
    },
    has_job: {
        id: "jobsplus:has_job",
        title: "Has Job",
        emoji: "💼",
        category: "jobsplus",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "job",
                types: [{ type: "Job" }],
                required: true,
                description: "The job to check.",
            },
        ],
    },
    has_powerup_activated: {
        id: "jobsplus:has_powerup_activated",
        title: "Has Powerup Activated",
        emoji: "⚡✅",
        category: "jobsplus",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "powerup",
                types: [{ type: "Powerup" }],
                required: true,
                description: "The powerup to check.",
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
        | "server"
        | "world"
        | "jobsplus";
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
    // Arc Rewards
    block_drop_multiplier: {
        id: "arc:block_drop_multiplier",
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
        id: "arc:destroy_speed_multiplier",
        title: "Destroy Speed Multiplier",
        emoji: "⚡",
        category: "blocks",
        isActionCompatible: (action: ActionType) =>
            action.id === "arc:on_get_destroy_speed",
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
        id: "arc:cancel_action",
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
                "on_use_item",
                "on_empty_bucket",
            ];
            return allowedActions.includes(action.id as any);
        },
        parameters: [],
    },
    effect: {
        id: "arc:effect",
        title: "Potion Effect",
        emoji: "💉",
        category: "effects",
        isActionCompatible: () => true,
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
        id: "arc:effect_amplifier_addition",
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
        id: "arc:effect_duration_multiplier",
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
        id: "arc:remove_effect",
        title: "Remove Effect",
        emoji: "❌💉",
        category: "effects",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:mob_effect_instance"),
        parameters: [],
    },
    cleanse_effects: {
        id: "arc:cleanse_effects",
        title: "Cleanse Effects",
        emoji: "🧼",
        category: "effects",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "remove_positive",
                types: [{ type: "boolean" }],
                required: true,
                description: "Whether to remove positive effects.",
            },
            {
                name: "remove_negative",
                types: [{ type: "boolean" }],
                required: true,
                description: "Whether to remove negative effects.",
            },
            {
                name: "remove_neutral",
                types: [{ type: "boolean" }],
                required: true,
                description: "Whether to remove neutral effects.",
            },
        ],
    },
    damage_multiplier: {
        id: "arc:damage_multiplier",
        title: "Damage Multiplier",
        emoji: "⚔️",
        category: "entities",
        isActionCompatible: (action: ActionType) =>
            action.id === "arc:on_get_hurt" ||
            action.id === "arc:on_hurt_player" ||
            action.id === "arc:on_hurt_entity",
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
        id: "arc:entity_on_fire",
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
        id: "arc:multiple_arrows",
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
    move_to_entity: {
        id: "arc:move_to_entity",
        title: "Move To Entity",
        emoji: "👤➡️",
        category: "entities",
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
    spawn_entity: {
        id: "arc:spawn_entity",
        title: "Spawn Entity",
        emoji: "🦕",
        category: "entities",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "entity_type",
                types: [{ type: "EntityType" }],
                required: true,
                description: "The entity type to spawn.",
            },
            {
                name: "count",
                types: [{ type: "int" }],
                required: false,
                default: 1,
                description: "The number of entities to spawn.",
            },
        ],
    },
    disarm_entity: {
        id: "arc:disarm_entity",
        title: "Disarm Entity",
        emoji: "✋❌",
        category: "entities",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:entity"),
        parameters: [
            {
                name: "item_target",
                types: [{ type: "ArcItemTarget" }],
                required: false,
                default: "MAIN_HAND",
                description: "The equipment slot to disarm.",
            },
            {
                name: "position_target",
                types: [{ type: "ArcPositionTarget" }],
                required: false,
                default: "ENTITY",
                description: "Where to drop the item.",
            },
        ],
    },
    freeze_entity: {
        id: "arc:freeze_entity",
        title: "Freeze Entity",
        emoji: "🧊",
        category: "entities",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:entity"),
        parameters: [
            {
                name: "duration",
                types: [{ type: "int" }],
                required: false,
                default: 100,
                description: "The duration to freeze for in ticks.",
            },
        ],
    },
    pull_entity: {
        id: "arc:pull_entity",
        title: "Pull Entity",
        emoji: "🧲",
        category: "entities",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:entity"),
        parameters: [
            {
                name: "force",
                types: [{ type: "double" }],
                required: false,
                default: 1.0,
                description: "The force to pull with.",
            },
        ],
    },
    push_entity: {
        id: "arc:push_entity",
        title: "Push Entity",
        emoji: "🌬️",
        category: "entities",
        isActionCompatible: (action: ActionType) =>
            action.producesData.includes("arc:entity"),
        parameters: [
            {
                name: "force",
                types: [{ type: "double" }],
                required: false,
                default: 1.0,
                description: "The force to push with.",
            },
        ],
    },
    exp: {
        id: "arc:exp",
        title: "Experience",
        emoji: "✨",
        category: "experience",
        isActionCompatible: () => true,
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
        id: "arc:exp_multiplier",
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
        id: "arc:drop_item",
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
        id: "arc:item",
        title: "Item",
        emoji: "🪙",
        category: "items",
        isActionCompatible: () => true,
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
        ],
    },
    give_recipes: {
        id: "arc:give_recipes",
        title: "Give Recipes",
        emoji: "📜",
        category: "items",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "recipes",
                types: [{ type: "Identifier[]" }],
                required: true,
                description: "The recipes to give.",
            },
        ],
    },
    repair_held_item: {
        id: "arc:repair_held_item",
        title: "Repair Held Item",
        emoji: "🔧",
        category: "items",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "amount",
                types: [{ type: "int" }],
                required: true,
                description: "The amount to repair.",
            },
            {
                name: "is_percentage",
                types: [{ type: "boolean" }],
                required: false,
                default: false,
                description: "Whether the amount is a percentage.",
            },
            {
                name: "hand",
                types: [{ type: "Hand" }],
                required: false,
                default: "MAIN_HAND",
                description: "The hand holding the item to repair.",
            },
        ],
    },
    repair_all_armor: {
        id: "arc:repair_all_armor",
        title: "Repair All Armor",
        emoji: "🛡️🔧",
        category: "items",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "amount",
                types: [{ type: "int" }],
                required: true,
                description: "The amount to repair.",
            },
            {
                name: "is_percentage",
                types: [{ type: "boolean" }],
                required: false,
                default: false,
                description: "Whether the amount is a percentage.",
            },
        ],
    },
    smelt_inventory: {
        id: "arc:smelt_inventory",
        title: "Smelt Inventory",
        emoji: "🔥🎒",
        category: "items",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "recipes",
                types: [{ type: "Identifier[]" }],
                required: false,
                default: [],
                description: "Specific recipes to smelt (empty for all).",
            },
        ],
    },
    enchant_item: {
        id: "arc:enchant_item",
        title: "Enchant Item",
        emoji: "✨🗡️",
        category: "items",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "enchantments",
                types: [{ type: "ArcEnchantment[]" }],
                required: true,
                description: "The enchantments to apply.",
            },
            {
                name: "target",
                types: [{ type: "ArcItemTarget" }],
                required: true,
                description: "The target item slot.",
            },
        ],
    },
    attack_speed_multiplier: {
        id: "arc:attack_speed_multiplier",
        title: "Attack Speed Multiplier",
        emoji: "⚡",
        category: "players",
        isActionCompatible: (action: ActionType) =>
            action.id === "arc:on_get_attack_speed",
        parameters: [
            {
                name: "multiplier",
                types: [{ type: "float" }],
                required: true,
                description: "The multiplier for the attack speed.",
            },
        ],
    },
    heal: {
        id: "arc:heal",
        title: "Heal",
        emoji: "❤️",
        category: "players",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "amount",
                types: [{ type: "float" }],
                required: true,
                description: "The amount to heal.",
            },
            {
                name: "is_percentage",
                types: [{ type: "boolean" }],
                required: false,
                default: false,
                description: "Whether the amount is a percentage.",
            },
        ],
    },
    feed: {
        id: "arc:feed",
        title: "Feed",
        emoji: "🍗",
        category: "players",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "food_level",
                types: [{ type: "int" }],
                required: false,
                default: 0,
                description: "The amount of food level to restore.",
            },
            {
                name: "saturation",
                types: [{ type: "float" }],
                required: false,
                default: 0.0,
                description: "The amount of saturation to restore.",
            },
        ],
    },
    launch_player: {
        id: "arc:launch_player",
        title: "Launch Player",
        emoji: "🚀",
        category: "players",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "x",
                types: [{ type: "float" }],
                required: false,
                default: 0.0,
                description: "Force in X direction.",
            },
            {
                name: "y",
                types: [{ type: "float" }],
                required: false,
                default: 0.0,
                description: "Force in Y direction.",
            },
            {
                name: "z",
                types: [{ type: "float" }],
                required: false,
                default: 0.0,
                description: "Force in Z direction.",
            },
        ],
    },
    teleport_player: {
        id: "arc:teleport_player",
        title: "Teleport Player",
        emoji: "🌌",
        category: "players",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "radius",
                types: [{ type: "int" }],
                required: true,
                description: "Radius to teleport within.",
            },
        ],
    },
    command: {
        id: "arc:command",
        title: "Command",
        emoji: "💻",
        category: "server",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "command",
                types: [{ type: "string" }],
                required: true,
                description: "The command to execute.",
            },
        ],
    },
    create_explosion: {
        id: "arc:create_explosion",
        title: "Create Explosion",
        emoji: "💣",
        category: "world",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "radius",
                types: [{ type: "float" }],
                required: true,
                description: "The explosion radius.",
            },
            {
                name: "causes_fire",
                types: [{ type: "boolean" }],
                required: false,
                default: false,
                description: "Whether it causes fire.",
            },
            {
                name: "block_interaction",
                types: [{ type: "ExplosionInteraction" }],
                required: false,
                default: "NONE",
                description: "How blocks interact (NONE, BREAK, DESTROY).",
            },
        ],
    },
    set_block: {
        id: "arc:set_block",
        title: "Set Block",
        emoji: "🧱",
        category: "world",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "block",
                types: [{ type: "ArcBlockState" }],
                required: true,
                description: "The block state to set.",
            },
        ],
    },
    strike_lightning: {
        id: "arc:strike_lightning",
        title: "Strike Lightning",
        emoji: "⚡",
        category: "world",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "position",
                types: [{ type: "ArcPositionTarget" }],
                required: true,
                description: "Where to strike lightning.",
            },
            {
                name: "visual_only",
                types: [{ type: "boolean" }],
                required: false,
                default: false,
                description: "Whether the lightning is visual only.",
            },
        ],
    },
    change_weather: {
        id: "arc:change_weather",
        title: "Change Weather",
        emoji: "☀️",
        category: "world",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "weather",
                types: [{ type: "ArcWeatherType" }],
                required: true,
                description: "The weather type (CLEAR, RAIN, THUNDER).",
            },
            {
                name: "duration",
                types: [{ type: "int" }],
                required: false,
                default: 6000,
                description: "Duration in ticks.",
            },
        ],
    },
    change_time: {
        id: "arc:change_time",
        title: "Change Time",
        emoji: "⏰",
        category: "world",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "time",
                types: [{ type: "int" }],
                required: true,
                description: "The time value.",
            },
            {
                name: "add",
                types: [{ type: "boolean" }],
                required: false,
                default: false,
                description:
                    "Whether to add to current time instead of setting.",
            },
        ],
    },
    play_sound: {
        id: "arc:play_sound",
        title: "Play Sound",
        emoji: "🎵",
        category: "world",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "sound",
                types: [{ type: "SoundEvent" }],
                required: true,
                description: "The sound event.",
            },
            {
                name: "volume",
                types: [{ type: "float" }],
                required: false,
                default: 1.0,
                description: "Volume.",
            },
            {
                name: "pitch",
                types: [{ type: "float" }],
                required: false,
                default: 1.0,
                description: "Pitch.",
            },
            {
                name: "position",
                types: [{ type: "ArcPositionTarget" }],
                required: false,
                default: "PLAYER",
                description: "Sound source position.",
            },
            {
                name: "sound_source",
                types: [{ type: "SoundSource" }],
                required: false,
                default: "PLAYERS",
                description: "The sound source category.",
            },
        ],
    },
    // JobsPlus Rewards
    job_exp: {
        id: "jobsplus:job_exp",
        title: "Job Exp",
        emoji: "💼",
        category: "jobsplus",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "min",
                types: [{ type: "double" }],
                required: true,
                description: "Minimum job experience.",
            },
            {
                name: "max",
                types: [{ type: "double" }],
                required: true,
                description: "Maximum job experience.",
            },
        ],
    },
    job_exp_multiplier: {
        id: "jobsplus:job_exp_multiplier",
        title: "Job Exp Multiplier",
        emoji: "💼✖️",
        category: "jobsplus",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "job",
                types: [{ type: "Identifier" }],
                required: true,
                description: "The job ID to multiply experience for.",
            },
            {
                name: "multiplier",
                types: [{ type: "double" }],
                required: true,
                description: "The multiplier.",
            },
        ],
    },
    job_coin: {
        id: "jobsplus:job_coin",
        title: "Job Coin",
        emoji: "🪙",
        category: "jobsplus",
        isActionCompatible: () => true,
        parameters: [
            {
                name: "amount",
                types: [{ type: "double" }],
                required: true,
                description: "Amount of coins.",
            },
        ],
    },
} as const;

export type RewardTypesKeys = keyof typeof rewardTypesDefinition;

export type RewardTypes = {
    [key in RewardTypesKeys]: RewardType;
};

export const rewardTypes: RewardTypes = rewardTypesDefinition;
