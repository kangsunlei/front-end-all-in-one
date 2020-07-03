import React from 'react';
import { useState } from 'react';

const Item = function(props) {

    const [count, setCount] = useState(false);

    return (
        <li className="item">
            <div className="name">
                {props.item.name}
            </div>
            <button data-index={props.index} onClick={() => setCount(true)}>delete</button>
            {count && <div className="count" onMouseUp={() => { console.log('item'); }}>count</div>}
        </li>
    );
}

export default Item;
