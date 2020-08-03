import React, { Component } from 'react';
import Item from './TodoItem';
import { connect } from 'react-redux';
import { addTodo, deleteTodo, fetchTodos } from '../model/actions';
import { withRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

class TodoList extends Component {

    state = {
        count: 1
    }

    constructor() {
        super();
        this.input = React.createRef();
    }

    componentDidCatch(...args) {
        console.log(args);
    }

    componentDidMount() {
        this.props.dispatch(fetchTodos());
    }

    componentDidUpdate() {
        console.log('componentDidUpdate');
    }

    handleAdd = () => {
        const { dispatch } = this.props;
        const input = this.input.current;
        if (!input.value) {
            return;
        }
        dispatch(addTodo(input.value));
        input.value = '';
    }

    handleDelete = (e) => {
        const { dispatch } = this.props;
        const deleteIndex = parseInt(e.currentTarget.getAttribute('data-index'));
        dispatch(deleteTodo(deleteIndex));
    }

    render() {
        const { items } = this.props;

        return (
            <div className="wrapper" onMouseUp={() => { console.log('wapper'); }}>
                <div className="todo-list">
                    <div className="input-box">
                        <input ref={this.input} type="text" />
                        <button onClick={this.handleAdd}>add</button>
                    </div>
                    <ul>
                        {items && items.map((item, index) => <Item key={item.create} item={item} index={index} handleDelete={this.handleDelete} />)}
                    </ul>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        items: state.todos
    };
};

export default withRouter(connect(mapStateToProps)(hot(TodoList)));
