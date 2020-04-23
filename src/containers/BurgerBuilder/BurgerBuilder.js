import React, {Component} from 'react'
import {connect} from 'react-redux'
import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actionTypes from '../../store/action'


class BurgerBuilder extends Component {
    state = {       
        purchasing: false,
        loading: false,
        error: false,
    }
    
    componentDidMount(){
        // axios.get('/ingredients.json').then(response =>
        // this.setState({ingredients: response.data}))
        // .catch(error => {
        //     this.setState({error: true})
        // })
    }

    purchaseHandler = () => {
        this.setState({purchasing : true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false})
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }

    render (){
        const disabledInfo = {
            ...this.props.ings
        }

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null

        let burger = this.state.error ? <p>Something went wrong</p> : <Spinner/>
        
        if(this.props.ings){
            burger = (
                <Aux>
                <Burger ingredients = {this.props.ings} />
                <BuildControls
                    ingredientAdded={this.props.onAddIngredient}
                    ingredientRemoved={this.props.onRemoveIngredient}
                    disabled= {disabledInfo}
                    price = {this.props.t_price}
                    order={this.purchaseHandler}
                />
                </Aux>
            )
            orderSummary = <OrderSummary price = {this.props.t_price} 
                continue = {this.purchaseContinueHandler} 
                cancel = {this.purchaseCancelHandler} 
                ingredients = {this.props.ings}/>
        }

        if (this.state.loading){
            orderSummary = <Spinner/>
        } 
        return (
            <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
               {orderSummary}
            </Modal>
                {burger}
            </Aux>
        );
    }
}
const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        t_price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (sel_ingredient) => {
            dispatch({type: actionTypes.ADD_INGREDENT, ingredientName: sel_ingredient})
        },
        onRemoveIngredient: (sel_ingredient) => {
            dispatch({type: actionTypes.REMOVE_INGREDENT, ingredientName: sel_ingredient})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));