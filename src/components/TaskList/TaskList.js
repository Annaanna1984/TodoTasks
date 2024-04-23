import React from 'react';
import Task from '../Task';
import PropTypes from 'prop-types';

const TaskList = ({ todos, onDeleted, onToggleDone, onToggleEditing, editItem }) => {
    const elements = todos
        .filter((e) => e.visible)
        .map((item) => {
            const { id, editing } = item;
            return (
                <li key={id} className={editing ? 'editing' : 'completed'}>
                    <Task
                        {...item}
                        key={item.id}
                        onDeleted={onDeleted}
                        onToggleDone={() => onToggleDone(id)}
                        onToggleEditing={() => onToggleEditing(id)}
                        editItem={editItem}
                    />
                </li>
            );
        });
    return <ul className="todo-list">{elements}</ul>;
};
export default TaskList;

TaskList.propTypes = {
    todos: PropTypes.any,
    onDeleted: PropTypes.func.isRequired,
    onToggleDone: PropTypes.func.isRequired,
    editItem: PropTypes.func.isRequired,
    id: PropTypes.number,
    onToggleEditing: PropTypes.func.isRequired
};
TaskList.defaultProps = {
    todos: {}
};
