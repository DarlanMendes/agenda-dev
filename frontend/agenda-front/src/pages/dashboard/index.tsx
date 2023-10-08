import Header from "@/components/header";
import { getSession } from 'next-auth/react';
import styles from './styles.module.css'
import { Pessoa, Empresa } from '../../../types'
import CardPessoa from "@/components/cardPessoa";
import axios from "axios";
import CardEmpresa from "@/components/cardEmpresa";
interface Props {
    username: string;
    img: string;
    email: string;
    pessoas: Pessoa[];
    empresas:Empresa[]
}
export default function Dashboard(props: Props) {
    return (
        <div className={`${styles.main}`}>
            <Header user={props} />
            {/* Empresas  seção Cards de empresa */}

            <h2> Meus Contatos</h2>
            <div className={styles.listCard}>
                {props.pessoas.map((pessoa, index) => (
                    <CardPessoa key={index} pessoa={pessoa} />
                ))}
            </div>

            {/* Empresas  seção Cards de empresa */}
            <h2> Empresas</h2>
            <div className={styles.listCard}>
                {props.empresas.map((empresa, index) => (
                    <CardEmpresa key={index} empresa={empresa} />
                ))}
            </div>




        </div>
    )
}


export async function getServerSideProps(ctx: any) {
    const session = await getSession(ctx);
    const requestPessoas = await axios('http://localhost:3001/pessoas')
    const requestEmpresas = await axios('http://localhost:3001/empresas')
    
    if (session) {
        const { user } = session;
        return {
            props: {
                username: user?.name,
                img: user?.image,
                email: user?.email,
                pessoas: requestPessoas?.data,
                empresas:requestEmpresas?.data
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
}