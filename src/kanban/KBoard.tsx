import React from "react";
import {Card, Parent} from "./types.ts";
import {KColumn} from "./KColumn.tsx";
import {DndContext, DragEndEvent} from "@dnd-kit/core";

export const KBoard = () =>
{
    const [title, setTitle] = React.useState<string>("");
    const [backlog, setBacklog] = React.useState<Card[]>([]);
    const [todo, setTodo] = React.useState<Card[]>([]);

    const onDragEnd = (e:DragEndEvent) =>
    {
        const container = e.over?.id;
        const title = e.active.data.current?.id ?? "";
        const parent = e.active.data.current?.parent ?? Parent.ToDo;
        const idx = e.active.data.current?.idx ?? 0;

        switch ( container )
        {
            case Parent.ToDo:
                setTodo( [...todo, {title}] );
                break;
            default:
                setBacklog([...backlog, {title}] );
        }

        switch ( parent )
        {
            case Parent.ToDo:
                setTodo([...todo.slice(0, idx), ...todo.slice(idx + 1)]);
                break;
            default:
                setBacklog([...backlog.slice(0, idx), ...backlog.slice(idx + 1)]);
                break;
        }
    }

    return (
        <table border={1}>
            <thead>
                <tr>
                    <td colSpan={2}>
                        <input
                            onChange={(e)=>setTitle(e.target.value)}
                        />
                        <button
                            onClick={()=>setBacklog([...backlog, {title}])}>
                            Add
                        </button>
                    </td>
                </tr>
                <tr>
                    <th>{Parent.Backlog}</th>
                    <th>{Parent.ToDo}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <DndContext onDragEnd={onDragEnd}>
                        <KColumn key={1} id={Parent.Backlog} cards={backlog} />
                        <KColumn key={2} id={Parent.ToDo} cards={todo} />
                    </DndContext>
                </tr>
            </tbody>
        </table>
    );
}