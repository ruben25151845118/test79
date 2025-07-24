  {
    id: 1,
    question: "¿Cuál es la capital de Francia?",
    options: ["Londres", "Berlín", "París", "Madrid"],
    correct: 2
  },
  {
    id: 2,
    question: "¿Qué planeta es conocido como el 'planeta rojo'?",
    options: ["Venus", "Marte", "Júpiter", "Saturno"],
    correct: 1
  },
  {
    id: 3,
    question: "¿En qué año llegó el hombre a la Luna?",
    options: ["1967", "1969", "1971", "1973"],
    correct: 1
  },
  {
    id: 4,
    question: "¿Cuál es el océano más grande del mundo?",
    options: ["Atlántico", "Índico", "Ártico", "Pacífico"],
    correct: 3
  },
  {
    id: 5,
    question: "¿Quién escribió 'Don Quijote de la Mancha'?",
    options: ["Gabriel García Márquez", "Miguel de Cervantes", "Federico García Lorca", "Pablo Neruda"],
    correct: 1
  }
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !showScore) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showScore) {
      handleNextQuestion();
    }
  }, [timeLeft, quizStarted, showScore]);

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimeLeft(30);
    setSelectedAnswer(null);
  };

  const handleAnswerClick = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowScore(false);
    setTimeLeft(30);
    setQuizStarted(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "¡Excelente! 🎉";
    if (percentage >= 60) return "¡Bien hecho! 👍";
    if (percentage >= 40) return "Puedes mejorar 🤔";
    return "Sigue practicando 💪";
  };

  if (!quizStarted) {
    return (
      <div className="app">
        <div className="welcome-screen">
          <h1>🧠 Test IQ Gratis</h1>
          <p>Pon a prueba tus conocimientos con nuestro quiz interactivo</p>
          <div className="quiz-info">
            <div className="info-item">
              <span className="icon">📝</span>
              <span>{questions.length} preguntas</span>
            </div>
            <div className="info-item">
              <span className="icon">⏱️</span>
              <span>30 segundos por pregunta</span>
            </div>
            <div className="info-item">
              <span className="icon">🏆</span>
              <span>Obtén tu puntuación final</span>
            </div>
          </div>
          <button onClick={startQuiz} className="start-button">
            Comenzar Quiz
          </button>
        </div>
      </div>
    );
  }

  if (showScore) {
    return (
      <div className="app">
        <div className="score-screen">
          <h2>🎯 ¡Quiz Completado!</h2>
          <div className="score-circle">
            <span className="score-number">{score}</span>
            <span className="score-total">/ {questions.length}</span>
          </div>
          <p className="score-message">{getScoreMessage()}</p>
          <p className="score-percentage">
            Puntuación: {Math.round((score / questions.length) * 100)}%
          </p>
          <button onClick={resetQuiz} className="restart-button">
            Intentar de Nuevo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="quiz-container">
        <div className="quiz-header">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <div className="quiz-info-bar">
            <span className="question-count">
              Pregunta {currentQuestion + 1} de {questions.length}
            </span>
            <span className={`timer ${timeLeft <= 10 ? 'timer-warning' : ''}`}>
              ⏱️ {timeLeft}s
            </span>
          </div>
        </div>

        <div className="question-section">
          <h2 className="question-text">
            {questions[currentQuestion].question}
          </h2>
        </div>

        <div className="answers-section">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              className={`answer-button ${
                selectedAnswer === index ? 'selected' : ''
              }`}
              disabled={selectedAnswer !== null}
            >
              <span className="option-letter">
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </button>
          ))}
        </div>

        <div className="quiz-footer">
          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className="next-button"
          >
            {currentQuestion === questions.length - 1 ? 'Finalizar' : 'Siguiente'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

