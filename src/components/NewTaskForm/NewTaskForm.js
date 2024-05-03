import React from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends React.Component {
    state = {
        label: '',
        min: '',
        sec: ''
    };

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        });
    };

    onSecChange = (e) => {
        this.setState({
            sec: e.target.value
        });
    };

    onMinChange = (e) => {
        this.setState({
            min: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.newItemAdded(this.state.label, this.state.min, this.state.sec);
        this.setState({
            label: '',
            min: '',
            sec: ''
        });
    };

    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <form className="new-todo-form" onSubmit={this.onSubmit}>
                    <input
                        className="new-todo"
                        placeholder="What needs to be done?"
                        onChange={this.onLabelChange}
                        value={this.state.label}
                        required={true}
                        pattern=".*\S.*"
                    />
                    <input
                        className="new-todo-form__timer"
                        placeholder="Min"
                        onChange={this.onMinChange}
                        value={this.state.min}
                        required={true}
                        type={'number'}
                        min={0}
                    />
                    <input
                        className="new-todo-form__timer"
                        placeholder="Sec"
                        onChange={this.onSecChange}
                        value={this.state.sec}
                        required={true}
                        type={'number'}
                        min={0}
                    />
                    <input type="submit" style={{ display: 'none' }} />
                </form>
            </header>
        );
    }
}

NewTaskForm.propTypes = {
    newItemAdded: PropTypes.func.isRequired
};

NewTaskForm.defaultProps = {
    newItemAdded: () => {}
};
