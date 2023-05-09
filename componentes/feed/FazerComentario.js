import { useState } from "react";
import Avatar from "../avatar";



export function FazerComentario({usuarioLogado, comentar}) {
    const[linhas, setLinhas] = useState(1);
    const [comentario, setComentario] = useState('');

    const aoDigitarComentario = (e) => {
        const valorInput = e.target.value;
        setComentario(valorInput);
        setLinhas (valorInput.length > 0 ? 2 : 1);
    }

    const aoPrecionarQualquerTecla = (e) => {
        if (e.key === 'Enter'){
            fazerComentario();

        }
        
    }

    const fazerComentario = () =>{
        if (comentario.trim().length === 0 || !comentar ){
            return;
        }
        comentar(comentario);
       
    }

    return (
        <div className="containerFazerComentario">
            <Avatar src={usuarioLogado.avatar}/>
            <textarea
                 rows={linhas}
                 onChange={aoDigitarComentario}
                 onKeyDown={aoPrecionarQualquerTecla}//onKEY esta recebendo evendo de precionar o Enter
                 value={comentario}
                 placeholder='Adicione um comentario'>
            </textarea>

            <button 
                type="button"
                className=" btnPublicacao desktop "
                onClick={fazerComentario}
            >

                Publicar
            </button>

        </div>
    )
}