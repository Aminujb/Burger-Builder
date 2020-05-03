import React from 'react'
import classes from '../BuildControls/BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'}
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
    <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {
            controls.map((control) => (
                <BuildControl 
                    key={control.label} 
                    label={control.label}
                    disabled ={props.disabled[control.type]}
                    added={() => props.ingredientAdded(control.type)}
                    removed={() => props.ingredientRemoved(control.type)}
                />
            ))
        }  
        <button 
        className={classes.OrderButton} 
        disabled={props.price <= 4}
        onClick={props.order}>{props.isAuth? 'ORDER NOW': 'Please Sign In'}</button> 
    </div>
);

export default buildControls;