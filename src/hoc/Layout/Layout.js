import React, {useState} from 'react'
import { connect } from 'react-redux'
import Aux from '../Auxiliary'
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

const layout = props => {

    const [sideDrawerIsVisible, setSideDrawerIsVisible]= useState(false)
    
    const sideDrawerClosedHandler = () =>{
        setSideDrawerIsVisible(false)
    }

    const sideDrawerOpenHandler = () =>{
        setSideDrawerIsVisible(!sideDrawerIsVisible)
    }

    return (
        <Aux>
            <Toolbar 
            isAuth= {props.isAuthenticated}
            sideDrawerOpen = {sideDrawerOpenHandler}/>
            <SideDrawer 
            isAuth= {props.isAuthenticated}
            open={sideDrawerIsVisible} closed={sideDrawerClosedHandler}/>
            <div>backdrop</div>
            <main id = 'kl' className= {classes.Content}>
                {props.children}
            </main> 
        </Aux>
    )
}

const mapStateToProps = state  => {
    return {
        isAuthenticated : state.auth.token  !== null
    }
}

export default connect(mapStateToProps)(layout);