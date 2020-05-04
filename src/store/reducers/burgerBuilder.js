import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../../shared/utility'

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7,
}

const initialState = {
    ingredients: null,
    totalPrice: 4.00,
    error: false,
    building:  false
}

const addIngredient = (state, action) => {
    const updateIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updateIngredients = updateObject(state.ingredients, updateIngredient)
    const updateState = {
        ingredients: updateIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true 
    }
    return updateObject(state, updateState)
}

const reducer = (state= initialState, action) => {
    switch(action.type){
        
        case actionTypes.ADD_INGREDENT: return addIngredient (state, action)
        
        case actionTypes.REMOVE_INGREDENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true
            }

        case actionTypes.SET_INGREDIENTS:
            return{
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice: 4.00,
                error: false,
                building: false
            }
            
        case actionTypes.FETCH_INGREDIENT_FAILED:
            return {
                ...state,
                error: true
            }
        default: return state
    }
}

export default reducer