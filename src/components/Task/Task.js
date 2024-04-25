import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends React.Component {
    render() {
        const { onDeleted, onToggleDone, onToggleEditing, editItem, createDate, label, id, done, editing } = this.props;
        return editing ? (
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    onToggleEditing(id);
                }}
            >
                <input
                    onChange={(event) => {
                        editItem(id, event.target.value);
                    }}
                    type="text"
                    className="edit"
                />
            </form>
        ) : (
            <div className="view">
                <input id={`${id}`} className="toggle" type="checkbox" onClick={onToggleDone} checked={done} readOnly />
                <label htmlFor={`${id}`}>
                    <span className={done ? 'description' : ''}>{label}</span>
                    <span className="created">
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
    }
}

Task.propTypes = {
    id: PropTypes.number,
    label: PropTypes.string,
    done: PropTypes.bool,
    editing: PropTypes.bool,
    createDate: PropTypes.instanceOf(Date),
    onDeleted: PropTypes.func.isRequired,
    onToggleDone: PropTypes.func.isRequired,
    editItem: PropTypes.func.isRequired,
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
