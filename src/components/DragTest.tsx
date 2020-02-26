import * as React from 'react';
import DragItem from './DragItem';

class DragTest extends React.Component {
    readonly state = {
        count: 0,
        items: [1,2,3,4,5,6,7,8,9],
        clientX: 0,
        clientY: 0,
        mouseIsDown: false,
        mouseIsMove: false
    }

    handleChangeCount = (delta: number) => {
        this.setState({
            count: this.state.count + delta
        });
    }

    handleMouseDown = () => {
        this.setState({
            mouseIsDown: true
        });
        console.log('mouseDown');
    }

    handleMouseMove = (e: React.MouseEvent) => {
        if (this.state.mouseIsDown) {
            this.setState({
                mouseIsMove: true,
                clientX: e.clientX,
                clientY: e.clientY
            });
        }
    }

    handleMouseUp = () => {
        this.setState({
            mouseIsDown: false,
            mouseIsMove: false
        });
        console.log('mouseUp');
    }

    render() {
        const { count, clientX, clientY, mouseIsMove } = this.state;
        return (
            <div className="drag-section" onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp}>
                {this.state.items.map((item, index) => <DragItem key={index} index={index} onItemSelect={this.handleChangeCount} />)}
                <div className={`fake-item${mouseIsMove ? ' show' : ''}`} style={{left: clientX, top: clientY}}>{count}个项目</div>
            </div>
        );
    }
}

export default DragTest;