import React, { useState, useEffect, createRef } from 'react';

function TextItem(props) {
    const input = createRef();
    const [ isInputShow, triggerInputShow ] = useState(true);
    const [ text, updateText ] = useState('');

    useEffect(() => {
        input.current.focus();
    });

    return (
        <div className="meeting-item text-item" style={{left: props.item.left, top: props.item.top}}>
            {isInputShow && <input ref={input} type="text"/>}
        </div>
    );
}

export default TextItem;
