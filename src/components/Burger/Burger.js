import React from 'react'
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    let trans_ingredient = Object.keys(props.ingredients)
    .map((ingredientKey) => {
        return [...Array(props.ingredients[ingredientKey])]
        .map((_, i) => {
            return <BurgerIngredient key={ingredientKey + i}
            type = {ingredientKey}/>
        });
    }).reduce((arr, el) => {
        return arr.concat(el)
    }, []);

    if (trans_ingredient.length === 0){
        trans_ingredient = <p>Please  start adding ingredients!</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {trans_ingredient}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;