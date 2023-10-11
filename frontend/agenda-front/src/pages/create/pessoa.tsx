import { useState } from 'react'
import styles from './styles.module.css'
import { Button } from '@mui/material'

import { useRouter } from 'next/router'
import InputField from '@/components/imputField'
import SimpleMap from '@/components/Map'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from 'axios'

export default function CreatePessoa(){
    const [pessoa,setPessoa]=useState<any>({ username: "", email: "",
        birthdate: "",
        address: "",
        gender: "",
        profession: "",
        company: "",
        whatsappNumber: "",
        phoneNumber: "",
        photoUrl: "",
        lat:0,
        lng:0
        })
    const [lat, setLat]=useState(0)
    const [lng, setLng]=useState(0)
    const[endereco, setEndereco]=useState('')
    const router = useRouter()
    const handleCreate=async()=>{
        if(confirm("Realmente Deseja Criar esse Contato?")){
            console.log(pessoa)
            try {
                const response =  await axios.post(`http://localhost:3001/pessoas`,pessoa)
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
                <img src={pessoa?.photoUrl} alt={pessoa?.username} />
                {/* Nome usuaario ------------------------------------------------ */}
                <InputField
                    name={'username'}
                    text={pessoa?.username}
                    label="Nome"
                    placeholder="Nome"
                    type="text" edit={true}
                    pessoa={pessoa}
                    setPessoa={setPessoa}
                />
                {/* Profissão ------------------------------------------------ */}
                <InputField
                    name={'profession'}
                    text={pessoa?.profession}
                    label="Profissão"
                    placeholder="Profissão"
                    type="text" edit={true}
                    pessoa={pessoa}
                    setPessoa={setPessoa}
                />
                {/* Email ------------------------------------------------ */}
                <InputField
                    name={'email'}
                    text={pessoa?.email}
                    label="E-mail"
                    placeholder="E-mail"
                    type="text" edit={true}
                    pessoa={pessoa}
                    setPessoa={setPessoa}
                />
                {/* empresa------------------------------------------------ */}
                <InputField
                    name={'company'}
                    text={pessoa?.company}
                    label="Empresa"
                    placeholder="Empresa"
                    type="text" edit={true}
                    pessoa={pessoa}
                    setPessoa={setPessoa}
                />
                 {/* Data de nascimento ------------------------------------------------ */}
                 <InputField
                    name={'birthdate'}
                    text={pessoa?.birthdate}
                    label="Data de nascimento"
                    placeholder="Data de nascimento"
                    type="date" edit={true}
                    pessoa={pessoa}
                    setPessoa={setPessoa}
                />
                 {/* Sexo------------------------------------------------ */}
                 <InputField
                    name={'gender'}
                    text={pessoa?.gender}
                    label="Sexo"
                    placeholder="Sexo"
                    type="text" edit={true}
                    pessoa={pessoa}
                    setPessoa={setPessoa}
                />
                 {/* Telefone------------------------------------------------ */}
                 <InputField
                    name={'phoneNumber'}
                    text={pessoa?.phoneNumber}
                    label="Telefone"
                    placeholder="Telefone"
                    type="text" edit={true}
                    pessoa={pessoa}
                    setPessoa={setPessoa}
                />
                 {/* Whatsapp------------------------------------------------ */}
                 <InputField
                    name={'whatsappNumber'}
                    text={pessoa?.whatsappNumber}
                    label="Whatsapp"
                    placeholder="Whatsapp"
                    type="text" edit={true}
                    pessoa={pessoa}
                    setPessoa={setPessoa}
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