import react from "react";

export default function Options({ array }){ 
    return(
        <>
            {
                array.map((e, i) => {
                    return <option  key={i} style={{'fontFamily': 'custom1', 
                    'fontWeight': 'normal', 
                    'fontSize': '15px',
                    'backgroundColor': 'var(--tertiary-color)',
                    'color': 'white'
                }} value={e.id}>{e.name}</option>
                })
            }
        </>
    );
}