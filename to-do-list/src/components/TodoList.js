import React from "react";

export const TodoList = ({ list,removeTodo,editTodo}) => {

    return (
        <>
            <h2>My List</h2>

            {list.map((item) => {
                const { id, todo } = item
                return (
                    <div key={id}>
                        <span>{todo}</span>
                        <button onClick={()=>editTodo(id)}>Edit</button>
                        <button onClick={()=>removeTodo(id)}>Remove</button>
                    </div>
                )
            })}
        </>
    )
}