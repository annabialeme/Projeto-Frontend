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
      subtitle: "O colégio de elite que mudará suas vidas para sempre",
      button1: "Explore os Personagens",
      button2: "Assista Agora",
      link1: "/personagens",
      link2: "https://www.youtube.com/watch?v=Raleeeupt6o"
    },
    {
      title: "Romance e Drama",
      subtitle: "Histórias de amor que transcendem classes sociais",
      button1: "Veja os Casais",
      button2: "Episódios Românticos",
      link1: "/personagens",
      link2: "https://www.youtube.com/watch?v=t1MHaflK2og"
    },
    {
      title: "Segredos e Mistérios",
      subtitle: "Cada corredor esconde uma verdade",
      button1: "Descubra os Segredos",
      button2: "Teorias dos Fãs",
      link1: "/curiosidades",
      link2: "https://www.reddit.com/r/MaxtonHall/comments/1d37ryo/random_maxton_hall_thought/?tl=pt-br"
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
    <div className={styles.container}>
      
      <header className={styles.header}>
        <div className={styles.logo}>
          <span>🛡️</span>
          <h1>Maxton Hall</h1>
        </div>
        <nav className={styles.nav}>
          <a href="/personagens">👥 Personagens</a>
          <a href="/galeria">📖 Galeria</a>
          <a href="/contato">✉️ Contato</a>
        </nav>
      </header>


  
      <section className={styles.hero}>
        <div className={styles.content}>
          <h2 className={styles.title}>{heroSlides[currentSlide].title}</h2>
          <p className={styles.subtitle}>{heroSlides[currentSlide].subtitle}</p>
          <div className={styles.buttons}>
            <a href={heroSlides[currentSlide].link1} className={styles.btn}>
              {heroSlides[currentSlide].button1}
            </a>
            <a 
              href={heroSlides[currentSlide].link2} 
              className={styles.btnSecond}
              target="_blank"
              rel="noopener noreferrer"
            >
              {heroSlides[currentSlide].button2}
            </a>
          </div>
        </div>
        <div className={styles.image}>
          <Image
            src="/banner.jpg"
            alt="Maxton Hall"
            width={600}
            height={400}
            className={styles.banner}
          />
        </div>
        <div className={styles.indicators}>
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
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
        <div className={styles.grid}>
          {highlights.map((item, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.icon}>{item.icon}</div>
              <h3>{item.title}</h3>
              <h4>{item.subtitle}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>




      <section className={styles.stats}>
        <h2 className={styles.sectionTitle}>Em Números</h2>
        <div className={styles.grid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.number}>{stat.number}</div>
              <div className={styles.label}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.reasons}>
        <h2 className={styles.sectionTitle}>Por que assistir Maxton Hall?</h2>
        <div className={styles.grid}>
          <div className={styles.reason}>
            <span className={styles.icon}>💕</span>
            <h3>Romance Envolvente</h3>
            <p>Uma história de amor que quebra barreiras sociais</p>
          </div>
          <div className={styles.reason}>
            <span className={styles.icon}>🎭</span>
            <h3>Drama Intenso</h3>
            <p>Reviravoltas que mantêm você grudado na tela</p>
          </div>
          <div className={styles.reason}>
            <span className={styles.icon}>🏰</span>
            <h3>Cenários Deslumbrantes</h3>
            <p>Filmado em locações históricas impressionantes</p>
          </div>
          <div className={styles.reason}>
            <span className={styles.icon}>⭐</span>
            <h3>Elenco Talentoso</h3>
            <p>Performances que tocam o coração</p>
          </div>
        </div>
      </section>


     
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div>🛡️</div>
          <div>
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

