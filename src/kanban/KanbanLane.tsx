import {useDroppable} from "@dnd-kit/core";
import {KanbanCard} from "./KanbanCard.tsx";
import {Card, Parent} from "./types.ts";
interface KanbanLaneProps {
    parent: Parent;
    items: Card[];
}

export default function KanbanLane({ parent, items }: KanbanLaneProps) {
    const { setNodeRef } = useDroppable({
        id: parent,
    });
    return (
            <td
                ref={setNodeRef}
                style={{verticalAlign:"top", width: "300px",padding: "5px"}}
            >
                {items.map(({ title: cardTitle }, key) => (
                    <KanbanCard title={cardTitle} key={key} index={key} parent={parent} />
                ))}
            </td>
    );
}