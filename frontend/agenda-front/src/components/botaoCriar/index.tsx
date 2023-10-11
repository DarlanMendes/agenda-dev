import { useState } from 'react'
import styles from './styles.module.css'
import { useRouter } from 'next/router'
export default function BotaoCriar(){
    const[isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    return(
        <div className={styles.main}>
            {isOpen&&
            
                <div className={styles.containerButton}>
                    <h2> Criar</h2>
                    <button onClick={()=>{router.push('/create/pessoa')}}> Contato Pessoa</button>
                    <button onClick={()=>{router.push('/create/empresa')}}> Contato Empresa</button>
                </div>}
            <button className={styles.createButton} onClick={()=>{setIsOpen(!isOpen)}}>+</button>
        </div>
    )
}