"use client";

import type { ButtonProps } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useForwardedRef } from "@/lib/use-forwarded-ref";
import { cn } from "@/lib/utils";
import { forwardRef, useMemo, useState } from "react";
import { HexColorPicker } from "react-colorful";

interface ColorPickerProps {
    value: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
}

const ColorPicker = forwardRef<
    HTMLInputElement,
    Omit<ButtonProps, "value" | "onChange" | "onBlur"> & ColorPickerProps
>(
    (
        { disabled, value, onChange, onBlur, name, className, size, ...props },
        forwardedRef,
    ) => {
        const ref = useForwardedRef(forwardedRef);
        const [open, setOpen] = useState(false);

        const parsedValue = useMemo(() => {
            return value || "#FFFFFF";
        }, [value]);

        return (
            <Popover onOpenChange={setOpen} open={open}>
                <PopoverTrigger asChild disabled={disabled} onBlur={onBlur}>
                    <Button
                        {...props}
                        className={cn("block", className)}
                        name={name}
                        onClick={() => {
                            setOpen(true);
                        }}
                        size={size}
                        style={{
                            backgroundColor: parsedValue,
                        }}
                        variant="outline"
                    >
                        <div />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full">
                    <div className="flex flex-col items-center gap-4">
                        <HexColorPicker
                            className="w-full! *:rounded-none!"
                            color={parsedValue}
                            onChange={onChange}
                        />
                        <div className="w-full">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">
                                    Hex Code
                                </span>
                            </div>
                            <Input
                                maxLength={7}
                                onChange={(e) => {
                                    onChange(e?.currentTarget?.value);
                                }}
                                ref={ref}
                                value={parsedValue}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">
                                    Minecraft Colors
                                </span>
                            </div>
                            <div className="grid grid-cols-8 gap-1">
                                {[
                                    "#000000",
                                    "#0000AA",
                                    "#00AA00",
                                    "#00AAAA",
                                    "#AA0000",
                                    "#AA00AA",
                                    "#FFAA00",
                                    "#AAAAAA",
                                    "#555555",
                                    "#5555FF",
                                    "#55FF55",
                                    "#55FFFF",
                                    "#FF5555",
                                    "#FF55FF",
                                    "#FFFF55",
                                    "#FFFFFF",
                                ].map((color) => (
                                    <div
                                        key={color}
                                        className="h-6 w-6 cursor-pointer rounded-md border border-neutral-200"
                                        onClick={() => onChange(color)}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        );
    },
);
ColorPicker.displayName = "ColorPicker";

export { ColorPicker };

