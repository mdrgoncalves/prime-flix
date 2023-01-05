import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IFilme from "interfaces/IFilme";
import "./favoritos.css";
import { toast } from 'react-toastify';

const Favoritos: React.FC = () => {

    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem("@primeflix");
        setFilmes(JSON.parse(minhaLista!) || []);
    }, [])

    const excluirFilme = (id: number) => {
        let filtroFilmes = filmes.filter((filme: IFilme) => {
            return filme.id !== id;
        })

        setFilmes(filtroFilmes);
        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
        toast.success("Filme excluído com sucesso!");
    }

    return (
        <div className="meus-filmes">
            <h1>Meus favoritos</h1>
            {filmes.length === 0 && <span>Você não possui nenhum filme salvo :(</span>}
            <ul>
                {filmes.map((filme: IFilme) => (
                    <li key={filme.id}>
                        <span>{filme.title}</span>
                        <img 
                            src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} 
                            alt={filme.title} 
                        />
                        <div className="buttons">
                            <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
                            <button 
                                onClick={() => excluirFilme(filme.id)}
                            >
                                Excluir
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Favoritos;