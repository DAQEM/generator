import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    fetchMinecraftItems,
    fetchMinecraftLanguage,
    getItemName,
} from "@/lib/mc-data";
import { cn } from "@/lib/utils";
import { DeepslateItem } from "./deepslate-item";

interface ItemPickerProps {
    value?: string;
    onChange: (value: string) => void;
    className?: string;
}

export function ItemPicker({ value, onChange, className }: ItemPickerProps) {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");

    // Fetch items
    const { data: items = [], isLoading: isLoadingItems } = useQuery({
        queryKey: ["minecraft-items"],
        queryFn: fetchMinecraftItems,
        staleTime: Infinity,
    });

    // Fetch language
    const { data: language = {} } = useQuery({
        queryKey: ["minecraft-language"],
        queryFn: fetchMinecraftLanguage,
        staleTime: Infinity,
    });

    const filteredItems = React.useMemo(() => {
        if (!search) return items;
        const lowerSearch = search.toLowerCase();

        return items
            .filter((item) => {
                const name = getItemName(item, language).toLowerCase();
                const id = item.replace("minecraft:", "");
                return name.includes(lowerSearch) || id.includes(lowerSearch);
            })
            .sort((a, b) => {
                const nameA = getItemName(a, language).toLowerCase();
                const nameB = getItemName(b, language).toLowerCase();
                const idA = a.replace("minecraft:", "");
                const idB = b.replace("minecraft:", "");

                // 1. Exact Name match
                if (nameA === lowerSearch) return -1;
                if (nameB === lowerSearch) return 1;

                // 2. Exact ID match
                if (idA === lowerSearch) return -1;
                if (idB === lowerSearch) return 1;

                // 3. Name starts with
                const nameAStarts = nameA.startsWith(lowerSearch);
                const nameBStarts = nameB.startsWith(lowerSearch);
                if (nameAStarts && !nameBStarts) return -1;
                if (!nameAStarts && nameBStarts) return 1;

                // 4. ID starts with
                const idAStarts = idA.startsWith(lowerSearch);
                const idBStarts = idB.startsWith(lowerSearch);
                if (idAStarts && !idBStarts) return -1;
                if (!idAStarts && idBStarts) return 1;

                // 5. Shortest Name wins (usually more relevant)
                if (nameA.length !== nameB.length)
                    return nameA.length - nameB.length;

                // 6. Alphabetical
                return nameA.localeCompare(nameB);
            });
    }, [items, search, language]);

    const displayItems = filteredItems.slice(0, 50);

    return (
        <Popover open={open} onOpenChange={setOpen} modal={true}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("w-full justify-between", className)}
                >
                    <div className="flex items-center gap-2 overflow-hidden">
                        {value ? (
                            <>
                                <div className="h-4 w-4 shrink-0">
                                    <DeepslateItem
                                        id={value}
                                        className="h-4 w-4"
                                    />
                                </div>
                                <span className="truncate">
                                    {getItemName(value, language)}
                                </span>
                            </>
                        ) : (
                            <span className="text-muted-foreground">
                                Select item...
                            </span>
                        )}
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-90 p-0">
                <Command shouldFilter={false} className="h-auto">
                    <CommandInput
                        placeholder="Search item..."
                        value={search}
                        onValueChange={setSearch}
                    />
                    <CommandList>
                        <CommandEmpty>
                            {isLoadingItems
                                ? "Loading items..."
                                : "No item found."}
                        </CommandEmpty>
                        <CommandGroup>
                            {displayItems.map((item) => (
                                <CommandItem
                                    key={item}
                                    value={item}
                                    onSelect={(currentValue) => {
                                        onChange(currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 size-5",
                                            value === item
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    <div className="mr-2 size-6 shrink-0">
                                        <DeepslateItem
                                            id={item}
                                            className="size-6"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span>
                                            {getItemName(item, language)}
                                        </span>
                                        {/* Optional: Show ID in small text if searching by ID or for clarity */}
                                        <span className="text-xs text-muted-foreground font-mono">
                                            {item}
                                        </span>
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
