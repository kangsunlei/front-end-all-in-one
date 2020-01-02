import * as React from 'react';
import Item from './Item';
import { connect } from 'react-redux';
import { AppProps, ItemObject } from 'fe';
import { addTodo, deleteTodo } from '../actions';

class App extends React.Component<AppProps> {
    private input = React.createRef<HTMLInputElement>();

    handleAdd = () => {
        const { dispatch } = this.props;
        const input = this.input.current;
        if (!input.value) {
            return;
        }
        dispatch(addTodo(input.value));
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

const mapStateToProps = (state: ItemObject[]) => {
    return {
        items: state
    }
}

export default connect(mapStateToProps)(App);