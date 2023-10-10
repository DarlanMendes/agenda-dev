import axios from "axios";
import { getSession } from "next-auth/react";
import { Empresa } from "../../../types";
import styles from './styles.module.css'
import { Button } from "@mui/material";
import { useRouter } from "next/router"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useState } from "react";

import InputField from "@/components/imputField";
import SimpleMap from "@/components/Map";



interface Props {
    username: string;
    img: string;
    email: string;
    empresa: Empresa
    msg: string
}
export default function editEmpresa(props: Props) {
    const [empresa, setEmpresa] = useState<Empresa>(props?.empresa)
    const [edit, setEdit] = useState(false)
    const router = useRouter()
    const[lat, setLat]=useState(-3.7)
    const[lng, setLng]=useState(-37.8)
    const[endereco, setEndereco]=useState(props.empresa.endereco)
    return (
        <div className={styles.main}>
            <div className={styles.header}>
                {!edit && <Button variant="text" size="small" color="inherit" onClick={() => { router.push('/dashboard') }}><ArrowBackIosIcon />Voltar</Button>}
                <h2>Editar Empresa</h2>
                {edit ?
                    <div className={styles.button}>
                        <button className={styles.save}>Salvar</button>
                        <button className={styles.cancel} onClick={()=>{setEdit(false);setEmpresa(props.empresa)}}>Cancelar</button>
                    </div>

                    :
                    <div className={styles.edit} onClick={() => { setEdit(true) }}>
                        Editar
                    </div>

                }
            </div>
            <div className={styles.infoPart}>
                <img src={empresa.logoUrl} alt={empresa.nomeFantasia} />
                {/* Razão Social ------------------------------------------------ */}
                <InputField
                    name={'razaoSocial'}
                    text={empresa.razaoSocial}
                    label="Razão Social"
                    placeholder="Razão Social"
                    type="text" edit={edit}
                    empresa={empresa}
                    setEmpresa={setEmpresa}
                />
                {/* Nome Fantasia ------------------------------------------------ */}
                <InputField
                    name={'nomeFantasia'}
                    text={empresa.nomeFantasia}
                    label="Nome Fantasia"
                    placeholder="Nome Fantasia"
                    type="text" edit={edit}
                    empresa={empresa}
                    setEmpresa={setEmpresa}
                />
                {/* Email ------------------------------------------------ */}
                <InputField
                    name={'email'}
                    text={empresa.email}
                    label="E-mail"
                    placeholder="E-mail"
                    type="text" edit={edit}
                    empresa={empresa}
                    setEmpresa={setEmpresa}
                />
                {/* Razão Social ------------------------------------------------ */}
                <InputField
                    name={'cnpj'}
                    text={empresa.cnpj}
                    label="CNPJ"
                    placeholder="CNPJ"
                    type="text" edit={edit}
                    empresa={empresa}
                    setEmpresa={setEmpresa}
                />
                 {/* Responsável ------------------------------------------------ */}
                 <InputField
                    name={'responsavel'}
                    text={empresa.responsavel}
                    label="Responsável"
                    placeholder="Responsável"
                    type="text" edit={edit}
                    empresa={empresa}
                    setEmpresa={setEmpresa}
                />
                 {/* Whatsapp------------------------------------------------ */}
                 <InputField
                    name={'whatsappNumber'}
                    text={empresa.whatsappNumber}
                    label="Whatsapp"
                    placeholder="whatsapp"
                    type="text" edit={edit}
                    empresa={empresa}
                    setEmpresa={setEmpresa}
                />
                 {/* Celular------------------------------------------------ */}
                 <InputField
                    name={'celular'}
                    text={empresa.celular}
                    label="Celular"
                    placeholder="Celular"
                    type="text" edit={edit}
                    empresa={empresa}
                    setEmpresa={setEmpresa}
                />
                 {/* Telefone fixo------------------------------------------------ */}
                 <InputField
                    name={'telefoneFixo'}
                    text={empresa.telefoneFixo}
                    label="Telefone Fixo"
                    placeholder="Telefone Fixo"
                    type="text" edit={edit}
                    empresa={empresa}
                    setEmpresa={setEmpresa}
                />
           
           <SimpleMap 
            lat={lat}
            setLat={setLat} 
            lng={lng}
            setLng={setLng}
            edit={edit}
            endereco={endereco}
            setEndereco={setEndereco}
           />



            </div>

        </div>

    )
}
export async function getServerSideProps(ctx: any) {
    try {
        const session = await getSession(ctx);

        if (session) {
            try {
                const requestEmpresas = await axios(`http://localhost:3001/empresas/${ctx.query.id}`)

                const { user } = session;
                return {
                    props: {
                        username: user?.name,
                        img: user?.image,
                        email: user?.email,
                        empresa: requestEmpresas?.data
                    }
                }
            } catch (e) {
                return {
                    props: {
                        msg: e
                    }
                }
            }

        } else {
            return {
                redirect: {
                    destination: "/login",
                    permanent: false
                }
            }
        }
    } catch (e) {
        return {
            props: {
                msg: e
            }
        }
    }

}