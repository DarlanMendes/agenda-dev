// UserCard.js
import React from 'react';
import styles from'./styles.module.css';
import {LiaBirthdayCakeSolid} from 'react-icons/lia'
import { Pessoa } from '../../../types';
interface Props{
    aniversariante:Pessoa
}

export default function AniversarianteCard  (props:Props)  {
  return (
    <div className={styles.usercard}>
      <div className={styles.useravatar}>
        <img src={props.aniversariante?.photoUrl}/>
      </div>
      <div className={styles.userinfo}>
        <h2 className={styles.username}>nome</h2>
        <p className={styles.userdate}>date</p>
        <button className={styles.userbutton}>Envie um e-mail
        <LiaBirthdayCakeSolid/>
        </button>
      </div>
    </div>
  );
}

 
