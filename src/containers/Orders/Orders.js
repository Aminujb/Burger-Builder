import React, {Component} from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component{
    state ={
        orders: [],
        loading: true
    }

    componentDidMount(){
        axios.get('/orders.json')
        .then(request => {
            const fetchedOrders = []
            for (let key in request.data){
                fetchedOrders.push({
                    ...request.data[key],
                    id:key
                })
            }
            this.setState({loading: false, orders: fetchedOrders})
        })
        .catch(error=> {
            this.setState({loading: false})
        })
    }

    render(){
        console.log(this.state.orders)
        return (
        <div>
            {this.state.orders.map(order => (
                <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price}

                />
            ))}
        </div>
        )
    }
}

export default withErrorHandler(Orders, axios)