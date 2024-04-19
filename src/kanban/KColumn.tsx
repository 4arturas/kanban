import {Card, Parent} from "./types.ts";
import React from "react";
import {useDroppable} from "@dnd-kit/core";
import {KCard} from "./KCard.tsx";

type Props = {
    id: Parent,
    cards: Card[]
};

export const KColumn : React.FC<Props> = ({id, cards}) =>
{
    const { setNodeRef } = useDroppable({
        id: id
    });

    const style = {
        verticalAlign: "top"
    };

    return (
        <td
            ref={setNodeRef}
            style={style}
        >
            {cards.map( (card, idx) => {
                return <KCard title={card.title} parent={id} idx={idx} />
            })}
        </td>
    )
}