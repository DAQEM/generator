import { conditionTypes } from "@/lib/data";
import type { JobCondition } from "@/types";
import _ from "lodash";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { ItemPicker } from "../ui/item-picker";
import { Label } from "../ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
type Props = {
    condition: JobCondition;
    onRemoveCondition: (conditionId: string) => void;
    onUpdateCondition: (
        conditionId: string,
        data: Partial<JobCondition>
    ) => void;
};
const AdvancedConditionCard = ({
    condition,
    onRemoveCondition,
    onUpdateCondition,
}: Props) => {
    const conditionType = conditionTypes[condition.type];
    const handleChange = (key: string, value: any) => {
        onUpdateCondition(condition.id, {
            data: { ...condition.data, [key]: value },
        });
    };

    return (
        <Card className="w-full relative">
            <CardHeader>
                <div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => onRemoveCondition(condition.id)}
                    >
                        <X />
                    </Button>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center justify-center">
                        <p className="text-2xl">{conditionType.emoji}</p>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-xl font-bold whitespace-pre-wrap">
                            {conditionType.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {conditionType.parameters.length === 0
                                ? "No configuration required."
                                : "Configure the parameters below."}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                    <Switch
                        id={`inverted-${condition.id}`}
                        checked={!!condition.inverted}
                        onCheckedChange={(checked) =>
                            onUpdateCondition(condition.id, {
                                inverted: checked,
                            })
                        }
                    />
                    <Label htmlFor={`inverted-${condition.id}`}>
                        Invert Condition
                    </Label>
                </div>
            </CardHeader>
            {conditionType.parameters.length > 0 && (
                <CardContent className="grid gap-4">
                    {conditionType.parameters.map((param) => {
                        const value =
                            condition.data[param.name] ?? param.default ?? "";

                        const primaryType = param.types[0].type;

                        return (
                            <div
                                key={param.name}
                                className="grid w-full items-center gap-2"
                            >
                                <Label
                                    htmlFor={`${condition.id}-${param.name}`}
                                >
                                    {_.startCase(param.name)}
                                    {param.required && (
                                        <span className="text-destructive ml-1">
                                            *
                                        </span>
                                    )}
                                </Label>

                                {/* Block Picker */}
                                {primaryType === "Block" && (
                                    <ItemPicker
                                        type="block"
                                        value={value}
                                        onChange={(val) =>
                                            handleChange(param.name, val)
                                        }
                                    />
                                )}

                                {/* Item Picker */}
                                {primaryType === "Item" && (
                                    <ItemPicker
                                        type="item"
                                        value={value}
                                        onChange={(val) =>
                                            handleChange(param.name, val)
                                        }
                                    />
                                )}

                                {/* Numeric Inputs */}
                                {(primaryType === "int" ||
                                    primaryType === "float" ||
                                    primaryType === "double" ||
                                    primaryType === "long") && (
                                    <Input
                                        id={`${condition.id}-${param.name}`}
                                        type="number"
                                        step={
                                            primaryType === "int" ||
                                            primaryType === "long"
                                                ? "1"
                                                : "any"
                                        }
                                        placeholder={param.description}
                                        value={value}
                                        onChange={(e) =>
                                            handleChange(
                                                param.name,
                                                e.target.value
                                                    ? Number(e.target.value)
                                                    : ""
                                            )
                                        }
                                    />
                                )}

                                {/* Boolean Input */}
                                {primaryType === "boolean" && (
                                    <Select
                                        value={String(value)}
                                        onValueChange={(val) =>
                                            handleChange(
                                                param.name,
                                                val === "true"
                                            )
                                        }
                                    >
                                        <SelectTrigger
                                            id={`${condition.id}-${param.name}`}
                                        >
                                            <SelectValue placeholder="Select..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="true">
                                                True
                                            </SelectItem>
                                            <SelectItem value="false">
                                                False
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}

                                {/* Hand Selector */}
                                {primaryType === "Hand" && (
                                    <Select
                                        value={
                                            value === "null" || !value
                                                ? "null"
                                                : value
                                        }
                                        onValueChange={(val) =>
                                            handleChange(
                                                param.name,
                                                val === "null" ? null : val
                                            )
                                        }
                                    >
                                        <SelectTrigger
                                            id={`${condition.id}-${param.name}`}
                                        >
                                            <SelectValue placeholder="Select hand..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="null">
                                                Any / Both
                                            </SelectItem>
                                            <SelectItem value="MAIN_HAND">
                                                Main Hand
                                            </SelectItem>
                                            <SelectItem value="OFF_HAND">
                                                Off Hand
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}

                                {/* Generic String Input */}
                                {primaryType === "string" && (
                                    <Input
                                        id={`${condition.id}-${param.name}`}
                                        type="text"
                                        placeholder={param.description}
                                        value={value}
                                        onChange={(e) =>
                                            handleChange(
                                                param.name,
                                                e.target.value
                                            )
                                        }
                                    />
                                )}

                                {/* Arrays / Fallback */}
                                {(primaryType.endsWith("[]") ||
                                    ![
                                        "Block",
                                        "Item",
                                        "int",
                                        "float",
                                        "double",
                                        "long",
                                        "boolean",
                                        "string",
                                        "Hand",
                                    ].includes(primaryType)) && (
                                    <Textarea
                                        id={`${condition.id}-${param.name}`}
                                        placeholder={
                                            primaryType.endsWith("[]")
                                                ? "Comma separated values..."
                                                : param.description
                                        }
                                        value={
                                            Array.isArray(value)
                                                ? value.join(", ")
                                                : value
                                        }
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            // Simple CSV split for arrays
                                            if (primaryType.endsWith("[]")) {
                                                handleChange(
                                                    param.name,
                                                    val
                                                        .split(",")
                                                        .map((s) => s.trim())
                                                );
                                            } else {
                                                handleChange(param.name, val);
                                            }
                                        }}
                                    />
                                )}
                                <p className="text-xs text-muted-foreground">
                                    {param.description}
                                </p>
                            </div>
                        );
                    })}
                </CardContent>
            )}
        </Card>
    );
};
export default AdvancedConditionCard;
