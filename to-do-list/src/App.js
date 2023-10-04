import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { TodoList } from './components/TodoList';
import './App.css';

const getLocalStorage = () => {
  let list = localStorage.getItem('key');
  if (list) {
    return JSON.parse(localStorage.getItem('key'));
  } else {
    return [];
  }
};

function App() {
  const [title, setTitle] = useState('');
  const [list, setList] = useState(getLocalStorage);
  const [edit, setEdit] = useState(false);
  const [editId, setEditid] = useState(null);

  useEffect(() => {
    localStorage.setItem('key', JSON.stringify(list));
  }, [list]);

  const todoSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      console.log('Field Required!');
    } else if (edit) {
      setList((prevList) =>
        prevList.map((item) => {
          if (item.id === editId) {
            return { ...item, todo: title };
          }
          return item;
        })
      );
      setTitle('');
      setEdit(false);
      setEditid(null);
    } else {
      const newList = { id: Date.now(), todo: title };
      setList([...list, newList]);
      setTitle('');
    }
  };

  const removeTodo = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  const editTodo = (id) => {
    setEdit(true);
    const editItem = list.find((item) => item.id === id);
    setTitle(editItem.todo);
    setEditid(editItem.id);
  };

  return (
    <Container className="mt-5 p-5 border border-primary bg-lightblue">
      <Row>
        <Col md={6} className="mx-auto">
          <h1 className="p-1 text-maroon text-strong text-center mb-4 border border-rounded border-dark bg-light"><strong>To-Do App</strong></h1>
          <Form onSubmit={todoSubmit}>
            <Form.Group className="m-2">
              <Form.Control
                type="text"
                placeholder="Add a task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Button variant={edit ? 'warning' : 'primary'} type="submit">
              {edit ? 'Edit' : 'Add Task'}
            </Button>
          </Form>
          <TodoList list={list} removeTodo={removeTodo} editTodo={editTodo} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
