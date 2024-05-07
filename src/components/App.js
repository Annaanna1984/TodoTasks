import NewTaskForm from './NewTaskForm';
import TaskList from './TaskList';
import Footer from './Footer';
import React from 'react';

export default class App extends React.Component {
    maxId = 100;
    state = {
        todoData: [],
        timerId: null
    };

    createTodoItem(label, min, sec) {
        return {
            label,
            important: false,
            id: this.maxId++,
            done: false,
            visible: true,
            createDate: new Date(),
            editing: false,
            timer: min * 60 + Number(sec),
            paused: true
        };
    }

    toggleTimer = (id, paused) => {
        const todoData = this.state.todoData;

        this.setState(
            () => ({
                todoData: todoData.map((e) => {
                    if (e.id === id) e.paused = paused;
                    return e;
                })
            }),
            () => {
                if (this.state.timerId === null && !paused) {
                    this.setState({
                        timerId: setTimeout(this.tick, 1000)
                    });
                } else if (paused) {
                    const pausedCount = todoData.filter((e) => e.paused).length;
                    if (pausedCount === todoData.length) {
                        clearTimeout(this.state.timerId);
                        this.setState({
                            timerId: null
                        });
                    }
                }
            }
        );
    };

    tick = () => {
        if (this.state.timerId === null) return;

        this.setState(({ todoData }) => ({
            todoData: todoData.map((e) => {
                if (e.timer === 0) e.paused = true;
                else if (!e.done && !e.paused) e.timer--;
                return e;
            })
        }));
        setTimeout(this.tick, 1000);
    };

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
                    e.visible = typeof flag === 'undefined' || e.done === flag;
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

    addItem = (text, min, sec) => {
        const newItem = this.createTodoItem(text, min, sec);
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

    onToggleEditing = (id) => {
        this.setState(({ todoData }) => ({
            todoData: todoData.map((element) => {
                if (element.id === id) element.editing = !element.editing;
                return element;
            })
        }));
    };

    onToggleDone = (id) => {
        this.setState(
            ({ todoData }) => ({
                todoData: todoData.map((element) => {
                    if (element.id === id) {
                        element.done = !element.done;
                    }
                    return element;
                })
            }),
            () => this.toggleTimer(id, true)
        );
    };

    render() {
        const { todoData } = this.state;
        const todoCount = todoData.filter((el) => !el.done).length;
        return (
            <section className="todoapp">
                <NewTaskForm newItemAdded={this.addItem} />
                <section className="main">
                    <TaskList
                        todos={todoData}
                        onDeleted={this.deleteItem}
                        onToggleDone={this.onToggleDone}
                        onToggleEditing={this.onToggleEditing}
                        toggleTimer={this.toggleTimer}
                        editItem={this.editItem.bind(this)}
                    />
                    <Footer done={todoCount} setVisibility={this.setVisibility} clearCompleted={this.clearCompleted} />
                </section>
            </section>
        );
    }
}
