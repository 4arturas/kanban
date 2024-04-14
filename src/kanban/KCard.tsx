import {Parent} from "./types.ts";
import {useDraggable} from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities"
import React from "react";

type Props =
{
    title: string,
    parent: Parent
    idx: number
}
export const KCard: React.FC<Props> = ({ title, parent, idx } ) =>
{
    const { setNodeRef, listeners, attributes, transform} = useDraggable({
        id: title,
        data: {
            title: title,
            idx: idx,
            parent: parent
        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        border: "1px solid red",
        padding: "3px"
    };

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
        >
            {title}
        </div>
    );
}