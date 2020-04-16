import React, {Component} from 'react'
import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4.00,
        purchasing: false,
        loading: false,
        error: false,
    }
    
    componentDidMount(){
        axios.get('/ingredients.json').then(response =>
            this.setState({ingredients: response.data}))
            .catch(error => {
                this.setState({error: true})
            })
    }

    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updateCount
        const updatedTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type]
        this.setState(
            {
                ingredients : updatedIngredients, 
                totalPrice : updatedTotalPrice
            }
        )
    }

    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        if (!oldCount <= 0){
            const updateCount = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            }
            updatedIngredients[type] = updateCount
            const updatedTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type]
            this.setState(
                {
                    ingredients : updatedIngredients, 
                    totalPrice : updatedTotalPrice
                }
            )
        }
    }

    purchaseHandler = () => {
        this.setState({purchasing : true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false})
    }

    purchaseContinueHandler = () => {
        this.setState({loading: true})
        const purchseOrder = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice.toFixed(2),
            customer: {
                name: 'Aminu Jubril',
                address: {
                    street: 'TestStreet',
                    zipCode: '12345',
                    country: 'Nigeria'
                },
                email: 'myname@email.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', purchseOrder)
        .then(response => this.setState({loading: false, purchasing: false}))
        .catch(error => this.setState({loading: false, purchasing: false}));
    }

    render (){
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null

        let burger = this.state.error ? <p>Something went wrong</p> : <Spinner/>
        
        if(this.state.ingredients){
            burger = (
                <Aux>
                <Burger ingredients = {this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled= {disabledInfo}
                    price = {this.state.totalPrice}
                    order={this.purchaseHandler}
                />
                </Aux>
            )
            orderSummary = <OrderSummary price = {this.state.totalPrice} 
                continue = {this.purchaseContinueHandler} 
                cancel = {this.purchaseCancelHandler} 
                ingredients = {this.state.ingredients}/>
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

export default withErrorHandler(BurgerBuilder, axios);