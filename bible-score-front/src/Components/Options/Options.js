import react from "react";

export default function Options({ array }){ 
    return(
        <>
            {
                array.map(e => {
                    return <option style={{'font-family': 'custom1'}} value={e.id}>{e.name}</option>
                })
            }
        </>
    );
}