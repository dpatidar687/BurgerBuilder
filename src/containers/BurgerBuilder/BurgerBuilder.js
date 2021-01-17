import React,{Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actionTypes from '../../store/actions';



class BurgerBuilder extends Component{
    state ={
        // purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }
    componentDidMount() {
        // axios.get('https://burgerbuilder-fcbba.firebaseio.com/ingredients.json')
        // .then(res=>{
        //     this.setState({ingredients : res.data});
        //     //console.log(res.data);
        // })
        // .catch(error => {
        // this.setState({error:true});
        // });
    }
    purchaseHandler = ()=>{
        this.setState({purchasing : true});
    }

    purchaseCancelHandler = ()=>{
        this.setState({purchasing : false});
    }

    purchaseContinueHandler = ()=>{
        this.props.history.push('/checkout'); 
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce((sum,el)=>{
                return sum + el;
            },0);
        return sum>0 ;  
    }
    // addIngredientHandler(type){
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients     
    //     };
    //     updatedIngredients[type]=updatedCount;
    //     let totalPrice = INGREDIENT_PRICE[type] + this.state.totalPrice;
    //     this.setState({
    //             totalPrice : totalPrice,
    //             ingredients : updatedIngredients
    //         });
    //     this.updatePurchasable(updatedIngredients);  
    // }
    // removeIngredientHandler(type){
    //     const oldCount = this.state.ingredients[type];

    //     if(oldCount >=1 ){
    //         const updatedCount = oldCount -1;
    //         const updatedIngredients = {...this.state.ingredients};
    //         updatedIngredients[type] = updatedCount;
    //         let totalPrice = this.state.totalPrice - INGREDIENT_PRICE[type];
    //         this.setState({
    //                 totalPrice : totalPrice,
    //                 ingredients : updatedIngredients
    //         });
    //         this.updatePurchasable(updatedIngredients);
    //     }
    //     else{
    //         return;
    //     }
    // }
    render(){
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
       

        let orderSummary = null;
        let burger = this.state.error ? <h1>Ingredients cant be loaded........... </h1> : <Spinner/> ;

        if(this.props.ings){
        burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls  
                    ingredientAdded = {(el)=>{ 
                        console.log(el)
                        this.props.onIngredientAdded();
                    }}
                    ingredientRemoved = {this.props.onIngredientRemoved} 
                    disabled = {disabledInfo} 
                    ordered = {this.purchaseHandler}
                    price = {this.props.price}
                    purchasable = {this.updatePurchaseState(this.props.ings)}  />
                </Aux>
            );
        orderSummary = <OrderSummary 
                ingredients= {this.props.ings} 
                purchaseCancelled = {this.purchaseCancelHandler}
                purchaseContinued = {this.purchaseContinueHandler}
                price = {this.props.price}/>;        
        }
        if(this.state.loading){
            orderSummary=<Spinner/>
        }

        return(
            <Aux>
                <Modal show = {this.state.purchasing}
                       modalClosed = {this.purchaseCancelHandler} >
                        {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings : state.ingredients,
        price : state.totalPrice
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded : (ingName)=>dispatch({type : actionTypes.ADD_INGREDIENT,ingredientName : ingName}),
        onIngredientRemoved : (ingName)=>dispatch({type : actionTypes.REMOVE_INGREDIENT,ingredientName : ingName})
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(BurgerBuilder,axios));