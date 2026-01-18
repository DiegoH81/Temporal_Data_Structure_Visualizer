import { useState } from 'react';
import '../components_styles/Input.css'

type InputCardProp = {
    addFun: (value: number) => void;
    deleteFun: (value: number) => void;
}

function InputCard({ addFun, deleteFun }: InputCardProp)
{
    const [value, setValue] = useState<number | ''>('')
    return (
        <div className = 'input-card'>
            <h3>Enter number:</h3>
            <input  className = 'input-box'
                    placeholder='Enter a number'
                    type='number'
                    value = {value}
                    onChange={(event) => {setValue(event.target.value === '' ? '' : Number(event.target.value))}}
                   />
            <button className='input-button' onClick={()=> {value !== '' && addFun(value)}}>Add</button>
            <button className='input-button' onClick={()=> {value !== '' && deleteFun(value)}}>Delete</button>
        </div>
    );
}

export default InputCard;