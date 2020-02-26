import * as React from 'react';

interface DragItemProps {
    index: number,
    onItemSelect: (delta: number) => void
}

class DragItem extends React.Component<DragItemProps> {
    readonly state = {
        selected: false
    }

    handleMouseDown = (e: React.MouseEvent) => {
        this.handleTriggerSelect();
        console.log(e);
    }

    handleMouseUp = (e: React.MouseEvent) => {
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