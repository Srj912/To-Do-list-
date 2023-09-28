import React,{useState} from 'react';
import { TodoList } from './components/TodoList';
import './App.css';

function App() {
  const [title,setTitle]=useState()  
  const [list,setList]=useState([])
  const [edit,setEdit]=useState(false)
  const [editId,setEditid]=useState(null)
  const todoSubmit = (e) => {
    e.preventDefault()
    if(!title){
      console.log("Field Required!")
    }

    else if(edit){
      setList(list.map((item)=>{
        if(item.id==editId){
          return({...item,todo:title})
        }
        setEdit=false
        return item
      }))
    }


    else{
      const newList={id:Date.now(),todo:title}
      setList([...list,newList])
      setTitle(' ') 
    }
  }

  const removeTodo=(id)=>{
    setList(list.filter((item)=>item.id !== id))
  }
  const editTodo=(id)=>{
    setEdit(true)
    const editItem=list.find((item)=>item.id===id)
    setTitle(editItem.todo)
    setEditid(editItem.id)
  }

  return (
    <>
      <form>
        <input value={title} onChange={(e)=>setTitle(e.target.value)}></input>
        <button type="submit" onClick={(e)=>todoSubmit(e)}>{edit?"Edit":"Submit"}</button> 
      </form>
      <TodoList list={list} removeTodo={removeTodo} editTodo={editTodo}/>
    </>
  );
}

export default App;
