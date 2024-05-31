import React from 'react';
import TasksFilter from '../TaskFilter';
import PropTypes from 'prop-types';

const Footer = ({ done, setVisibility, clearCompleted }) => {
    return (
        <footer className="footer">
            <span className="todo-count">{done} items left</span>
            <TasksFilter setVisibility={setVisibility} />
            <button className="clear-completed" onClick={clearCompleted}>
                Clear completed
            </button>
        </footer>
    );
};
export default Footer;

Footer.propTypes = {
    clearCompleted: PropTypes.func.isRequired,
    setVisibility: PropTypes.func.isRequired,
    done: PropTypes.number
};
Footer.defaultProps = {
    clearCompleted: () => {},
    setVisibility: () => {},
    done: false
};
