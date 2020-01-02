import * as React from 'react';
import Item from './Item';

class App extends React.Component {
    private input = React.createRef<HTMLInputElement>();

    readonly state: AppState = {
        items: JSON.parse(localStorage.getItem('todoItems') || '[]')
    };
    

    handleAdd = () => {
        const { items } = this.state;
        const input = this.input.current;
        if (!input.value) {
            return;
        }

        items.unshift({
            name: input.value,
            create: Date.now()
        });
        input.value = '';
        this.updateItems(items);
    }

    handleDelete = (e: React.MouseEvent) => {
        const { items } = this.state;
        const deleteIndex: number = parseInt(e.currentTarget.getAttribute('data-index'));
        items.splice(deleteIndex, 1);

        this.updateItems(items);
    }

    updateItems(items: ItemObject[]) {
        this.setState({
            items
        });
        localStorage.setItem('todoItems', JSON.stringify(items));
    }

    render() {
        const { items } = this.state;
        return (
            <div className="wrapper">
                <div className="todo-list">
                    <div className="input-box">
                        <input ref={this.input} type="text"/>
                        <button onClick={this.handleAdd}>add</button>
                    </div>
                    <ul>
                        {items.map((item, index) => <Item key={item.create} item={item} index={index} handleDelete={this.handleDelete} />)}
                    </ul>
                </div>
            </div>
        );
    }
}

export default App;