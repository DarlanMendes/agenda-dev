import {GiHamburgerMenu} from 'react-icons/gi'
import styles from './styles.module.css'

interface Props {
    user:{
        username: string;
        img: string;
        email: string
    }
    
}
export default function Header(props: Props) {
    const colorHamburguer= 'white'
    let {user}=props
    return (
        <div className={`${styles.main}`}>
            <div className={`${styles.user}`}>
                <img src={user.img} alt='Imagem usuário' />
                <h1>Olá, {user.username}</h1>
            </div>
            <div style={{ color:'white'}}>
                <GiHamburgerMenu/>
            </div>
           
        </div>
    )
}
