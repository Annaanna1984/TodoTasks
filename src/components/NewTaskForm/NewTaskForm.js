import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ newItemAdded }) => {
    const [label, setLabel] = useState('');
    const [min, setMin] = useState('');
    const [sec, setSec] = useState('');

    const onLabelChange = (e) => {
        setLabel(e.target.value);
    };

    const onSecChange = (e) => {
        setSec(e.target.value);
    };

    const onMinChange = (e) => {
        setMin(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        newItemAdded(label, min, sec);
        setLabel('');
        setMin('');
        setSec('');
    };

    return (
        <header className="header">
            <h1>todos</h1>
            <form className="new-todo-form" onSubmit={onSubmit}>
                <input
                    className="new-todo"
                    placeholder="What needs to be done?"
                    onChange={onLabelChange}
                    value={label}
                    required={true}
                    pattern=".*\S.*"
                />
                <input
                    className="new-todo-form__timer"
                    placeholder="Min"
                    onChange={onMinChange}
                    value={min}
                    required={true}
                    type={'number'}
                    min={0}
                />
                <input
                    className="new-todo-form__timer"
                    placeholder="Sec"
                    onChange={onSecChange}
                    value={sec}
                    required={true}
                    type={'number'}
                    min={0}
                />
                <input type="submit" style={{ display: 'none' }} />
            </form>
        </header>
    );
};
export default NewTaskForm;

NewTaskForm.propTypes = {
    newItemAdded: PropTypes.func.isRequired
};

NewTaskForm.defaultProps = {
    newItemAdded: () => {}
};
