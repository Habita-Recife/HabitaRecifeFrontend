import { useNavigate } from "react-router"

export function Login(){

    const navegation = useNavigate()
    return(
        <>
            <h1>Login teste!</h1>
            <button onClick={()=> navegation("/")}>Voltar</button>
        
        </>
    )
}