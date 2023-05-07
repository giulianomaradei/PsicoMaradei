import React, { useState } from "react";

import styles from './Cell.module.css'
import Item from "./Item";

function Cell(props){

    const [inputItem,setInputItem] = useState([]);

    function inputChangeHandler(e){
        setInputItem(e.target.value)
    }

    function createItemHandler(){
        props.createItemHandler({title:inputItem,index:Math.random()},props.type);
        setInputItem("");
    }

    function deleteItemHandler(index){
        props.deleteItemHandler(index,props.type);
    }

    const itensContent = props.itens.map((item)=>
        <Item className={styles.cell} index={item.index} deleteItemHandler={deleteItemHandler}>{item.title}</Item>
    );

    
    return(
        <div className={props.className}>
                <div className={styles.cellFrame}>
                   <div className={styles.title}>{props.cellTitle}</div>
                    <ul className={styles.itens}>
                        {itensContent}
                    </ul>
                    <div className={styles.addNewItem}>
                        <input className={styles.input} value={inputItem} onChange={inputChangeHandler}></input>
                        <button className={styles.button} onClick={createItemHandler}>Adicionar</button>  
                    </div>
                    
                </div>
                
        </div>
    )
}

export default Cell;