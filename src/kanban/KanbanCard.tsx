import {useDraggable} from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities"
import {Parent} from "./types.ts";
export const KanbanCard = ({
                        title,
                        index,
                        parent,
                    }: {
    title: string;
    index: number;
    parent: Parent;
}) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: title,
        data: {
            title,
            index,
            parent,
        },
    });
    const style = {
        transform: CSS.Translate.toString(transform),
        border: '2px solid red',
        marginTop: '5px',
        padding: '5px'
    };
    return (
        <div
            style={style}

            {...listeners}
            {...attributes}
            ref={setNodeRef}
        >
            <div>{title}</div>
        </div>
    );
};