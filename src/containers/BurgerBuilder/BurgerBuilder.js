import React,{Component} from 'react';
import Aux from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENT_PRICE = {
    salad:0.5,
    bacon:0.6,
    cheese:0.4,
    meat:1.3
}
class BurgerBuilder extends Component{
    state ={
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice : 4,
        purchasable: false,
        purchasing: false
    }
    purchaseHandler = ()=>{
        console.log('button clicked');
        this.setState({purchasing : true});
    }
    purchaseCancelHandler = ()=>{
        this.setState({purchasing : false});
    }
    purchaseContinueHandler = ()=>{
        alert('you continue !!!!!!!');
    }
    updatePurchasable(ingredients){
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce((sum,el)=>{
                return sum + el;
            },0);
        this.setState({
            purchasable : sum>0
        });
    }
    addIngredientHandler(type){
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients     
        };
        updatedIngredients[type]=updatedCount;
        let totalPrice = INGREDIENT_PRICE[type] + this.state.totalPrice;
        this.setState({
                totalPrice : totalPrice,
                ingredients : updatedIngredients
            });
        this.updatePurchasable(updatedIngredients);  
    }
    removeIngredientHandler(type){
        const oldCount = this.state.ingredients[type];

        if(oldCount >=1 ){
            const updatedCount = oldCount -1;
            const updatedIngredients = {...this.state.ingredients};
            updatedIngredients[type] = updatedCount;
            let totalPrice = this.state.totalPrice - INGREDIENT_PRICE[type];
            this.setState({
                    totalPrice : totalPrice,
                    ingredients : updatedIngredients
            });
            this.updatePurchasable(updatedIngredients);
        }
        else{
            return;
        }
    }
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        //console.log(disabledInfo);
        return(
            <Aux>
                <Modal show = {this.state.purchasing}
                       modelClosed = {this.purchaseCancelHandler} >
                    <OrderSummary ingredients= {this.state.ingredients} 
                        purchaseCancelled = {this.purchaseCancelHandler}
                        purchaseContinued = {this.purchaseContinueHandler}
                        price = {this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                ingredientAdded = {(el)=>this.addIngredientHandler(el)}
                ingredientremoved = {(el)=>this.removeIngredientHandler(el)} 
                disabled = {disabledInfo} 
                ordered = {this.purchaseHandler}
                price = {this.state.totalPrice}
                purchasable = {this.state.purchasable}  />
            </Aux>
        );
    }
}
export default BurgerBuilder;