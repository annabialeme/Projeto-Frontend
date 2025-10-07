"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './quiz.module.css';

export default function QuizPage() {
    const [quiz, setQuiz] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState({}); 
    const [result, setResult] = useState(null); 

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
        quiz.forEach((item) => {
            item.perguntas.forEach((pergunta, index) => {
                if (
                    answers[item.id] &&
                    answers[item.id][index] === pergunta.resposta_correta
                ) {
                    correctAnswers++;
                }
            });
        });
        setResult(correctAnswers);
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
                            {item.perguntas.map((pergunta, index) => (
                                <div key={index} className={styles.questionCard}>
                                    <h3 className={styles.question}>{pergunta.pergunta}</h3>
                                    <div className={styles.options}>
                                        <button
                                            className={`${styles.optionButton} ${
                                                answers[item.id]?.[index] === 'A' ? styles.selected : ''
                                            }`}
                                            onClick={() => handleAnswer(item.id, index, 'A')}
                                        >
                                            A: {pergunta.alternativa_a}
                                        </button>
                                        <button
                                            className={`${styles.optionButton} ${
                                                answers[item.id]?.[index] === 'B' ? styles.selected : ''
                                            }`}
                                            onClick={() => handleAnswer(item.id, index, 'B')}
                                        >
                                            B: {pergunta.alternativa_b}
                                        </button>
                                        <button
                                            className={`${styles.optionButton} ${
                                                answers[item.id]?.[index] === 'C' ? styles.selected : ''
                                            }`}
                                            onClick={() => handleAnswer(item.id, index, 'C')}
                                        >
                                            C: {pergunta.alternativa_c}
                                        </button>
                                        <button
                                            className={`${styles.optionButton} ${
                                                answers[item.id]?.[index] === 'D' ? styles.selected : ''
                                            }`}
                                            onClick={() => handleAnswer(item.id, index, 'D')}
                                        >
                                            D: {pergunta.alternativa_d}
                                        </button>
                                    </div>
                                </div>
                            ))}
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