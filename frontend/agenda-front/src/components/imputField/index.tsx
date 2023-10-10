import { Empresa } from '../../../types'
import styles from './styles.module.css'

interface Props{
    text:string
    type:string
    placeholder:string
    label:string
    name:string
    edit:boolean
    empresa:Empresa
    setEmpresa:(arg1:any)=>void
}
export default function InputField(props:Props){
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        props.setEmpresa((previous:Empresa)=>({...previous,[name]:value}))
    };
    return(
        <div className={styles.main}>
            <span>{props.label}</span>
            <input type={props.type} placeholder={props.placeholder} value={props.text} name={props.name} disabled={!props.edit}
            required
             onChange={handleChange}/>
        </div>
    )
}