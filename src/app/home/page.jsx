"use client";

import styles from './home.module.css';

export default function Home() {
	return (
		<div className={styles.homeContainer}>
			<header className={styles.headerHome}>
				<div className={styles.logoArea}>
					<span className={styles.logo} role="img" aria-label="brasão">🛡️</span>
					<span className={styles.headerTitle}>Maxton Hall</span>
				</div>
				<nav className={styles.menuHeader}>
					<ul>
						<li><a href="/personagens"><span role="img" aria-label="personagens">👥</span> Personagens</a></li>
						<li><a href="/sobre"><span role="img" aria-label="sobre">📖</span> Sobre</a></li>
						<li><a href="/curiosidades"><span role="img" aria-label="curiosidades">🎓</span> Curiosidades</a></li>
						<li><a href="/contato"><span role="img" aria-label="contato">✉️</span> Contato</a></li>
					</ul>
				</nav>
			</header>
			<div className={styles.divisoria}></div>
			<div className={styles.banner}>
				<img src="/banner.jpg" alt="Banner Maxton Hall" className={styles.bannerImg} />
			</div>
			<div className={styles.fraseImpacto}>
				<blockquote>“Onde segredos se tornam histórias e cada olhar pode mudar tudo.”</blockquote>
			</div>
			<section className={styles.intro}>
				<h1 className={styles.titulo}>Bem-vindo a Maxton Hall</h1>
				<p className={styles.descricao}>
					Maxton Hall é o colégio de elite britânico onde se desenrolam as histórias de romance, drama e segredos da série. Descubra os personagens, curiosidades e tudo sobre esse universo!
				</p>
			</section>
			<footer className={styles.rodapeHome}>
				<div className={styles.rodapeBrasao} role="img" aria-label="brasão">🛡️</div>
				<div className={styles.rodapeCreditos}>
					<span>© 2025 Maxton Hall | Projeto Frontend</span>
					<span><a href="https://github.com/annabialeme/Frontend-Projeto" target="_blank" rel="noopener">GitHub</a></span>
				</div>
			</footer>
		</div>
	);
}
