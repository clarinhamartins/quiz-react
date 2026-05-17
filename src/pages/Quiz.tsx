import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  // Item 3 da atividade: Migração de Dados (Buscar do localStorage)
  useEffect(() => {
    const saved = localStorage.getItem('@quiz_questions');
    if (saved) {
      setQuestions(JSON.parse(saved));
    }
  }, []);

  // Caso não existam perguntas salvas
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-quiz-dark text-white flex flex-col items-center justify-center p-6 text-center">
        <p className="text-xl mb-4 text-quiz-yellow font-bold">Nenhuma pergunta cadastrada no LocalStorage!</p>
        <button onClick={() => navigate('/admin')} className="bg-white text-black font-bold py-3 px-6 rounded-full hover:bg-quiz-yellow transition-all">
          Ir cadastrar perguntas (/admin)
        </button>
      </div>
    );
  }

  const currentQuiz = questions[currentStep];

  const handleAnswer = (option: string) => {
    let newScore = score;
    if (option === currentQuiz.answer) {
      newScore = score + 1;
      setScore(newScore);
    }

    const nextStep = currentStep + 1;
    if (nextStep < questions.length) {
      setCurrentStep(nextStep);
    } else {
      // Item 2 da atividade: Enviar obrigatoriamente a Quantidade total de acertos e de erros no objeto state
      navigate('/resultado', { 
        state: { 
          totalHits: newScore, 
          totalErrors: questions.length - newScore 
        } 
      });
    }
  };

  return (
    <div className="min-h-screen bg-quiz-dark flex flex-col items-center p-6 pt-12">
      <div className="mb-8">
        <h1 className="text-quiz-yellow text-2xl font-black italic">QUIZ</h1>
      </div>

      <div className="w-full max-w-md">
        {/* Card da Pergunta (Branco) */}
        <div className="bg-white p-8 rounded-t-quiz flex items-center gap-4 shadow-xl">
          <div className="bg-quiz-yellow p-3 rounded-full shrink-0">
            <span className="text-xl">💡</span>
          </div>
          <h2 className="text-black font-semibold text-lg leading-tight">
            {currentQuiz.question}
          </h2>
        </div>

        {/* Container das Opções (Roxo) */}
        <div className="bg-quiz-purple p-6 rounded-b-quiz space-y-4">
          {currentQuiz.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="w-full bg-white text-black py-4 px-6 rounded-full font-bold text-center
              hover:bg-quiz-yellow active:scale-95 transition-all shadow-md"
            >
              {option}
            </button>
          ))}
        </div>

        {/* Indicador de progresso */}
        <p className="text-white/50 text-center mt-6 font-medium">
          Pergunta {currentStep + 1} de {questions.length}
        </p>
      </div>
    </div>
  );
}