import React,{useState,useEffect} from 'react';
import './Assets/Fonts/RobotoMono-Regular.ttf'
import styles from './App.module.css'
import Authentication from './components/Authentication';


import { doc,getDoc,setDoc } from "firebase/firestore";
import {db,auth} from './Config/firebase'
import {signOut} from "firebase/auth"

import Matriz from './components/Matriz';

import logoutImage from './Assets/Images/logout.png'

function App() {

  const [logged,setLogged] = useState(false);
  const [userLogged,setUserLogged] = useState("");

  const [gf,setGf] = useState([]);
  const [gnf,setGnf] = useState([]);
  const [df,setDf] = useState([]);
  const [dnf,setDnf] = useState([]);

  useEffect(()=>{
    const userId = localStorage.getItem('userId')
    if(userId){
      userLoggedHandler(userId)
    }
  },[])

  async function logoutHandler(){
    await signOut(auth);
    localStorage.removeItem('userId');
    setLogged(false);
    setUserLogged("");
  }

  async function userLoggedHandler(uid){
    setUserLogged(uid);
    setLogged(true);
    localStorage.setItem('userId', uid);
    
    const userRef = doc(db, "users", `${uid}`);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      setGf(userData.gf || []);
      setGnf(userData.gnf || []);
      setDf(userData.df || []);
      setDnf(userData.dnf || []);
    } else {
      console.log("User does not exist!");
    }
    
  }

  async function createItemHandler(item,type){
    let updatedValues;
    
    if(type === 'gf'){
      updatedValues = {gf: [...gf, item]};
      setGf(prev => [...prev, item]);
    }

    if(type === 'gnf'){
      updatedValues = {gnf: [...gnf, item]};
      setGnf(prev => [...prev, item]);
    }

    if(type === 'df'){
      updatedValues = {df: [...df, item]};
      setDf(prev => [...prev, item]);
    }

    if(type === 'dnf'){
      updatedValues = {dnf: [...dnf, item]};
      setDnf(prev => [...prev, item]);
    }

    await setDoc(doc(db, "users", userLogged),updatedValues, { merge: true });
  }

  async function deleteItemHandler(index,type){
    let updatedValues;
    
    if(type === 'gf'){
      updatedValues = gf.filter(item => item.index !== index);
      setGf(prev => [...updatedValues])
    }

    if(type === 'gnf'){
      updatedValues = gnf.filter(item => item.index !== index);
      setGnf(prev => [...updatedValues])
    }

    if(type === 'df'){
      updatedValues = df.filter(item => item.index !== index);
      setDf(prev => [...updatedValues])
    }

    if(type === 'dnf'){
      updatedValues = dnf.filter(item => item.index !== index);
      setDnf(prev => [...updatedValues])
    }

    await setDoc(doc(db, "users", userLogged),updatedValues, { merge: true });
  }

  return (
    <div className={styles.app}>
      {!logged && <Authentication userLoggedHandler={userLoggedHandler}></Authentication>}
      {logged && 
        <div className={styles.header}>
          <button className={styles.logout} onClick={logoutHandler} >
            <div className={styles.logoutButton}>Sair</div>
            <img alt='logout' src={logoutImage} className={styles.logoutImage}></img>  
          </button> 
        </div>
      }
      {logged && <Matriz createItemHandler={createItemHandler} deleteItemHandler={deleteItemHandler} items={{gf,gnf,df,dnf}}></Matriz>}

    </div>
  );
}

export default App;
