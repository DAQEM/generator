import { rendererService } from "@/lib/deepslate";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface DeepslateItemProps extends React.HTMLAttributes<HTMLDivElement> {
    id: string;
}

const iconCache = new Map<string, string>();

export function DeepslateItem({ id, className, ...props }: DeepslateItemProps) {
    const [src, setSrc] = useState<string>(iconCache.get(id) || "");
    const [loading, setLoading] = useState(!src);

    useEffect(() => {
        if (iconCache.has(id)) {
            setSrc(iconCache.get(id)!);
            setLoading(false);
            return;
        }

        let mounted = true;
        setLoading(true);

        rendererService.render(id).then((url) => {
            if (mounted) {
                if (url) {
                    iconCache.set(id, url);
                    setSrc(url);
                }
                setLoading(false);
            }
        });

        return () => {
            mounted = false;
        };
    }, [id]);

    return (
        <div
            className={cn(
                "relative flex items-center justify-center",
                className
            )}
            {...props}
        >
            {loading && (
                <div className="absolute inset-0 animate-pulse bg-neutral-200 rounded" />
            )}
            {src ? (
                <img
                    src={src}
                    alt={id}
                    className="w-full h-full object-contain pixelated"
                />
            ) : (
                !loading && <div className="text-xs text-neutral-400">?</div>
            )}
        </div>
    );
}
