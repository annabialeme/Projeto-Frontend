"use client";
import Link from 'next/link';
import styles from './sobre.module.css';

export default function SobrePage() {
    return (
        <div className={styles.container}>
           
            <div className={styles.banner}>
                <img src="/maxton.png" alt="Banner Maxton Hall" className={styles.bannerImg} />
            </div>

           
            <header className={styles.headerContent}>
                <span className={styles.headerTitle}>
                    <span role="img" aria-label="sobre" style={{ fontSize: '2rem', marginRight: '12px' }}>ℹ️</span>
                    Sobre Mim
                </span>
                <nav>
                    <ul className={styles.menu}>
                        <li className={styles.menuItem}>
                            <Link href="/home">Home</Link>
                        </li>
                        <li className={styles.menuItem}>
                            <Link href="/personagens">Personagens</Link>
                        </li>
                        <li className={styles.menuItem}>
                            <Link href="/quiz">Quiz</Link>
                        </li>
                    </ul>
                </nav>
            </header>

           
            <div className={styles.content}>
                <section className={styles.section}>
                    <h2 className={styles.title}>Quem Sou Eu</h2>
                    <p className={styles.text}>
                        Olá! Meu nome é Anna Beatriz Leme Alves, sou uma desenvolvedora apaixonada por tecnologia e aprendizado contínuo. 
                        Este projeto foi criado como parte do meu estudo em desenvolvimento web, utilizando tecnologias modernas como React, Next.js e CSS modular.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.title}>Propósito do Projeto</h2>
                    <p className={styles.text}>
                        O objetivo deste projeto é criar uma aplicação web interativa e responsiva, que demonstre habilidades em desenvolvimento frontend. 
                        Ele inclui páginas dinâmicas, integração com APIs e um design moderno e acessível.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.title}>Meu GitHub</h2>
                    <p className={styles.text}>
                        Você pode encontrar mais projetos e contribuições no meu GitHub. Clique no link abaixo para acessar:
                    </p>
                    <a
                        href="https://github.com/annabialeme"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                    >
                        Meu GitHub
                    </a>
                </section>
            </div>
        </div>
    );
}