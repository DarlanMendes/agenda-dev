import Head from 'next/head'

import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Button from '@/components/button'
import logo from '../../public/assets/logo-agenda.png'
import Image from 'next/image'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Image src={logo} alt='logo' />
        <h2>Conectando Talentos e Empresas, Um Cadastro de Cada Vez!"</h2>
        <div className={`${styles.button}`}>
          <Link href={'/login'}>
            <Button text='Vamos lá' />
          </Link>

        </div>


      </main>
    </>
  )
}
