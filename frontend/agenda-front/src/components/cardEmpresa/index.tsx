import styles from './styles.module.css'
import { Empresa} from '../../../types'
import Image from 'next/image'
import whatsapp from '../../../public/assets/WhatsApp-icone.png'
import Link from 'next/link'
interface Props {
    empresa: Empresa
}
export default function CardEmpresa(props: Props) {
    const imageStyle = {
        borderRadius: '50%',
        height:'40px',
        width:'40px'
      }
    return (
        <div className={styles.main}>
            <img src={props.empresa.logoUrl} alt={props.empresa.nomeFantasia} />
            <div >
                <h2>{props.empresa.nomeFantasia}</h2>
                <h3>{props.empresa.telefoneFixo}</h3>
            </div>
           
                <Link href={`https://wa.me/${props.empresa.whatsappNumber.replace('+', '')}`}>
                <div>
                <Image src={whatsapp} alt={`${props.empresa.telefoneFixo}`} 
                style={imageStyle}
                />
                </div>
               
              
                
                </Link>
           


        </div>
    )
}