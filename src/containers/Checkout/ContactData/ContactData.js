import React, { useState} from 'react'
import { connect } from 'react-redux'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'
import {checkValidity} from '../../../shared/utility'

const contactData = props => {
    
    const [orderForm, setOrderForm] = useState({
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value:'',
                validation:{
                    required: true
                },
                valid : false,
                touched : false,
                errorMessage: 'Name can not be blank'
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value:'',
                validation:{
                    required: true
                },
                valid : false,
                touched : false,
                errorMessage: 'Street can not be blank'
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZipCode '
                },
                value:'',
                validation:{
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid : false,
                touched : false,
                errorMessage: 'Invalid input'
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value:'',
                validation:{
                    required: true
                },
                valid : false,
                touched : false,
                errorMessage: 'Country can not be blank'
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value:'',
                validation:{
                    required: true,
                    isEmail: true
                },
                valid : false,
                touched : false,
                errorMessage: 'Invalid Email format'
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value:'fastest',
                valid: true,
                validation: {}
            }
        })

        const [formIsValid, setFormIsValid] = useState(false)


    const orderHandler = (event) => {
        event.preventDefault();
        const formData = {}
        for (let formElementId in orderForm){
            formData[formElementId] = orderForm[formElementId].value
        }
        const purchaseOrder = {
            ingredients: props.ings,
            price: props.t_price.toFixed(2),
            orderData: formData,
            userId: props.userId         
        }
        
        props.onOrderBurger(purchaseOrder, props.token)
    }
    
    const inputChangedHandler = (event, inputIdentifier) =>{
        const updatedOrderForm = {
            ...orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true
        updatedOrderForm[inputIdentifier] = updatedFormElement
        
        let formIsValid = true
        for (let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid  
        }
        setOrderForm(updatedOrderForm)
        setFormIsValid(formIsValid)
    }
 
    const formElementArray =  [];
    for (let key in orderForm){
        formElementArray.push({
            id: key,
            config: orderForm[key]
        })
    }
    let form = (            
            <form onSubmit={orderHandler} >
                {formElementArray.map(formElement => (
                    <Input 
                        key= {formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        errorMessage={formElement.config.errorMessage}
                        changed={(event)=>inputChangedHandler(event,formElement.id)}
                    />
                ))}
                <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
            </form>
        )

    if (props.loading){
        form = <Spinner/>
    }
    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        t_price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactData, axios))