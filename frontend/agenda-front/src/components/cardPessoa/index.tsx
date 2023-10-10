import styles from './styles.module.css'
import { Pessoa } from '../../../types'
import Image from 'next/image'
import whatsapp from '../../../public/assets/WhatsApp-icone.png'
import Link from 'next/link'
interface Props {
    pessoa: Pessoa
}
export default function CardPessoa(props: Props) {
    const imageStyle = {
        borderRadius: '50%',
        height:'20px',
        width:'20px'
      }
    return (
        <div className={styles.main}>
            <img src={props.pessoa.photoUrl} alt={props.pessoa.username} />
            <div >
                <h2>{props.pessoa.username}</h2>
                <Link href={`https://wa.me/${props.pessoa.whatsappNumber.replace('+', '')}`}>
                <div className={styles.number}>
                <h3>{props.pessoa.phoneNumber}</h3>
                <Image src={whatsapp} alt={`${props.pessoa.whatsappNumber}`} 
                style={imageStyle}
                />
                </div>
               
              
                
                </Link>
                
            </div>
           
                
           


        </div>
    )
}