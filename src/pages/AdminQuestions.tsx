import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Question { 
  id: number; 
  question: string; 
  options: string[]; 
  answer: string; 
}

export default function AdminQuestions() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  // 1. Carregar perguntas existentes ao abrir a tela
  useEffect(() => {
    const saved = localStorage.getItem('@quiz_questions');
    if (saved) setQuestions(JSON.parse(saved));
  }, []);

  const handleSave = () => {
    if (!newQuestion || options.some(opt => !opt) || !correctAnswer) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    const questionData: Question = {
      id: Date.now(),
      question: newQuestion,
      options: options,
      answer: correctAnswer,
    };

    const updatedQuestions = [...questions, questionData];
    setQuestions(updatedQuestions);

    // 2. Salvar no Storage
    localStorage.setItem('@quiz_questions', JSON.stringify(updatedQuestions));

    // Limpar campos
    setNewQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
    alert("Pergunta salva com sucesso!");
  };

  return (
    <div className="min-h-screen bg-quiz-dark p-6 text-white font-quiz flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-quiz-purple p-6 rounded-quiz shadow-xl">
        <h1 className="text-2xl font-black text-quiz-yellow mb-6 text-center">Cadastrar Pergunta</h1>
        
        <div className="space-y-4 text-black">
          <input
            placeholder="Pergunta"
            className="w-full p-3 rounded-lg text-black bg-white outline-none"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />

          {options.map((opt, i) => (
            <input
              key={i}
              placeholder={`Opção ${i + 1}`}
              className="w-full p-2 rounded-lg text-black bg-white outline-none"
              value={opt}
              onChange={(e) => {
                const newOpts = [...options];
                newOpts[i] = e.target.value;
                setOptions(newOpts);
              }}
            />
          ))}

          <input
            placeholder="Resposta Correta (Exata igual a uma das opções)"
            className="w-full p-3 rounded-lg text-black bg-white outline-none border-2 border-quiz-yellow"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
          />

          <button 
            onClick={handleSave}
            className="w-full bg-quiz-yellow text-black font-bold py-3 rounded-full hover:scale-105 transition-all"
          >
            Salvar Questão
          </button>
        </div>

        <button onClick={() => navigate('/')} className="w-full text-white/70 hover:text-white mt-4 text-sm font-semibold underline text-center block">
          Voltar para Home
        </button>
      </div>
    </div>
  );
}