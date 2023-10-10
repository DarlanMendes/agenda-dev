import logo from '../../../public/assets/logo-agenda.png'
import Image from 'next/image'
import styles from './styles.module.css'
import Button from '@/components/button'
import { FcGoogle } from 'react-icons/fc'
import {IconContext} from 'react-icons'
import { getSession, signIn } from 'next-auth/react'
export default function Login() {
    return (
        <main className={`${styles.main}`}>
            <Image src={logo} alt='logo' />
            <div className={`${styles.button}`  } onClick={()=>{signIn('google')}}>

                <Button text='Continuar com' />
                <IconContext.Provider value={{ color: "blue", className: `${styles.google}`}}>
                    <FcGoogle />
                </IconContext.Provider>


            </div>
        </main>
    )
}
export async function getServerSideProps(ctx: any) {
    const session = await getSession(ctx);

  if (session) {
    const { user } = session;
    return{
        redirect:{
            destination:'/dashboard',
            permanent:false
        }
    }
  }else{
    return{
        props:{}
    }
  }
}