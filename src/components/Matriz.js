import { useState } from 'react';
import styles from './Matriz.module.css'
import Cell from './Cell';

function Matriz(props){
    const {gf,gnf,df,dnf} = props.items;

    const gfArray = Object.values(gf);
    const gnfArray = Object.values(gnf);
    const dfArray = Object.values(df);
    const dnfArray = Object.values(dnf);

    function createItemHandler(item,type){
        props.createItemHandler(item,type);
    }

    function deleteItemHandler(index,type){
        props.deleteItemHandler(index,type);
    }

    return(
        <div className={styles.matriz}>
            <Cell className={`${styles.cell} ${styles.yellow}`} itens={gfArray} type="gf" createItemHandler={createItemHandler} deleteItemHandler={deleteItemHandler} cellTitle = "Gosto e faço"/>
            <Cell className={`${styles.cell} ${styles.green}`} itens={gnfArray} type="gnf" createItemHandler={createItemHandler} deleteItemHandler={deleteItemHandler} cellTitle = "Gosto e não faço"/>
            <Cell className={`${styles.cell} ${styles.red}`} itens={dfArray} type="df" createItemHandler={createItemHandler} deleteItemHandler={deleteItemHandler} cellTitle = "Não gosto e faço"/>
            <Cell className={`${styles.cell} ${styles.blue}`} itens={dnfArray} type="dnf" createItemHandler={createItemHandler} deleteItemHandler={deleteItemHandler}cellTitle = "Não gosto e não faço"/>
        </div>
    )
}

export default Matriz;