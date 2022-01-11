import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Dashboard.css';
import ListItems from '../../Components/ListItems/ListItems';

export default function Dashboard() {
    const [items, setItems] = useState([]);
    const [updated, setUpdated] = useState(0);
    const [newItem, setNewItem] = useState(false);
    const [newInput, setNewInput] = useState();
    const [activeSort, setActiveSort] = useState(null);
    const [toggleHome, setToggleHome] = useState(false);
    const [pickedSort, setPickedSort] = useState('date');

    const navigate = useHistory();

    useEffect(() => {
        var array = items;
        array.push({
            task: '1',
            urgency: 'low'
        },
            {
                task: '2',
                urgency: 'medium'
            },
            {
                task: '3',
                urgency: 'high'
            },
            {
                task: '4',
                urgency: 'low'
            },
            {
                task: '5',
                urgency: 'high'
            });

        setItems(array);
    }, []);

    const removeItem = (i) => {
        var array = items;
        array[i] = '';

        setItems(array);
        setUpdated(updated + 1);
    }

    const changeSort = (x) => {
        setActiveSort(x);
    }

    const cancelNewItem = () => {
        setNewItem(false);
    }

    const onInputChange = (event) => {
        setNewInput(event.target.value);
    }

    const addTask = () => {
        var array = items;
        array.push({
            task: newInput,
            urgency: 'low'
        });

        setItems(array);
        setNewItem(false);
    }

    if (toggleHome === false) {
        return (
            <div className='dashboard-container'>
                <div className='top-section'>
                    <div className='sort-container'>
                        <p>Sort By:</p>
                        <button className={activeSort ? 'color-active' : 'color-not-active'} onClick={() => {
                            setActiveSort(true);
                            setPickedSort('urgency');
                        }}>Urgency</button>
                        <button className={activeSort ? 'color-not-active' : 'color-active'} onClick={() => {
                            setActiveSort(false);
                            setPickedSort('date');
                        }}>Date</button>
                    </div>

                    <div>
                        <button className='add' onClick={() => setNewItem(true)}>+</button>
                        <button className='home' onClick={() => setToggleHome(true)}>Home</button>
                    </div>

                </div>

                <div className='notes-container'>
                    <ListItems
                        items={items}
                        removeItem={removeItem}
                        newItem={newItem}
                        onInputChange={onInputChange}
                        addTask={addTask}
                        cancelNewItem={cancelNewItem}
                        pickedSort={pickedSort}
                    />
                </div>
            </div>
        );
    }
    else if (toggleHome === true) {
        navigate.push('/');
    }

}

