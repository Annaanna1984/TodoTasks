import NewTaskForm from './NewTaskForm';
import TaskList from './TaskList';
import Footer from './Footer';
import React from 'react';

export default class App extends React.Component {
    maxId = 100;
    state = {
        todoData: []
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            id: this.maxId++,
            done: false,
            visible: true,
            createDate: new Date(),
            editing: false
        };
    }

    clearCompleted = () => {
        this.setState(({ todoData }) => {
            return {
                todoData: todoData.filter((e) => !e.done)
            };
        });
    };

    setVisibility = (flag) => {
        this.setState(({ todoData }) => {
            return {
                todoData: todoData.map((e) => {
                    if (typeof flag === 'undefined' || e.done === flag) {
                        e.visible = true;
                    } else {
                        e.visible = false;
                    }
                    return e;
                })
            };
        });
    };

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
            return {
                todoData: newArr
            };
        });
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text);
        this.setState(({ todoData }) => {
            const newArr = [...todoData, newItem];
            return {
                todoData: newArr
            };
        });
    };

    editItem = (id, text) => {
        this.setState(({ todoData }) => ({
            todoData: todoData.map((element) => {
                if (element.id === id) element.label = text;
                return element;
            })
        }));
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = { ...oldItem, [propName]: !oldItem[propName] };
        const before = arr.slice(0, idx);
        const after = arr.slice(idx + 1);
        const ret = [...before, newItem, ...after];
        return ret;
    }

    onToggleEditing = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'editing')
            };
        });
    };

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };
        });
    };

    render() {
        const { todoData } = this.state;
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;
        return (
            <section className="todoapp">
                <NewTaskForm newItemAdded={this.addItem} />
                <section className="main">
                    <TaskList
                        todos={todoData}
                        onDeleted={this.deleteItem}
                        onAdded={this.addItem}
                        onToggleDone={this.onToggleDone}
                        onToggleEditing={this.onToggleEditing}
                        editItem={this.editItem.bind(this)}
                    />
                    <Footer done={todoCount} setVisibility={this.setVisibility} clearCompleted={this.clearCompleted} />
                </section>
            </section>
        );
    }
}
