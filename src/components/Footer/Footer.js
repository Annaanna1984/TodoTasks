import React from 'react';
import TasksFilter from '../TaskFilter';
import PropTypes from 'prop-types';

export default class Footer extends React.Component {
    render() {
        const { done, setVisibility, clearCompleted } = this.props;
        return (
            <footer className="footer">
                <span className="todo-count">{done} items left</span>
                <TasksFilter setVisibility={setVisibility} />
                <button className="clear-completed" onClick={clearCompleted}>
                    Clear completed
                </button>
            </footer>
        );
    }
}

Footer.propTypes = {
    clearCompleted: PropTypes.func.isRequired,
    setVisibility: PropTypes.func.isRequired,
    done: PropTypes.number
};
