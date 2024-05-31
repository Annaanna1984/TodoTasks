import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

const Task = (props) => {
    const [editedTitle, setEditedTitle] = useState('');
    const {
        onDeleted,
        onToggleDone,
        onToggleEditing,
        pauseTimer,
        unpauseTimer,
        editItem,
        createDate,
        label,
        id,
        done,
        editing,
        timer
    } = props;

    const formatTimer = (timer) => {
        const min = Math.floor(timer / 60);
        const sec = timer % 60;
        const minFormat = min >= 10 ? min : `0${min}`;
        const secFormat = sec >= 10 ? sec : `0${sec}`;
        return `${minFormat}:${secFormat}`;
    };

    useEffect(() => {
        const handleEscPress = (e) => {
            if (editing && e.key === 'Escape') {
                e.preventDefault();
                onToggleEditing(id);
            }
        };

        const handleClickOutside = (e) => {
            if (editing && e.target.id !== 'edit_form') {
                e.preventDefault();
                onToggleEditing(id);
            }
        };
        document.addEventListener('keydown', handleEscPress);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('keydown', handleEscPress);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [editing, id, onToggleEditing]);

    return editing ? (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                onToggleEditing(id);
                editItem(id, editedTitle);
            }}
        >
            <input
                id="edit_form"
                onChange={(event) => {
                    setEditedTitle(event.target.value);
                }}
                type="text"
                className="edit"
                pattern=".*\S.*"
            />
        </form>
    ) : (
        <div className="view">
            <input id={`${id}`} className="toggle" type="checkbox" onClick={onToggleDone} checked={done} readOnly />
            <label htmlFor={`${id}`}>
                <span className={done ? 'title' : ''}>{label}</span>
                <span className="description">
                    <button className="icon icon-play" onClick={!done ? unpauseTimer : () => {}} />
                    <button className="icon icon-pause" onClick={!done ? pauseTimer : () => {}} />
                    {formatTimer(timer)}
                </span>
                <span className="description">
                    {formatDistanceToNow(createDate, {
                        includeSeconds: true
                    })}{' '}
                    ago
                </span>
            </label>
            <button className="icon icon-edit" onClick={onToggleEditing} />
            <button className="icon icon-destroy" onClick={() => onDeleted(id)} />
        </div>
    );
};
export default Task;

Task.propTypes = {
    id: PropTypes.number,
    label: PropTypes.string,
    done: PropTypes.bool,
    editing: PropTypes.bool,
    timer: PropTypes.number,
    createDate: PropTypes.instanceOf(Date),
    onDeleted: PropTypes.func.isRequired,
    onToggleDone: PropTypes.func.isRequired,
    editItem: PropTypes.func.isRequired,
    pauseTimer: PropTypes.func.isRequired,
    unpauseTimer: PropTypes.func.isRequired,
    onToggleEditing: PropTypes.func.isRequired
};

Task.defaultProps = {
    id: 0,
    label: '',
    done: false,
    editing: false,
    createDate: new Date(),
    onDeleted: () => {},
    onToggleDone: () => {},
    editItem: () => {},
    onToggleEditing: () => {}
};
