import React from 'react';
import PropTypes from 'prop-types';

export default class TasksFilter extends React.Component {
    render() {
        const { setVisibility } = this.props;
        return (
            <ul className="filters">
                <li>
                    <button type="button" className="All" onClick={() => setVisibility()}>
                        All
                    </button>
                </li>
                <li>
                    <button type="button" className="Active" onClick={() => setVisibility(false)}>
                        Active
                    </button>
                </li>
                <li>
                    <button type="button" className="Completed" onClick={() => setVisibility(true)}>
                        Completed
                    </button>
                </li>
            </ul>
        );
    }
}

TasksFilter.propTypes = {
    setVisibility: PropTypes.func.isRequired
};

TasksFilter.defaultProps = {
    setVisibility: () => {}
};
