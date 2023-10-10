import { Empresa, Pessoa } from '../../../types'
import styles from './styles.module.css'

interface Props{
    text:string
    type:string
    placeholder:string
    label:string
    name:string
    edit:boolean
    pessoa?:Pessoa
    empresa?:Empresa
    setEmpresa?:(arg1:any)=>void
    setPessoa?:(arg1:any)=>void
}
export default function InputField(props:Props){
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if(props.empresa&&props.setEmpresa){
            props.setEmpresa((previous:Empresa)=>({...previous,[name]:value}))
        }
        if(props.pessoa&&props.setPessoa){
            props.setPessoa((previous:Pessoa)=>({...previous,[name]:value}))
        }
        
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