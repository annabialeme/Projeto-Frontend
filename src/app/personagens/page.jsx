"use client";
import { useEffect, useState } from 'react';
import styles from './personagem.module.css';

export default function Page() {
    const [personagens, setPersonagens] = useState([]);
    const [loading, setLoading] = useState(true);

useEffect(() => {
    async function fetchPersonagens() {
    try {
        const response = await fetch('http://localhost:4000/api/personagens');
        const json = await response.json();
        setPersonagens(json.data || []);
    } catch (error) {
        setPersonagens([]);
    } finally {
        setLoading(false);
    }
    }
    fetchPersonagens();
}, []);


if (loading) {
    return <div className={styles.container}><p>Carregando...</p></div>;
}
    if (!personagens.length) {
    return <div className={styles.container}><p>Nenhum personagem encontrado.</p></div>;
}

return (
    <div className={styles.container}>
    
    <div className={styles.banner}>
        <img src="/maxton.png" alt="Banner Maxton Hall" className={styles.bannerImg} />
    </div>

    <header className={styles.headerContent}>
        <span className={styles.headerTitle}>
          <span role="img" aria-label="brasão" style={{fontSize: '2rem', marginRight: '12px'}}>🛡️</span>
          MAXTON HALL
        </span>
        <nav>
        <ul className={styles.menu}>
            <li className={styles.menuItem}>Personagens</li>
            <li className={styles.menuItem}>Sobre</li>
            <li className={styles.menuItem}>Contato</li>
        </ul>
        </nav>
    </header>

        <div className={styles.tituloContainer}>
            <h1 className={styles.titulo}>Personagens de Maxton Hall</h1>
            <p className={styles.redacao}>
                Conheça os principais personagens da série Maxton Hall. Cada um deles possui uma história única, motivações e características marcantes que tornam a trama envolvente e cheia de reviravoltas. Explore os cards abaixo para saber mais sobre cada personagem, suas frases marcantes e curiosidades.
            </p>
        </div>
    <div className={styles.grid}>
        {personagens.map(personagem => (
            <div key={personagem.id} className={styles.card}>
                <img
                src={personagem.imagem_url ? personagem.imagem_url : '/public/file.svg'}
                alt={personagem.nome}
                className={styles.imagem}
                />
                <h2 className={styles.nome}>{personagem.nome}</h2>
                <p className={styles.descricao}>{personagem.descricao}</p>
                <blockquote className={styles.frase}>{personagem.frases}</blockquote>
                <button
                className={styles.botao}
                onClick={() => window.location.href = `/detalhes/${personagem.id}`}
                >
                <span>Ver mais</span>
                </button>
            </div>
        ))}
    </div>
    </div>
);
}