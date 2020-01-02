import * as React from 'react';

interface ItemProps {
    item: ItemObject,
    index: number,
    handleDelete: (event: React.MouseEvent) => void
}

const Item = function(props: ItemProps) {

    return (
        <li className="item">
            <div className="name">
                {props.item.name}
            </div>
            <button data-index={props.index} onClick={props.handleDelete}>delete</button>
        </li>
    );
}

export default Item;