import {useState} from "react";
import {DndContext, rectIntersection} from "@dnd-kit/core";
import AddCard from "./AddCard.tsx";
import KanbanLane from "./KanbanLane.tsx";
import {Card, Parent} from "./types.ts";

export default function KanbanBoard() {
    const [todoItems, setTodoItems] = useState<Array<Card>>([]);
    const [doneItems, setDoneItems] = useState<Array<Card>>([]);
    const [inProgressItems, setInProgressItems] = useState<Array<Card>>([]);
    const [uItems, setuItems] = useState<Array<Card>>([]);
    const addNewCard = (title: string) => {
        setuItems([...uItems, {title}]);
    };
    return (
        <DndContext
            collisionDetection={rectIntersection}
            onDragEnd={(e) => {
                const container = e.over?.id;
                const title = e.active.data.current?.title ?? "";
                const index = e.active.data.current?.index ?? 0;
                const parent = e.active.data.current?.parent ?? "ToDo";

                console.log( e.active.data );
                console.log( e.active.data.current );
                console.log( 'container', container );
                console.log( 'title', title );
                console.log( 'parent', parent );

                if (container === Parent.ToDo) {
                    setTodoItems([...todoItems, {title}]);
                } else if (container === Parent.Done) {
                    setDoneItems([...doneItems, {title}]);
                } else if (container === Parent.Backlog) {
                    setuItems([...uItems, {title}]);
                } else {
                    setInProgressItems([...inProgressItems, {title}]);
                }
                if (parent === Parent.ToDo) {
                    setTodoItems([
                        ...todoItems.slice(0, index),
                        ...todoItems.slice(index + 1),
                    ]);
                } else if (parent === Parent.Done) {
                    setDoneItems([
                        ...doneItems.slice(0, index),
                        ...doneItems.slice(index + 1),
                    ]);
                } else if (parent === Parent.Backlog) {
                    setuItems([...uItems.slice(0, index), ...uItems.slice(index + 1)]);
                } else {
                    setInProgressItems([
                        ...inProgressItems.slice(0, index),
                        ...inProgressItems.slice(index + 1),
                    ]);
                }
            }}
        >
            <div>
                <table border={1}>
                    <thead>
                        <tr>
                            <th colSpan={4} style={{padding: "5px", textAlign: "left"}}>
                                <AddCard addCard={addNewCard}/>
                            </th>
                        </tr>
                        <tr>
                            <th>Backlog</th>
                            <th>To Do</th>
                            <th>In Progress</th>
                            <th>Done</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <KanbanLane parent={Parent.Backlog} items={uItems}/>
                            <KanbanLane parent={Parent.ToDo} items={todoItems}/>
                            <KanbanLane parent={Parent.InProgress} items={inProgressItems}/>
                            <KanbanLane parent={Parent.Done} items={doneItems}/>
                        </tr>
                    </tbody>
                </table>
            </div>
        </DndContext>
    );
}