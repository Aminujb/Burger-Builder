import React from 'react'
import classes from './Toolbar.css'
import Logo from '../../Logo/logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Menu from '../../UI/Menu/Menu'


const toolbar = (props) => (
    <header className= {classes.Toolbar}>
        <Menu openDrawer = {props.sideDrawerOpen}/>
        <Logo height = "80%"/>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
)

export default toolbar;