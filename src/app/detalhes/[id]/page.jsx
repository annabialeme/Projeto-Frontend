"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./detalhes.module.css";

export default function DetalhePersonagem() {
  const params = useParams();
  const id = params?.id;
  const [personagem, setPersonagem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPersonagem() {
      try {
        const response = await fetch(`http://localhost:4000/api/detalhes/${id}`);
        const json = await response.json();
        setPersonagem(json.data);
      } catch (error) {
        setPersonagem(null);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchPersonagem();
  }, [id]);

  if (loading) {
    return <div className={styles.container}><p>Carregando...</p></div>;
  }

  if (!personagem) {
    return <div className={styles.container}><p>Personagem não encontrado.</p></div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>{personagem.nome}</h1>
      <div style={{marginBottom: '16px'}}>
        <strong>Arquivo da imagem no backend:</strong> {personagem.imagem_url ? personagem.imagem_url : 'Não veio imagem'}
      </div>
      <img
        src={personagem.imagem_url ? `http://localhost:4000/uploads/${personagem.imagem_url}` : '/public/file.svg'}
        alt={personagem.nome}
        className={styles.imagem}
        style={{maxWidth: '300px', borderRadius: '8px'}}
      />
      <p className={styles.descricao}><strong>Descrição completa:</strong> {personagem.descricao_completa}</p>
      <div>
        <strong>Frases marcantes:</strong>
        {Array.isArray(personagem.frases) ? (
          <ul>
            {personagem.frases.map((frase, idx) => (
              <li key={idx} style={{fontStyle: 'italic'}}>{frase}</li>
            ))}
          </ul>
        ) : personagem.frases ? (
          <p style={{fontStyle: 'italic'}}>{personagem.frases}</p>
        ) : null}
      </div>
      <div>
        <strong>Curiosidades:</strong>
        {Array.isArray(personagem.curiosidades) ? (
          <ul>
            {personagem.curiosidades.map((curio, idx) => (
              <li key={idx}>{curio}</li>
            ))}
          </ul>
        ) : personagem.curiosidades ? (
          <p>{personagem.curiosidades}</p>
        ) : null}
      </div>
    </div>
  );
}
