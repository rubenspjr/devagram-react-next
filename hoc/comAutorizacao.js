import { useRouter } from "next/router"
import UsuarioService from "../services/UsuarioService"
import Cabecalho from "../componentes/layout/Cabecalho";
import Rodape from "../componentes/layout/Footer";

const usuarioService = new UsuarioService

export default function comAutorizacao(Componente){
    return (props) =>{
        const router = useRouter();
        if (typeof window !== 'undefined'){
            if(!usuarioService.estaAutenticado()) {
                router.replace('/');
                return null;
            }
            
            return(
                <>
                    <Cabecalho/>
                    <Componente {...props} />
                    <Rodape/>

                </>
            )

        }
        return null
    }
}