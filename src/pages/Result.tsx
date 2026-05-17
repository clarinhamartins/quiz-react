import { useLocation, useNavigate } from 'react-router-dom';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  // Item 2: Requisito Técnico obrigatório de extrair totalHits e totalErrors do state
  const { totalHits, totalErrors } = location.state || { totalHits: 0, totalErrors: 0 };

  const totalQuestions = totalHits + totalErrors;
  const percentage = totalQuestions > 0 ? (totalHits / totalQuestions) * 100 : 0;

  // Item 2: Exibe mensagem motivacional baseada na porcentagem de acerto
  const getMotivationalMessage = () => {
    if (percentage === 100) return "Espetacular! Você é um verdadeiro mestre!";
    if (percentage >= 70) return "Muito bem! Excelente aproveitamento!";
    if (percentage >= 50) return "Bom trabalho! Dá para melhorar ainda mais!";
    return "Não desanime! Revise o conteúdo e tente novamente!";
  };

  return (
    <div className="min-h-screen bg-quiz-dark flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-quiz-yellow text-5xl font-black mb-8 italic tracking-wider">RESULTADO</h1>

      <div className="bg-quiz-purple p-8 rounded-quiz w-full max-w-sm shadow-2xl border-4 border-quiz-yellow">
        <p className="text-white text-2xl font-black mb-6 leading-relaxed">
          {getMotivationalMessage()}
        </p>

        <div className="flex justify-around mb-6 bg-quiz-dark/40 py-4 rounded-xl">
          <div>
            <p className="text-quiz-yellow text-4xl font-black">{totalHits}</p>
            <p className="text-white/70 text-xs font-bold uppercase tracking-wider">Acertos</p>
          </div>
          <div className="border-r border-white/10"></div>
          <div>
            <p className="text-red-400 text-4xl font-black">{totalErrors}</p>
            <p className="text-white/70 text-xs font-bold uppercase tracking-wider">Erros</p>
          </div>
        </div>

        <p className="text-white/80 font-medium mb-8">
          Porcentagem de acerto: <span className="text-quiz-yellow font-bold">{percentage.toFixed(0)}%</span>
        </p>

        <button 
          onClick={() => navigate('/')}
          className="bg-quiz-yellow text-black w-full py-4 rounded-full text-lg font-black hover:scale-105 active:scale-95 transition-all shadow-md"
        >
          Tentar Novamente
        </button>
      </div>
    </div>
  );
}