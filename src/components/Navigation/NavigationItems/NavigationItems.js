import React from 'react';
import NavigationItem from '../NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';


const navigationItems = (props)=>{
    return (
        <ul className = {classes.NavigationItems}>
           <NavigationItem link = '/' exact = {props.exact} >BurgerBuilder</NavigationItem> 
           {/* <NavigationItem link = '/'>Checkout</NavigationItem>  */}
           <NavigationItem link = '/orders'>Orders</NavigationItem> 

        
        </ul>
    )
}

export default navigationItems;