import styles from './styles.module.css'
import { Empresa } from '../../../types'
import Image from 'next/image'
import whatsapp from '../../../public/assets/WhatsApp-icone.png'
import Link from 'next/link'
import { useRouter } from 'next/router'
interface Props {
    empresa: Empresa
}
export default function CardEmpresa(props: Props) {
    const imageStyle = {
        borderRadius: '50%',
        height: '20px',
        width: '20px'
    }
    const router = useRouter()
    return (
        <div className={styles.main} onClick={()=>{router.push(`/edit-empresa/${props.empresa.id}`)}}>
            <img src={props.empresa.logoUrl} alt={props.empresa.nomeFantasia} />
            <div >
                <h2>{props.empresa.nomeFantasia}</h2>
                <Link href={`https://wa.me/${props.empresa.whatsappNumber.replace('+', '')}`}>
                    <div className={`${styles.number}`}>
                        <h3>{props.empresa.telefoneFixo}</h3>
                        <Image src={whatsapp} alt={`${props.empresa.telefoneFixo}`}
                            style={imageStyle}
                        />
                    </div>
                </Link>
            </div>





        </div>
    )
}