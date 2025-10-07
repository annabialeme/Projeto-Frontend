"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'; 
import styles from './galeria.module.css';

export default function Galeria() {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    { src: "/escola.jpg", title: "Maxton Hall" },
    { src: "/ruby.jpg", title: "Casa de Ruby" },
    { src: "/james.jpg", title: "Casa de James" },
    { src: "/oxford.jpg", title: "Oxford" },
    { src: "/campo.jpg", title: "Campo" },
    { src: "/londres.jpg", title: "Londres" }
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={styles.box}>
      <h1 className={styles.titulo}>Galeria Maxton Hall</h1>

      <section className={styles.galeria}>
        <h2>📸 Imagens da Série</h2>
        <div className={styles.slider}>
          <button onClick={prevImage} className={styles.btn}>‹</button>
          <div className={styles.foto}>
            <Image
              src={images[currentImage].src}
              alt={images[currentImage].title}
              width={600}
              height={400}
              className={styles.img}
            />
            <p>{images[currentImage].title}</p>
          </div>
          <button onClick={nextImage} className={styles.btn}>›</button>
        </div>
        <div className={styles.pontos}>
          {images.map((_, i) => (
            <span
              key={i}
              className={`${styles.ponto} ${i === currentImage ? styles.ativo : ''}`}
              onClick={() => setCurrentImage(i)}
            />
          ))}
        </div>
      </section>

      <section className={styles.quizButton}>
        <h2>🎭 Descubra Qual Personagem Você É!</h2>
        <Link href="/quiz">
          <button className={styles.botaoQuiz}>Ir para o Quiz</button>
        </Link>
      </section>
    </div>
  );
}
