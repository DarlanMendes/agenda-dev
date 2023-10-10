import axios from "axios";
import { getSession } from "next-auth/react";
import { Pessoa } from "../../../types";
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
    pessoa: Pessoa
    msg: string
}
export default function editPessoa(props: Props) {
    const [pessoa, setPessoa] = useState<Pessoa>(props?.pessoa)
    const [edit, setEdit] = useState(false)
    const router = useRouter()

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                {!edit && <Button variant="text" size="small" color="inherit" onClick={() => { router.push('/dashboard') }}><ArrowBackIosIcon />Voltar</Button>}
                <h2>Editar Empresa</h2>
                {edit ?
                    <div className={styles.button}>
                        <button className={styles.save}>Salvar</button>
                        <button className={styles.cancel} onClick={()=>{setEdit(false);setPessoa(props.pessoa)}}>Cancelar</button>
                    </div>

                    :
                    <div className={styles.edit} onClick={() => { setEdit(true) }}>
                        Editar
                    </div>

                }
            </div>
            <div className={styles.infoPart}>
                <img src={pessoa.photoUrl} alt={pessoa.username} />
                {/* Nome usuaario ------------------------------------------------ */}
                <InputField
                    name={'username'}
                    text={pessoa.username}
                    label="Nome"
                    placeholder="Nome"
                    type="text" edit={edit}
                    pessoa={pessoa}
                    setPessoa={setPessoa}
                />
                {/* Profissão ------------------------------------------------ */}
                <InputField
                    name={'profession'}
                    text={pessoa.profession}
                    label="Profissão"
                    placeholder="Profissão"
                    type="text" edit={edit}
                    pessoa={pessoa}
                    setPessoa={setPessoa}
                />
                {/* Email ------------------------------------------------ */}
                <InputField
                    name={'email'}
                    text={pessoa.email}
                    label="E-mail"
                    placeholder="E-mail"
                    type="text" edit={edit}
                    pessoa={pessoa}
                    setPessoa={setPessoa}
                />
                {/* empresa------------------------------------------------ */}
                <InputField
                    name={'company'}
                    text={pessoa.company}
                    label="Empresa"
                    placeholder="Empresa"
                    type="text" edit={edit}
                    pessoa={pessoa}
                    setPessoa={setPessoa}
                />
                 {/* Data de nascimento ------------------------------------------------ */}
                 <InputField
                    name={'birthdate'}
                    text={pessoa.birthdate}
                    label="Data de nascimento"
                    placeholder="Data de nascimento"
                    type="text" edit={edit}
                    pessoa={pessoa}
                    setPessoa={setPessoa}
                />
                 {/* Sexo------------------------------------------------ */}
                 <InputField
                    name={'gender'}
                    text={pessoa.gender}
                    label="Sexo"
                    placeholder="Sexo"
                    type="text" edit={edit}
                    pessoa={pessoa}
                    setPessoa={setPessoa}
                />
                 {/* Telefone------------------------------------------------ */}
                 <InputField
                    name={'phoneNumber'}
                    text={pessoa.phoneNumber}
                    label="Telefone"
                    placeholder="Telefone"
                    type="text" edit={edit}
                    pessoa={pessoa}
                    setPessoa={setPessoa}
                />
                 {/* Whatsapp------------------------------------------------ */}
                 <InputField
                    name={'whatsappNumber'}
                    text={pessoa.whatsappNumber}
                    label="Whatsapp"
                    placeholder="Whatsapp"
                    type="text" edit={edit}
                    pessoa={pessoa}
                    setPessoa={setPessoa}
                />
                <SimpleMap/>



            </div>

        </div>

    )
}
export async function getServerSideProps(ctx: any) {
    try {
        const session = await getSession(ctx);

        if (session) {
            try {
                const requestPessoas = await axios(`http://localhost:3001/pessoas/${ctx.query.id}`)

                const { user } = session;
                return {
                    props: {
                        username: user?.name,
                        img: user?.image,
                        email: user?.email,
                        pessoa: requestPessoas?.data
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