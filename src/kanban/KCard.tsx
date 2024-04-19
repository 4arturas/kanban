import {Parent} from "./types.ts";
import React from "react";
import {useDraggable} from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities";

type Props = {
    title: string
    parent: Parent
    idx: number
}

export const KCard : React.FC<Props> = ({title, parent, idx}) =>
{
    const { setNodeRef, attributes, listeners, transform } = useDraggable({
        id: title,
        data: {
            id: title,
            parent: parent,
            idx: idx
        }
    });

    const style = {
        transform: CSS.Transform.toString( transform ),
        border: "2px solid red",
        maxWidth: "100px",
        maxHeight: "25px"
    };

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
        >
            {title}
        </div>
    );

}