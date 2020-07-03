import React, { useState, useEffect, createRef } from 'react';
import TextItem from './TextItem';

function Meeting() {
    const wrapper = createRef();
    const container = createRef();

    const [items, setItems] = useState([]);

    useEffect(() => {
        wrapper.current.scrollTo(10000, 10000);
    });

    function handleContainerClick(e) {
        e.persist();
        if (e.target === container.current) {
            const {offsetX, offsetY } = e.nativeEvent;
            console.log(e);
            setItems(items.concat({
                id: Math.random(),
                left: offsetX - 50,
                top: offsetY - 50
            }));
        }
    }

    return (
        <div ref={wrapper} className="meeting-wrapper">
            <div ref={container} onClick={handleContainerClick} className="meeting-container">
                {items.map(item => <TextItem key={item.id} item={item}/>)}
            </div>
        </div>
    );
}

export default Meeting;
