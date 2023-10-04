import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export const TodoList = ({ list,removeTodo,editTodo}) => {

    return (
        <>
            <h2 className="text-center">My List</h2>

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