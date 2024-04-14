import React from "react";
import {useDroppable} from "@dnd-kit/core";
import {Card, Parent} from "./types.ts";
import {KCard} from "./KCard.tsx";

type Props = {
    id: Parent
    items: Card[]
};

export const KColumn : React.FC<Props> = ({ id, items } ) =>
{
    const { setNodeRef } = useDroppable({
        id: id
    })
    return (
        <td
            ref={setNodeRef}
            style={{minWidth: '300px', minHeight: '200px'}}
        >
            { items.map( ( item: Card, idx: number ) => {
                return <KCard key={idx} idx={idx} parent={id} title={item.title} />;
            })}
        </td>
    )
}