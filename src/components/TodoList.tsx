import * as React from 'react';
import Item from './TodoItem';
import { connect } from 'react-redux';
import { TodoListProps, StoreObject } from 'fe';
import { addTodo, deleteTodo, fetchTodos } from '../model/actions';
import { withRouter } from 'react-router-dom';

class TodoList extends React.Component<TodoListProps> {
    private input = React.createRef<HTMLInputElement>();

    componentDidMount() {
        this.props.dispatch(fetchTodos());
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

    handleDelete = (e: React.MouseEvent) => {
        const { dispatch } = this.props;
        const deleteIndex: number = parseInt(e.currentTarget.getAttribute('data-index'));
        dispatch(deleteTodo(deleteIndex));
    }

    render() {
        const { items } = this.props;
        return (
            <div className="wrapper">
                <div className="todo-list">
                    <div className="input-box">
                        <input ref={this.input} type="text"/>
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

const mapStateToProps = (state: StoreObject) => {
    return {
        items: state.todos
    }
}

export default withRouter(connect(mapStateToProps)(TodoList));