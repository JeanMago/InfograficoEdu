import React from 'react';
// Importa o componente (certifica-te de que o ficheiro EduScheduleDark.jsx está na mesma pasta, ou ajusta o caminho)
import EduScheduleDark from './EduScheduleDark'; 

// Importa o teu CSS global onde colocaste as classes .edu-glass-panel e .edu-slider
import './App.css'; // ou './index.css', dependendo do teu projeto

function App() {
  return (
    // Esta div garante que o fundo de todo o ecrã fica escuro para combinar com o componente
    <div className="min-h-screen bg-[#1e1e24] flex items-center justify-center py-10">
      
      {/* Aqui estamos a renderizar o infográfico */}
      <EduScheduleDark />
      
    </div>
  );
}

export default App;