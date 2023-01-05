import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import IFilme from "interfaces/IFilme";
import api from "services/api";
import "./filme-info.css";
import { toast } from 'react-toastify';

const Filme: React.FC = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({} as IFilme);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "635d7bb326f6496e4d097671bf2244e1",
                    language: "pt-BR"
                }
            })
            .then((response) => {
                setFilme(response.data);
                setLoading(false);
            })
            .catch(() => {
                navigate("/", { replace: true });
                return;
            })
        }

        loadFilme();

        return(() => {
            console.log("Componente desmontado");
        })
    }, [id, navigate])

    const salvarFilme = () => {
        const minhaLista = localStorage.getItem("@primeflix");
        let filmesSalvos = JSON.parse(minhaLista!) || [];

        const hasFilme = filmesSalvos.some((filmeSalvo: IFilme) => filmeSalvo.id === filme.id)
        if (hasFilme) {
            toast.warn("Você já possui esse filme salvo.");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!");
    }

    if (loading) {
        return (
            <div className="filme-info">
                <h2>Carregando detalhes...</h2>
            </div>
        )
    }

    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img 
                src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} 
                alt={filme.title} 
            />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {Math.round(filme.vote_average * 100) / 100} / 10</strong>

            <div className="area-buttons">
                <button
                    onClick={salvarFilme}
                >
                    Salvar
                </button>
                <button>
                    <a
                        target="blank"
                        rel="noreferrer"
                        href={`https://youtube.com/results?search_query=${filme.title} Trailer`}
                    >
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    );
}

export default Filme;