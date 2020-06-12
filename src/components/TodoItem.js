import * as React from 'react';

const Item = function(props) {

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