import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends React.Component {
    state = {
        editedTitle: ''
    };

    formatTimer = (timer) => {
        const min = Math.floor(timer / 60);
        const sec = timer % 60;
        const minFormat = min >= 10 ? min : `0${min}`;
        const secFormat = sec >= 10 ? sec : `0${sec}`;
        return `${minFormat}:${secFormat}`;
    };

    handleEscPress = (e) => {
        if (this.props.editing && e.key === 'Escape') {
            e.preventDefault();
            this.props.onToggleEditing(this.props.id);
        }
    };

    handleClickOutside = (e) => {
        if (this.props.editing && e.target.id !== 'edit_form') {
            e.preventDefault();
            this.props.onToggleEditing(this.props.id);
        }
    };

    componentDidMount() {
        document.addEventListener('keydown', this.handleEscPress);
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleEscPress);
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    render() {
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
        } = this.props;
        return editing ? (
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    onToggleEditing(id);
                    editItem(id, this.state.editedTitle);
                }}
            >
                <input
                    id="edit_form"
                    onChange={(event) => {
                        this.setState({
                            editedTitle: event.target.value
                        });
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
                        <button className="icon icon-play" onClick={unpauseTimer} />
                        <button className="icon icon-pause" onClick={pauseTimer} />
                        {this.formatTimer(timer)}
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
    }
}

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
