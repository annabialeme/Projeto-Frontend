"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './quiz.module.css';

export default function QuizPage() {
    const [quiz, setQuiz] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState({}); 
    const [result, setResult] = useState(null); 
    const [feedback, setFeedback] = useState({});

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/quiz';

    useEffect(() => {
        async function fetchQuiz() {
            try {
                const response = await fetch(`${apiUrl}/quiz`);
                const json = await response.json();
                setQuiz(json.data || []);
            } catch (error) {
                console.error('Erro ao buscar quizzes:', error);
                setQuiz([]);
            } finally {
                setLoading(false);
            }
        }
        fetchQuiz();
    }, []);

    const handleAnswer = (quizId, questionIndex, answer) => {
        setAnswers((prev) => ({
            ...prev,
            [quizId]: {
                ...prev[quizId],
                [questionIndex]: answer,
            },
        }));
    };

    const handleSubmit = () => {
        let correctAnswers = 0;
        const newFeedback = {};
        quiz.forEach((item) => {
            newFeedback[item.id] = {};
            item.perguntas.forEach((pergunta, index) => {
                const userAnswer = answers[item.id]?.[index];
                if (userAnswer === pergunta.resposta_correta) {
                    correctAnswers++;
                    newFeedback[item.id][index] = 'acertou';
                } else {
                    newFeedback[item.id][index] = 'errou';
                }
            });
        });
        setResult(correctAnswers);
        setFeedback(newFeedback);
    };

    if (loading) {
        return <div className={styles.container}><p>Carregando...</p></div>;
    }
    if (!quiz.length) {
        return <div className={styles.container}><p>Nenhum quiz encontrado.</p></div>;
    }

    return (
        <div className={styles.container}>
            
            <div className={styles.banner}>
                <img src="/maxton.png" alt="Banner Maxton Hall" className={styles.bannerImg} />
            </div>

            
            <header className={styles.headerContent}>
                <span className={styles.headerTitle}>
                    <span role="img" aria-label="quiz" style={{ fontSize: '2rem', marginRight: '12px' }}>📝</span>
                    Quiz - Descubra seu Personagem
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
                            <Link href="/galeria">Galeria</Link>
                        </li>
                        <li className={styles.menuItem}>
                            <Link href="/sobre">Sobre</Link>
                        </li>
                        
                    </ul>
                </nav>
            </header>

        
            <div className={styles.tituloContainer}>
                <h1 className={styles.titulo}>Teste seus conhecimentos!</h1>
                <p className={styles.redacao}>
                    Responda às perguntas abaixo para descobrir qual personagem de Maxton Hall mais combina com você.
                </p>
            </div>

           
            <div className={styles.quizContainer}>
                {quiz.map((item) => (
                    <div key={item.id} className={styles.quizCard}>
                        <h2 className={styles.quizTitle}>{item.titulo}</h2>
                        <p className={styles.quizDescription}>{item.descricao}</p>
                        <div className={styles.questions}>
                            {item.perguntas.map((pergunta, index) => {
                                const userAnswer = answers[item.id]?.[index];
                                const showFeedback = result !== null;
                                const isCorrect = feedback[item.id]?.[index] === 'acertou';
                                const isWrong = feedback[item.id]?.[index] === 'errou';
                                return (
                                    <div key={index} className={styles.questionCard}>
                                        <h3 className={styles.question}>{pergunta.pergunta}</h3>
                                        <div className={styles.options}>
                                            {['A', 'B', 'C', 'D'].map((alt) => (
                                                <button
                                                    key={alt}
                                                    className={`${styles.optionButton} ${userAnswer === alt ? styles.selected : ''}`}
                                                    onClick={() => handleAnswer(item.id, index, alt)}
                                                    disabled={result !== null}
                                                >
                                                    {alt}: {pergunta[`alternativa_${alt.toLowerCase()}`]}
                                                </button>
                                            ))}
                                        </div>
                                        {showFeedback && (
                                            <div className={isCorrect ? styles.correct : styles.wrong}>
                                                {isCorrect ? 'Acertou!' : 'Errou!'}
                                                {!isCorrect && (
                                                    <span> (Correta: {pergunta.resposta_correta})</span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

          
            <div className={styles.submitContainer}>
                <button className={styles.submitButton} onClick={handleSubmit}>
                    Enviar Respostas
                </button>
            </div>

           
            {result !== null && (
                <div className={styles.resultContainer}>
                    <h2 className={styles.resultText}>
                        Você acertou {result} de {quiz.reduce((acc, item) => acc + item.perguntas.length, 0)} perguntas!
                    </h2>
                </div>
            )}
        </div>
    );
}