import NewTaskForm from './NewTaskForm';
import TaskList from './TaskList';
import Footer from './Footer';
import React, { useEffect, useRef, useState } from 'react';

const App = () => {
    const [todoData, setTodoData] = useState([]);
    const timerRef = useRef(null);
    const id = useRef(0);

    function createTodoItem(label, min, sec) {
        return {
            label,
            important: false,
            id: id.current++,
            done: false,
            visible: true,
            createDate: new Date(),
            editing: false,
            timer: min * 60 + Number(sec),
            paused: true
        };
    }

    useEffect(() => {
        if (timerRef.current === null && todoData.findIndex((e) => !e.paused) > -1) {
            timerRef.current = setTimeout(tick, 1000);
        }
    });

    const toggleTimer = (id, paused) => {
        setTodoData((todoData) =>
            todoData.map((e) => {
                if (e.id === id) e.paused = paused;
                return e;
            })
        );
    };

    const tick = () => {
        if (timerRef.current === null) return;

        setTodoData((data) =>
            data.map((e) => {
                if (e.timer === 0) e.paused = true;
                else if (!e.done && !e.paused) e.timer--;
                return e;
            })
        );

        timerRef.current = null;
    };

    const clearCompleted = () => {
        setTodoData((data) => data.filter((e) => !e.done));
    };

    const setVisibility = (flag) => {
        setTodoData((todoData) =>
            todoData.map((e) => {
                e.visible = typeof flag === 'undefined' || e.done === flag;
                return e;
            })
        );
    };

    const deleteItem = (id) => {
        setTodoData((todoData) => todoData.filter((e) => e.id !== id));
    };

    const addItem = (text, min, sec) => {
        const newItem = createTodoItem(text, min, sec);
        setTodoData((todoData) => [...todoData, newItem]);
    };

    const editItem = (id, text) => {
        setTodoData((todoData) =>
            todoData.map((element) => {
                if (element.id === id) element.label = text;
                return element;
            })
        );
    };

    const onToggleEditing = (id) => {
        setTodoData((todoData) =>
            todoData.map((element) => {
                if (element.id === id) element.editing = !element.editing;
                return element;
            })
        );
    };

    const onToggleDone = (id) => {
        setTodoData((todoData) =>
            todoData.map((element) => {
                if (element.id === id) {
                    element.done = !element.done;
                    element.paused = true;
                }
                return element;
            })
        );
    };

    const todoCount = todoData.filter((el) => !el.done).length;
    return (
        <section className="todoapp">
            <NewTaskForm newItemAdded={addItem} />
            <section className="main">
                <TaskList
                    todos={todoData}
                    onDeleted={deleteItem}
                    onToggleDone={onToggleDone}
                    onToggleEditing={onToggleEditing}
                    toggleTimer={toggleTimer}
                    editItem={editItem}
                />
                <Footer done={todoCount} setVisibility={setVisibility} clearCompleted={clearCompleted} />
            </section>
        </section>
    );
};

export default App;
