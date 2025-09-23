"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./detalhes.module.css";

export default function DetalhePersonagem() {
  const params = useParams();
  const id = params?.id;
  const [personagem, setPersonagem] = useState(null);
  const [detalhes, setDetalhes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        
        const personagemResponse = await fetch(`http://localhost:4000/api/personagens/${id}`);
        const personagemJson = await personagemResponse.json();
        
        const detalhesResponse = await fetch(`http://localhost:4000/api/detalhes/${id}`);
        const detalhesJson = await detalhesResponse.json();
        
        setPersonagem(personagemJson.data);
        setDetalhes(detalhesJson.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setPersonagem(null);
        setDetalhes(null);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchData();
  }, [id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    localStorage.setItem(`favorite_${id}`, !isFavorite);
  };

  const shareCharacter = () => {
    const nome = personagem?.nome || detalhes?.nome || 'Personagem';
    if (navigator.share) {
      navigator.share({
        title: `${nome} - Maxton Hall`,
        text: `Conheça ${nome} de Maxton Hall`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  if (loading) {
    return <div className={styles.container}><p>Carregando...</p></div>;
  }

  if (!personagem && !detalhes) {
    return <div className={styles.container}><p>Personagem não encontrado.</p></div>;
  }

  const dados = {
    nome: personagem?.nome || detalhes?.nome,
    imagem_url: personagem?.imagem_url,
    descricao_completa: detalhes?.descricao_completa || detalhes?.descricao || detalhes?.biografia,
    frases: detalhes?.frases || detalhes?.citacoes || detalhes?.quotes,
    curiosidades: detalhes?.curiosidades || detalhes?.fatos || detalhes?.trivia
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <a href="/personagens" className={styles.backBtn}>← Voltar</a>
        <button onClick={shareCharacter} className={styles.shareBtn}>
          📤 Compartilhar
        </button>
      </div>

      <div className={styles.main}>
        <div className={styles.imageSection}>
          <div className={styles.imageContainer}>
            <img
              src={dados.imagem_url || '/maxton.png'}
              alt={dados.nome}
              className={styles.image}
            />
            <button 
              onClick={toggleFavorite}
              className={`${styles.favoriteBtn} ${isFavorite ? styles.active : ''}`}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          </div>
        </div>

        <div className={styles.info}>
          <h1 className={styles.name}>{dados.nome}</h1>
          
        
          {dados.descricao_completa && (
            <div className={styles.description}>
              <h3>📖 Sobre</h3>
              <p>{dados.descricao_completa}</p>
            </div>
          )}

          {!dados.descricao_completa && (
            <div className={styles.description}>
              <h3>📖 Sobre</h3>
              <p style={{fontStyle: 'italic', color: '#999'}}>Descrição não disponível</p>
            </div>
          )}

        
          {dados.frases && (
            <div className={styles.quotes}>
              <h3>💬 Frases Marcantes</h3>
              {Array.isArray(dados.frases) ? (
                dados.frases.map((frase, idx) => (
                  <div key={idx} className={styles.quote}>"{frase}"</div>
                ))
              ) : (
                <div className={styles.quote}>"{dados.frases}"</div>
              )}
            </div>
          )}

     
          {dados.curiosidades && (
            <div className={styles.curiosities}>
              <h3>✨ Curiosidades</h3>
              {Array.isArray(dados.curiosidades) ? (
                dados.curiosidades.map((curio, idx) => (
                  <div key={idx} className={styles.curiosity}>• {curio}</div>
                ))
              ) : (
                <div className={styles.curiosity}>• {dados.curiosidades}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
