import React from 'react';
import Aux from '../../../hoc/Auxilliary/Auxilliary';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';


const modal = (props)=>{
    

    return (
        <Aux>
            <Backdrop show = {props.show} clicked= {props.modalClosed}/>
            <div className = {classes.Modal}
                style = {{
                    transform : props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity : props.show ? '1':'0'       
                }}>
                {props.children}
            </div>
        </Aux>
    );
}


export default modal;
    

