import React from 'react';
import classes from './Burger.module.css';
import Burgeringredient from './Burgeringredients/Burgeringredient';
//import {withRouter} from 'react-router-dom';


const burger = (props)=>{
 
    let transformedIngredients = Object.keys(props.ingredients).map(igKey=>{
         return [...Array(props.ingredients[igKey])].map((_,i)=>{
             return <Burgeringredient key={igKey+i} type={igKey} />;
         })
    }).reduce((arr,el)=>{
        return arr.concat(el);
    },[]);
    // console.log(transformedIngredients)
    if(transformedIngredients.length === 0 ){
        transformedIngredients = <p>Please add some ingredients to the burger</p>;
    }
    return (
        <div className={classes.Burger}>
            
            <Burgeringredient type = "bread-top"/>
                 {transformedIngredients}
            <Burgeringredient type = "bread-bottom"/> 
        </div>
    );
}
export default burger;