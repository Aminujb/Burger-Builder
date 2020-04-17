import React from 'react'
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary'
import {Route} from 'react-router-dom'
import ContactData from './ContactData/ContactData'

class Checkout extends React.Component{
    state = {
        ingredients:null,
        price: 0
    }

    UNSAFE_componentWillMount(){
        const query = new URLSearchParams(this.props.location.search)
        const ingre = {}
        let price = null
        for (let param of query.entries()){
            if (param[0] === 'price'){
                price = param[1]
            }else{
                ingre[param[0]] = +param[1]
            }
            
        }
        this.setState({ingredients: ingre, totalPrice: price})
    }
    checkoutCancelledHandler = () =>{
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () =>{
        this.props.history.replace('checkout/contact-data')
    }
    render(){
        return(
            <div>
                <CheckOutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route path={this.props.match.path + '/contact-data'}
                    render = {(props) => (
                    <ContactData 
                    ingredients={this.state.ingredients}
                    price = {this.state.totalPrice}
                    {...props}
                    />)}
                />
            </div>
        )
    }
}

export default Checkout