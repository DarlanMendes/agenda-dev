import axios from "axios";
import { getSession } from "next-auth/react";
import { Pessoa } from "../../../types";
import styles from './styles.module.css'
import { Button } from "@mui/material";
import { useRouter } from "next/router"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useState } from "react";
import { supabase } from '@/supabase'
import InputField from "@/components/imputField";
import SimpleMap from "@/components/Map";
import { v4 as uuidv4 } from "uuid";
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
    const [lat, setLat] = useState(props?.pessoa.lat)
    const [lng, setLng] = useState(props?.pessoa.lng)
    const [endereco, setEndereco] = useState(props.pessoa.address)
    const router = useRouter()

    const handleUpload = async () => {
        const { username, email, birthdate, gender, profession, company, whatsappNumber, phoneNumber, photoUrl } = pessoa
        const bodyPessoa = {
            username, email, birthdate, gender, profession, company, whatsappNumber, phoneNumber, photoUrl, lat: lat, lng: lng, address: endereco
        }
        console.log(bodyPessoa)
        try {
            const data = await axios.put(`http://localhost:3001/pessoas/${pessoa.id}`, bodyPessoa)
            if (data) {
                alert('Dados atualizados com sucesso')
                router.push('/dashboard')
            } else {
                alert('Erro ao atualizar dados')
            }
        } catch (e) {
            alert(`Ocorreu um erro: ${e}`)
        }
    }
    const handleDelete = async () => {
        if (confirm("Realmente Deseja Deletar esse Contato?")) {
            try {
                const response = await axios.delete(`http://localhost:3001/pessoas/${pessoa.id}`)
                if (response) {
                    alert('Contato deletado com Sucesso!')
                    router.push('/dashboard')
                }
            } catch (e) {
                alert(`Ocorreu um erro: ${e}`)
            }
        }
    }

   




        const handleFileSelected = async(e: any) => {
            const file = e.target.files[0];
            const filename = `/avp/${file.name}`;

            const { data, error } = await supabase.storage
                .from("image")
                .upload(filename, file, {
                    cacheControl: "3600",
                    upsert: false,
                });
            if (data) {
                return setPessoa((previous) => ({ ...previous, photoUrl: data?.path }))
            } else {
                console.log(error)
            }


        }
        return (
            <div className={styles.main}>
                <div className={styles.header}>
                    {!edit && <Button variant="text" size="small" color="inherit" onClick={() => { router.push('/dashboard') }}><ArrowBackIosIcon />Voltar</Button>}
                    <h2>Editar Contato</h2>
                    {edit ?
                        <div className={styles.button}>
                            <button className={styles.save} onClick={() => { handleUpload() }}>Salvar</button>
                            <button className={styles.cancel} onClick={() => { setEdit(false); setPessoa(props.pessoa) }}>Cancelar</button>
                        </div>

                        :
                        <div className={styles.edit} onClick={() => { setEdit(true) }}>
                            Editar
                        </div>

                    }
                </div>
                <div className={styles.infoPart}>
                    <img src={pessoa.photoUrl} alt={pessoa.username} />
                    <input type="file" onChange={(e) => { handleFileSelected(e) }} />
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
                        type="date" edit={edit}
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
                    <SimpleMap
                        lat={lat}
                        setLat={setLat}
                        lng={lng}
                        setLng={setLng}
                        edit={edit}
                        endereco={endereco}
                        setEndereco={setEndereco}
                    />

                    <button
                        onClick={() => { handleDelete() }}
                        className={styles.deleteButton}
                    >Deletar Contato
                    </button>

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