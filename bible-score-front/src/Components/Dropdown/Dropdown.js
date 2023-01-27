import React, { useEffect, useState } from 'react';
import './Dropdown.css';

function Dropdown({ items, updateVal }) {
    const [selected, setSelected] = useState({name: ""});
    const [dropped, setDropped] = useState(false);

    useEffect(() => { 
        if(items.length > 0 && selected.name === "") setSelected(items[0])
    }, [items])

    const handleEnter = () => {
        setDropped(true);
    }

    const handleLeave = () => {
        setDropped(false);
    }

    const handleSelect = (item) => {
        setDropped(false);
        setSelected(item);
        updateVal(item.id);
    }

    return (
        <div className='dropdown' onClick={handleEnter} onMouseLeave={handleLeave}>
            {selected ? selected.name : ''}

            {dropped &&
                <div className='list'>
                    {
                        items.map(item => {
                            return <p onMouseDown={() => handleSelect(item)}>{item.name}</p>
                        })
                    }
                </div>
            }
        </div>
    )
}

export default Dropdown;