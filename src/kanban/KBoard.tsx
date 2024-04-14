import {DndContext, DragEndEvent} from "@dnd-kit/core";
import {KColumn} from "./KColumn.tsx";
import {Card, Parent} from "./types.ts";
import React from "react";

export const KBoard = () =>
{
    const [title, setTitle] = React.useState<string>("");
    const [backlog, setBacklog] = React.useState<Card[]>([]);
    const [todo, setTodo] = React.useState<Card[]>([]);
    const [progress, setProgress] = React.useState<Card[]>([]);
    const [done, setDone] = React.useState<Card[]>([]);
    const onDragEnd = (e: DragEndEvent) =>
    {
        const container = e.over?.id;
        const title = e.active.data.current?.title ?? "";
        const idx = e.active.data.current?.idx ?? 0;
        const parent = e.active.data.current?.parent ?? Parent.ToDo;

        console.log( 'container', container );
        console.log( 'parent', parent );

        switch ( container )
        {
            case Parent.Backlog:
                setBacklog( [...backlog, {title} ] );
                break;
            case Parent.ToDo:
                setTodo([...todo, {title} ] );
                break;
            case Parent.InProgress:
                setProgress([...progress, {title} ] );
                break;
            case Parent.Done:
                setDone([...done, {title} ] );
                break;
        }
        switch ( parent )
        {
            case Parent.Backlog:
                setBacklog( [ ...backlog.slice(0, idx), ...backlog.slice(idx+1) ] );
                break;
            case Parent.ToDo:
                setBacklog( [ ...todo.slice(0, idx), ...todo.slice(idx+1) ] );
                break;
            case Parent.InProgress:
                setProgress( [ ...progress.slice(0, idx), ...progress.slice(idx+1) ] );
                break;
            case Parent.Done:
                setDone( [ ...done.slice(0, idx), ...done.slice(idx+1) ] );
                break;
        }
    }
    return (
        <DndContext onDragEnd={onDragEnd}>
            <input
                onChange={(e)=>setTitle(e.target.value)}
            />
            <button
                onClick={()=>setBacklog([...backlog, {title}])}
            >
                Add
            </button>
        <table border={1}>
            <thead>
                <tr>
                    <th>{Parent.Backlog}</th>
                    <th>{Parent.ToDo}</th>
                    <th>{Parent.InProgress}</th>
                    <th>{Parent.Done}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <KColumn id={Parent.Backlog} items={backlog} />
                    <KColumn id={Parent.ToDo} items={todo} />
                    <KColumn id={Parent.InProgress} items={progress} />
                    <KColumn id={Parent.Done} items={done} />
                </tr>
            </tbody>
        </table>
        </DndContext>
    );
}