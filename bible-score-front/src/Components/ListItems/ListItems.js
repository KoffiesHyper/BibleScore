import { useState, useEffect } from 'react';
import './ListItems.css';

export default function ListItems({ items, removeItem, newItem, onInputChange, addTask, cancelNewItem, pickedSort }) {
    const [listItems, setListItems] = useState([]);
    const [sortedItems, setSortedItems] = useState([]);

    useEffect(() => {
        setListItems(items);
    }, []);

    // useEffect(() => {
    //     var array = changeSort();
    //     setSortedItems(array);
    //     console.log(listItems);
    // }, [pickedSort]);

    const determineUrgency = (word) => {
        switch (word) {
            case 'low':
                return 1;
            case 'medium':
                return 2;
            case 'high':
                return 3;
            default:
                break;
        }
    }

    const changeSort = () => {
        let array2 = items;

        if (pickedSort === 'urgency') {
            let smallest;
            let smallestIndex;

            for (let i = 0; i < array2.length; i++) {
                smallest = array2[i];
                smallestIndex = i;

                for (let x = i + 1; x < array2.length; x++) {
                    if (determineUrgency(array2[x].urgency) < determineUrgency(smallest.urgency)) {
                        smallest = array2[x];
                        smallestIndex = x;
                    }
                }

                if (smallestIndex !== i) {
                    var temp = array2[i];
                    array2[i] = smallest;
                    array2[smallestIndex] = temp;
                }
            }

            return array2;
        }
        else {
            return items;
        }
    }

    if (!newItem) {
        return (
            <div className='list-container'>
                {
                    listItems.map((e, i) => {
                        if (e !== '') {
                            return (
                                <div className='list-item' key={i}>
                                    <h2>{e.task}</h2>
                                    <p>{e.urgency}</p>
                                    <button className='remove-style' onClick={() => removeItem(i)}>Remove</button>
                                    <button className='done-style'>Done</button>
                                </div>
                            );
                        }
                    })
                }
            </div>
        );
    }
    else {
        return (
            <div className='list-container'>
                {
                    listItems.map((e, i) => {
                        if (e !== '') {
                            return (
                                <div className='list-item'>
                                    <h2>{e.task}</h2>
                                    <p>{e.urgency}</p>
                                    <button className='remove-style' onClick={() => removeItem(i)}>Remove</button>
                                    <button className='done-style'>Done</button>
                                </div>
                            );
                        }
                    })
                }

                <NewItem
                    onInputChange={onInputChange}
                    addTask={addTask}
                    cancelNewItem={cancelNewItem}
                />
            </div>
        );
    }

}

function NewItem({ onInputChange, addTask, cancelNewItem }) {
    return (
        <div className='new-item'>
            <input type='text' onChange={(event) => onInputChange(event)} autoFocus />
            <button onClick={addTask}>Add</button>
            <button className='cancel-style' onClick={cancelNewItem}>Cancel</button>
        </div>
    );
}