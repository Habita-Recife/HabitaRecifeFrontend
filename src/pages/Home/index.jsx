import { useNavigate } from "react-router"

export function Home(){

    const navegation = useNavigate()

    return(

        <>
            <h1>Home teste</h1>
            <button onClick={()=> navegation("/login")}>Login</button>


        </>
    )


}