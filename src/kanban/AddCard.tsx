import React from "react";

export default function AddCard({addCard}:{addCard: (title:string) => void} )
{
    const [title, setTitle] = React.useState<string>("");
    return (
        <div>
            <span>Card Title:</span>&nbsp;&nbsp;&nbsp;
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
            />
            <button
                onClick={()=>{
                    // setTitle("");
                    addCard(title);
                }}
            >
                Add Card
            </button>
        </div>
    );
}