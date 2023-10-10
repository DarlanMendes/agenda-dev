import Header from "@/components/header";
import { getSession } from 'next-auth/react';
import styles from './styles.module.css'
import { Pessoa, Empresa } from '../../../types'
import CardPessoa from "@/components/cardPessoa";
import axios from "axios";
import CardEmpresa from "@/components/cardEmpresa";
import AniversarianteCard from "@/components/AniversarianteCard";
import {  parse, } from 'date-fns';

interface Props {
    username: string;
    img: string;
    email: string;
    pessoas: Pessoa[];
    empresas: Empresa[]
}
export default function Dashboard(props: Props) {
    function calcularDiferencaEmDias(dataNascimento: string): number {
        const dataNascimentoDate = parse(dataNascimento, 'yyyy-MM-dd',new Date());
        const hoje = new Date();
        return Math.abs((hoje.getTime() - dataNascimentoDate.getTime()) / (24 * 60 * 60 * 1000)); //conta a diferença em dias 
    }
    function organizarAniversariantes(pessoas: Pessoa[]): Pessoa[] {
        const hoje = new Date();
        const aniversariantesDoMes = pessoas.filter((pessoa) => {
            const dataNascimento = parse(pessoa.birthdate,'yyyy-MM-dd', new Date());
            return dataNascimento.getMonth() === hoje.getMonth();
        });

        aniversariantesDoMes.sort((a, b) => {
            const diferencaA = Math.abs(calcularDiferencaEmDias(a.birthdate));
            const diferencaB = Math.abs(calcularDiferencaEmDias(b.birthdate));
            return diferencaA - diferencaB;
        });

        return aniversariantesDoMes;
    }
    // Suponha que você tenha uma lista de pessoas
    const listaDePessoas: Pessoa[] = [...props.pessoas]; // Preencha com seus dados

    const aniversariantesOrganizados = organizarAniversariantes(listaDePessoas);

    
   


    return (
        <div className={`${styles.main}`}>
            <Header user={props} />
            {/* Empresas  seção Cards de empresa */}
            <div className={styles.content}>
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
            <h2>Aniversariantes do Mês</h2>
            <div className={styles.listCard}>
            {aniversariantesOrganizados.map((aniversariante, index)=>(
                <AniversarianteCard key={index} aniversariante={aniversariante}  />
            ))}
            </div>

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
                empresas: requestEmpresas?.data
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