import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
} from "react-icons/bs";

import MovieCard from "../components/MovieCard";

import "./Movie.css";

// Obtém a URL da API de filmes e a chave de API das variáveis de ambiente
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
  // Obtém o parâmetro de rota "id"
  const { id } = useParams();
  // Define um estado para armazenar as informações do filme
  const [movie, setMovie] = useState(null);

  // Função assíncrona para obter informações detalhadas do filme
  const getMovie = async (url) => {
    // Faz uma solicitação à URL fornecida
    const res = await fetch(url);
    // Converte a resposta em formato JSON
    const data = await res.json();
    // Define o estado com os dados do filme recebidos da API
    setMovie(data);
  };

  // Função para formatar um número como moeda
  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  // Efeito que é executado quando o componente é montado
  useEffect(() => {
    // Monta a URL completa para obter informações do filme com o ID fornecido
    const movieUrl = `${moviesURL}${id}?${apiKey}`;
    // Chama a função para obter informações detalhadas do filme
    getMovie(movieUrl);
  }, []);

  // Exibe as informações do filme na página
  return (
    <div className="movie-page">
      {movie && (
        <>
          {/* Renderiza um componente MovieCard com as informações básicas do filme */}
          <MovieCard movie={movie} showLink={false} />
          {/* Exibe a tagline do filme, se disponível */}
          <p className="tagline">{movie.tagline}</p>
          {/* Exibe o orçamento do filme */}
          <div className="info">
            <h3>
              <BsWallet2 /> Orçamento:
            </h3>
            <p>{formatCurrency(movie.budget)}</p>
          </div>
          {/* Exibe a receita do filme */}
          <div className="info">
            <h3>
              <BsGraphUp /> Receita:
            </h3>
            <p>{formatCurrency(movie.revenue)}</p>
          </div>
          {/* Exibe a duração do filme */}
          <div className="info">
            <h3>
              <BsHourglassSplit /> Duração:
            </h3>
            <p>{movie.runtime} minutos</p>
          </div>
          {/* Exibe a descrição do filme */}
          <div className="info description">
            <h3>
              <BsFillFileEarmarkTextFill /> Descrição:
            </h3>
            <p>{movie.overview}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Movie;
