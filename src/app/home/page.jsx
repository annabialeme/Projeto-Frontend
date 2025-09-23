"use client";


import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './home.module.css';


export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);


  const heroSlides = [
    {
      title: "Maxton Hall - Onde tudo começa",
      subtitle: "O colégio de elite que mudará suas vidas para sempre"
    },
    {
      title: "Romance e Drama",
      subtitle: "Histórias de amor que transcendem classes sociais"
    },
    {
      title: "Segredos e Mistérios",
      subtitle: "Cada corredor esconde uma verdade"
    }
  ];


  const quotes = [
    { text: "Onde segredos se tornam histórias e cada olhar pode mudar tudo.", author: "Narrativa" },
    { text: "O amor não conhece fronteiras sociais.", author: "Ruby Bell" },
    { text: "Às vezes, os opostos se atraem mais do que imaginamos.", author: "James Beaufort" }
  ];


  const highlights = [
    { icon: "👑", title: "Personagem em Destaque", subtitle: "Ruby Bell", desc: "A jovem determinada que conquistou corações" },
    { icon: "📺", title: "Episódio da Semana", subtitle: "S01E05", desc: "O baile que mudou tudo" },
    { icon: "💡", title: "Curiosidade do Dia", subtitle: "Bastidores", desc: "O castelo usado nas filmagens tem 800 anos" },
    { icon: "🆕", title: "Última Atualização", subtitle: "Nova temporada", desc: "Confirmada para 2025!" }
  ];


  const stats = [
    { number: "12", label: "Personagens Principais" },
    { number: "3", label: "Temporadas Confirmadas" },
    { number: "1M+", label: "Fãs Pelo Mundo" },
    { number: "100+", label: "Cenas Românticas" }
  ];


  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 4000);


    const quoteInterval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % quotes.length);
    }, 3000);


    return () => {
      clearInterval(slideInterval);
      clearInterval(quoteInterval);
    };
  }, [heroSlides.length, quotes.length]);


  return (
    <div className={styles.homeContainer}>
      
      <header className={styles.header}>
        <div className={styles.logoArea}>
          <span className={styles.logo}>🛡️</span>
          <h1 className={styles.headerTitle}>Maxton Hall</h1>
        </div>
        <nav className={styles.nav}>
          <a href="/personagens">👥 Personagens</a>
          <a href="/sobre">📖 Sobre</a>
          <a href="/curiosidades">🎓 Curiosidades</a>
          <a href="/contato">✉️ Contato</a>
        </nav>
      </header>


  
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h2 className={styles.heroTitle}>{heroSlides[currentSlide].title}</h2>
          <p className={styles.heroSubtitle}>{heroSlides[currentSlide].subtitle}</p>
          <div className={styles.heroButtons}>
            <button className={styles.btnPrimary}>Explore os Personagens</button>
            <button className={styles.btnSecondary}>Assista Agora</button>
          </div>
        </div>
        <div className={styles.heroImage}>
          <Image
            src="/banner.jpg"
            alt="Maxton Hall"
            width={600}
            height={400}
            className={styles.bannerImg}
          />
        </div>
        <div className={styles.heroIndicators}>
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === currentSlide ? styles.active : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>


 
      <section className={styles.quotes}>
        <blockquote className={styles.quote}>
          "{quotes[currentQuote].text}"
          <cite>— {quotes[currentQuote].author}</cite>
        </blockquote>
      </section>




      <section className={styles.highlights}>
        <h2 className={styles.sectionTitle}>Destaques</h2>
        <div className={styles.highlightsGrid}>
          {highlights.map((item, index) => (
            <div key={index} className={styles.highlightCard}>
              <div className={styles.highlightIcon}>{item.icon}</div>
              <h3>{item.title}</h3>
              <h4>{item.subtitle}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>




      <section className={styles.stats}>
        <h2 className={styles.sectionTitle}>Em Números</h2>
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statNumber}>{stat.number}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>


 
      <section className={styles.whyWatch}>
        <h2 className={styles.sectionTitle}>Por que assistir Maxton Hall?</h2>
        <div className={styles.reasonsGrid}>
          <div className={styles.reason}>
            <span className={styles.reasonIcon}>💕</span>
            <h3>Romance Envolvente</h3>
            <p>Uma história de amor que quebra barreiras sociais</p>
          </div>
          <div className={styles.reason}>
            <span className={styles.reasonIcon}>🎭</span>
            <h3>Drama Intenso</h3>
            <p>Reviravoltas que mantêm você grudado na tela</p>
          </div>
          <div className={styles.reason}>
            <span className={styles.reasonIcon}>🏰</span>
            <h3>Cenários Deslumbrantes</h3>
            <p>Filmado em locações históricas impressionantes</p>
          </div>
          <div className={styles.reason}>
            <span className={styles.reasonIcon}>⭐</span>
            <h3>Elenco Talentoso</h3>
            <p>Performances que tocam o coração</p>
          </div>
        </div>
      </section>


     
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>🛡️</div>
          <div className={styles.footerText}>
            <span>© 2025 Maxton Hall | Projeto Frontend</span>
            <a href="https://github.com/annabialeme/Frontend-Projeto" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

