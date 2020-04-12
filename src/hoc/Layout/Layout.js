import React, {Component} from 'react'
import Aux from '../Auxiliary'
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    
    sideDrawerClosedHandler = () =>{
        this.setState({showSideDrawer: false})
    }

    sideDrawerOpenHandler = () =>{
        this.setState({showSideDrawer: true})
    }
    
    render (){
        return (
            <Aux>
                <Toolbar sideDrawerOpen = {this.sideDrawerOpenHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <div>backdrop</div>
                <main id = 'kl' className= {classes.Content} >
                    {this.props.children}
                </main> 
            </Aux>
        )
    }
}

export default Layout;