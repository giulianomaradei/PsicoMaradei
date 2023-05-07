import styles from './Item.module.css'

function Item(props){

    function deleteItemHandler(){
        props.deleteItemHandler(props.index);
    }


    return(
        <li onClick={deleteItemHandler} className={styles.itemName}>
            {props.children}
        </li>
    )
}

export default Item