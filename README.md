# Quiz App - React + TypeScript

Este projeto é uma aplicação de Quiz dinâmica desenvolvida como atividade prática para a disciplina de **Programação para Web** no **Instituto Federal do Piauí (IFPI) - Campus Piripiri**.

O objetivo principal da atividade foi aplicar conceitos de gerenciamento de rotas, estado dinâmico, estilização com Tailwind CSS e persistência de dados local.

---

## Funcionalidades Implementadas

A aplicação atende integralmente aos três tópicos exigidos no enunciado da atividade:

1. **Fidelidade ao Design (UI/UX):** Layout totalmente ajustado seguindo os padrões visuais estipulados, utilizando de forma consistente as cores personalizadas do tema (`quiz-purple`, `quiz-yellow` e `quiz-dark`) em todos os componentes.
2. **Gerenciamento de Rotas e Estado Dinâmico:** Implementação da tela de Resultados (`/resultado`). Ao finalizar o quiz, a tela extrai os dados do `useLocation().state` contendo a quantidade total de acertos e erros, exibindo uma mensagem motivacional personalizada baseada na porcentagem de aproveitamento.
3. **Persistência com LocalStorage:** As questões deixaram de ser estáticas (mockadas). O componente de Quiz foi migrado para ler as perguntas dinamicamente do `localStorage` sob a chave `@quiz_questions`, permitindo que novos dados sejam consumidos em tempo real a partir da tela de cadastro (`/admin`).

---

## Tecnologias Utilizadas

* **React** com **TypeScript**
* **Vite** (Build Tool)
* **Tailwind CSS v4** (Estilização)
* **React Router Dom** (Gerenciamento de Rotas)

---

## Como Rodar o Projeto Localmente

Como as perguntas são lidas do `localStorage`, o projeto iniciará sem questões na primeira execução. Siga o fluxo abaixo para testar:

1. Clone o repositório ou baixe os arquivos.
2. Instale as dependências executando no terminal:
   ```bash
   npm install