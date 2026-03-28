# 📝 To-Do List App - Front-End Challenge

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Status](https://img.shields.io/badge/Status-Concluído-success?style=for-the-badge)

Uma aplicação web de gerenciamento de tarefas (To-Do List) desenvolvida como solução para um desafio técnico de Front-End. O projeto tem como foco principal a usabilidade, o design responsivo e o gerenciamento eficiente de estado no lado do cliente.

> 🔗 *Deploy do projeto: * **https://react-to-do-list-2002.vercel.app**

---

## 💡 Sobre o Projeto

O objetivo deste projeto foi reproduzir fielmente um design proposto no Figma, implementando a interface e a lógica de negócios utilizando **React.js**. A aplicação permite que o usuário gerencie suas tarefas diárias de forma intuitiva, com suporte nativo a transições de tema (Dark/Light mode) e adaptação perfeita para dispositivos móveis (Mobile First).

---

## ✨ Funcionalidades Principais

- **CRUD Completo de Tarefas:** Adição (via botão ou tecla `Enter`), listagem, marcação de conclusão e exclusão de tarefas.
- **Filtros Dinâmicos de Estado:** Sistema de abas ("All", "Active", "Completed") que renderiza os dados filtrados em tempo real, sem recarregar a página.
- **Renderização Condicional (Empty States):** Feedback visual com ilustrações customizadas para quando a lista (ou a aba selecionada) não possuir itens.
- **Dark Mode Nativo:** Alternância de tema gerenciada por estado e integrada diretamente com as classes utilitárias do Tailwind CSS.
- **Design Totalmente Responsivo:**
  - **Desktop:** Layout com Sidebar fixa lateral.
  - **Mobile:** Sidebar convertida em um menu lateral deslizante (*Drawer*) com botão *Hamburguer* e *Overlay* escurecido para fechamento via clique externo.
- **Micro-interações (UX):** Efeitos de *hover*, transições de cores (`duration-300`), e botões de ação (editar/excluir) que aparecem de forma contextual no desktop e ficam fixos no mobile.

---

## 🛠️ Tecnologias e Ferramentas

As seguintes ferramentas foram utilizadas na construção do projeto:

- **[React.js](https://reactjs.org/):** Escolhido pela sua arquitetura baseada em componentes e flexibilidade no gerenciamento do DOM virtual. O controle de estado da aplicação foi feito utilizando Hooks (`useState`).
- **[Tailwind CSS](https://tailwindcss.com/):** Utilizado para estilização. Permitiu um desenvolvimento ágil diretamente no JSX, além de facilitar imensamente a implementação da responsividade e do modo escuro.
- **[Lucide React](https://lucide.dev/):** Biblioteca de ícones moderna e leve, garantindo consistência visual com o protótipo.
- **Node.js & npm:** Gerenciamento do ambiente e dependências.

---

## 📁 Estrutura do Projeto

A arquitetura do projeto foi mantida simples e direta, ideal para aplicações SPA (Single Page Applications) de pequeno/médio porte:

```text
to-do-list/
├── public/
├── src/
│   ├── assets/
│   │   ├── profile-pic.png         # Foto de perfil estática
│   │   └── task-illustration.png   # Ilustração do Empty State
│   ├── App.js                      # Componente principal (Lógica e UI)
│   ├── index.css                   # Diretivas do Tailwind
│   └── index.js                    # Ponto de entrada do React
├── tailwind.config.js              # Configurações do tema e Dark Mode
└── package.json
