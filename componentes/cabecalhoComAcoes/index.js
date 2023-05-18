import Image from "next/image";

export default function CabecalhoComAcoes ({
    
    className,
    iconeEsquerda,
    textoEsquerda = null,
    aoClicarAcaoEsquerda,
    titulo,
    elementoDireita,
    aoClicarElementoDireita,

}) {
    return (
        <div className={`cabecalhoComAcoes ${className}`}>
            {iconeEsquerda ? (
                <Image
                    src={iconeEsquerda}
                    alt= 'icone esquerda cabecalho com açoes'
                    onClick={aoClicarAcaoEsquerda}
                    width={25}
                    height={25}
                />
            ) :(
                textoEsquerda !== null && (
                    <span className="cabecalhoAcoesTextoEsquerda" onClick ={aoClicarAcaoEsquerda}>
                        {textoEsquerda}
                    </span>
                )
            )}

            <h3>{titulo}</h3>
                
            {elementoDireita && (
                <button
                    type='button'
                    className="btnAcaoDireita"
                    onClick={aoClicarElementoDireita}
                >   
                    {elementoDireita}

                </button>
            )}    
        </div>
    )
}