"use client";
import { useState } from 'react';
import Image from 'next/image';
import styles from './galeria.module.css';

export default function Galeria() {
  const [currentImage, setCurrentImage] = useState(0);
  const [quizStep, setQuizStep] = useState(0);
  const [score, setScore] = useState({ Ruby: 0, James: 0, Lydia: 0, Percy: 0 });
  const [result, setResult] = useState(null);

  const images = [
    { src: "/banner.jpg", title: "Maxton Hall" },
    { src: "/maxton.png", title: "Brasão" },
    { src: "/banner.jpg", title: "Biblioteca" },
    { src: "/maxton.png", title: "Salão Principal" }
  ];

  const quiz = [
    {
      question: "Sua matéria favorita?",
      options: [
        { text: "Literatura", char: "Ruby" },
        { text: "Negócios", char: "James" },
        { text: "Arte", char: "Lydia" },
        { text: "Ciências", char: "Percy" }
      ]
    },
    {
      question: "Como resolve conflitos?",
      options: [
        { text: "Enfrento diretamente", char: "Ruby" },
        { text: "Uso influência", char: "James" },
        { text: "Converso e entendo", char: "Lydia" },
        { text: "Analiso primeiro", char: "Percy" }
      ]
    },
    {
      question: "Seu maior sonho?",
      options: [
        { text: "Mudar o mundo", char: "Ruby" },
        { text: "Liderar", char: "James" },
        { text: "Criar arte", char: "Lydia" },
        { text: "Descobrir algo novo", char: "Percy" }
      ]
    }
  ];

  const characters = {
    Ruby: "Ruby Bell - Determinada e corajosa",
    James: "James Beaufort - Carismático líder",
    Lydia: "Lydia Beaufort - Criativa e gentil",
    Percy: "Percy - Inteligente e analítico"
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const answerQuiz = (char) => {
    const newScore = { ...score };
    newScore[char]++;
    setScore(newScore);

    if (quizStep < quiz.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      const winner = Object.keys(newScore).reduce((a, b) => 
        newScore[a] > newScore[b] ? a : b
      );
      setResult(winner);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setScore({ Ruby: 0, James: 0, Lydia: 0, Percy: 0 });
    setResult(null);
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

      <section className={styles.teste}>
        <h2>🎭 Qual Personagem Você É?</h2>
        
        {!result ? (
          <div className={styles.pergunta}>
            <h3>{quiz[quizStep].question}</h3>
            <div className={styles.opcoes}>
              {quiz[quizStep].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => answerQuiz(option.char)}
                  className={styles.opcao}
                >
                  {option.text}
                </button>
              ))}
            </div>
            <p>Pergunta {quizStep + 1} de {quiz.length}</p>
          </div>
        ) : (
          <div className={styles.final}>
            <h3>Seu resultado:</h3>
            <p className={styles.pessoa}>{characters[result]}</p>
            <button onClick={resetQuiz} className={styles.novo}>
              Fazer Novamente
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
