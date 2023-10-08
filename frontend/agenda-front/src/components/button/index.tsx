import styles from "@/components/button/styles.module.css"
type Props={
    text:string
}
export default function Button(props:Props){
    return(
    <button className={`${styles.button}`}>
        {props.text}
    </button> )
}