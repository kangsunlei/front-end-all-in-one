import * as React from 'react';

class DragItem extends React.Component {
    constructor() {
        super();
        this.state = {
            selected: false
        };
    }

    handleMouseDown = (e) => {
        this.handleTriggerSelect();
        console.log(e);
    }

    handleMouseUp = (e) => {
        console.log('get target');
    }

    handleTriggerSelect = () => {
        this.props.onItemSelect(this.state.selected ? -1 : 1);
        this.setState({
            selected: !this.state.selected
        });
    }

    render() {
        const { index } = this.props;
        const { selected } = this.state;

        return (
            <div className={`drag-item${selected ? ' selected' : ''}`} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
                {index}
            </div>
        );
    }
}

export default DragItem;