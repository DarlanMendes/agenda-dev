import { useState } from 'react'
import styles from './styles.module.css'
import { Button } from '@mui/material'

import { useRouter } from 'next/router'
import InputField from '@/components/imputField'
import SimpleMap from '@/components/Map'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from 'axios'

export default function CreatePessoa(){
    const [empresa,setEmpresa]=useState<any>({ 
        razaoSocial: '',
    nomeFantasia: '',
    email: '',
    cnpj: '',
    responsavel: '',
    whatsappNumber: '',
    celular: '',
    telefoneFixo: '',
    endereco: '',
    logoUrl: '',
    lat:0,
    lng: 0
        })
    const [lat, setLat]=useState(0)
    const [lng, setLng]=useState(0)
    const[endereco, setEndereco]=useState('')
    const router = useRouter()
    const handleCreate=async()=>{
        if(confirm("Realmente Deseja Criar esse Contato?")){
            console.log(empresa)
            try {
                const response =  await axios.post(`http://localhost:3001/empresas`,empresa)
                if (response){
                    alert('Contato criado com Sucesso!')
                    router.push('/dashboard')
                }
            }catch(e){
                alert(`Ocorreu um erro: ${e}`)
            }
        }
    }
    return(
        <div className={styles.main}>
            <div className={styles.header}>
                 <Button variant="text" size="small" color="inherit" onClick={() => { router.push('/dashboard') }}><ArrowBackIosIcon />Voltar</Button>
                <h2>Criar Contato</h2>
                
               
            </div>
            <div className={styles.infoPart}>
                <img src={empresa?.photoUrl} alt={empresa?.username} />
                {/* Razão Social ------------------------------------------------ */}
                <InputField
                    name={'razaoSocial'}
                    text={empresa.razaoSocial}
                    label="Razão Social"
                    placeholder="Razão Social"
                    type="text" edit={true}
                    empresa={empresa}
                    setEmpresa={setEmpresa}
                />
                {/* Nome Fantasia ------------------------------------------------ */}
                <InputField
                    name={'nomeFantasia'}
                    text={empresa.nomeFantasia}
                    label="Nome Fantasia"
                    placeholder="Nome Fantasia"
                    type="text" edit={true}
                    empresa={empresa}
                    setEmpresa={setEmpresa}
                />
                {/* Email ------------------------------------------------ */}
                <InputField
                    name={'email'}
                    text={empresa.email}
                    label="E-mail"
                    placeholder="E-mail"
                    type="text" edit={true}
                    empresa={empresa}
                    setEmpresa={setEmpresa}
                />
                {/* Razão Social ------------------------------------------------ */}
                <InputField
                    name={'cnpj'}
                    text={empresa.cnpj}
                    label="CNPJ"
                    placeholder="CNPJ"
                    type="text" edit={true}
                    empresa={empresa}
                    setEmpresa={setEmpresa}
                />
                {/* Responsável ------------------------------------------------ */}
                <InputField
                    name={'responsavel'}
                    text={empresa.responsavel}
                    label="Responsável"
                    placeholder="Responsável"
                    type="text" edit={true}
                    empresa={empresa}
                    setEmpresa={setEmpresa}
                />
                {/* Whatsapp------------------------------------------------ */}
                <InputField
                    name={'whatsappNumber'}
                    text={empresa.whatsappNumber}
                    label="Whatsapp"
                    placeholder="whatsapp"
                    type="text" edit={true}
                    empresa={empresa}
                    setEmpresa={setEmpresa}
                />
                {/* Celular------------------------------------------------ */}
                <InputField
                    name={'celular'}
                    text={empresa.celular}
                    label="Celular"
                    placeholder="Celular"
                    type="text" edit={true}
                    empresa={empresa}
                    setEmpresa={setEmpresa}
                />
                {/* Telefone fixo------------------------------------------------ */}
                <InputField
                    name={'telefoneFixo'}
                    text={empresa.telefoneFixo}
                    label="Telefone Fixo"
                    placeholder="Telefone Fixo"
                    type="text" edit={true}
                    empresa={empresa}
                    setEmpresa={setEmpresa}
                />
                <SimpleMap 
                lat={lat}
                setLat={setLat} 
                lng={lng}
                setLng={setLng}
                edit={true}
                endereco={endereco}
                setEndereco={setEndereco}
                />
                 <button 
                onClick={()=>{handleCreate()}}
                className={styles.createButton}
                >Criar Contato
                </button>
                

            </div>

        </div>
    )
}