import Header from "@/components/header";
import { getSession } from 'next-auth/react';
import styles from './styles.module.css'
import { Pessoa, Empresa } from '../../../types'
import CardPessoa from "@/components/cardPessoa";
import axios from "axios";
import CardEmpresa from "@/components/cardEmpresa";
import AniversarianteCard from "@/components/AniversarianteCard";
import {  parse, } from 'date-fns';
import BotaoCriar from "@/components/botaoCriar";
import { useState } from "react";
import { useRouter } from "next/router";


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
    
    const listaDePessoas: Pessoa[] = [...props.pessoas]; // Preencha com seus dados

    const aniversariantesOrganizados = organizarAniversariantes(listaDePessoas);

    
   const[busca, setBusca] = useState('')
   const [filtrados, setFiltrados] = useState<Pessoa[]>()
    const handleBusca=(e:any)=>{
        console.log(busca)
        let filtrado :Pessoa[]=[]
        e.preventDefault()
        setBusca(e.target.value)
        if(busca.length>3){
            props.pessoas.forEach((pessoa)=>{
                console.log(pessoa.username.includes(busca), busca)
                if(pessoa.username.toLowerCase().includes(busca.toLowerCase())){
                    
                    filtrado.push(pessoa)
                }
            
            })
            setFiltrados(filtrado)
            console.log(filtrado)
        }else{
            setFiltrados([])
        }

    }
    const router = useRouter()

    return (
        <div className={`${styles.main}`}>
            <Header user={props} />
            {/* Empresas  seção Cards de empresa */}
            <div className={styles.content}>
            
            <input placeholder="Digite sua busca" onChange={(e)=>{handleBusca(e)}} className={styles.inputFiltrados}/>
            {filtrados?.map((filtrado,index)=>(
            <div key={index} className={styles.filtrados} onClick={()=>{router.push(`/edit-contato/${filtrado.id}`)}}>
                {filtrado.username}
            </div>
            ))}
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
           
            
            <BotaoCriar/>

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