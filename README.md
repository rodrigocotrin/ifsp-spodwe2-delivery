<h1 align="center">Bitebox 📦</h1>

<p align="center">
  <strong>Infraestrutura B2B para monitoramento tático de suprimentos, telemetria financeira e gestão de filiais gastronômicas.</strong><br/>
  <em>Desenvolvido para a disciplina SPODWE2 - Instituto Federal de São Paulo (IFSP).</em>
</p>

<p align="center">
  <a href="https://bitebox.rodrigocotrin.com" target="_blank">
    <img src="https://img.shields.io/badge/🌐%20Acessar%20Plataforma-bitebox.rodrigocotrin.com-FF6B00?style=for-the-badge" alt="Deploy do Projeto">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Homologado-success?style=for-the-badge" alt="Status do Projeto: Concluído">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router">
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
</p>

---

## 📖 Visão Executiva e Domínio do Negócio

O **Bitebox** é uma subversão do modelo tradicional de aplicativos B2C de delivery. Enquanto a maioria foca na interface do consumidor final, este projeto atua na raiz do problema operacional: a **gestão interna de redes de restaurantes e franquias (SaaS)**. 

O escopo foi arquitetado para resolver dores reais de diretores de operação, oferecendo controle estrito de catálogo, resolução de chamados (SAC) e inteligência fiscal. Este produto foi desenvolvido como avaliação core para a disciplina **Sistemas de Apoio ao Desenvolvimento de Web Sites 2 (SPODWE2)**. 

---

## ✨ Arquitetura e Funcionalidades

O sistema foi modularizado em Single Page Application (SPA), garantindo transições de estado instantâneas. O escopo abrange os requisitos acadêmicos através de interfaces de alto nível funcional:

### 1. 📊 Visão Geral
- Hub central de telemetria de vendas e segmentação de ativos.
- Funcionalidade de filtro dinâmico de categorias e sistema de busca em tempo real operando sob o estado do React.
- Suporte a *Dark Mode* integrado.

### 2. ⚙️ Engenharia de Catálogo - CRUD
- Cumprimento estrito da regra de negócios acadêmica: **Tabela HTML (`<table>`) 100% responsiva** para manipulação de dados.
- Funções avançadas de Provisionamento (Create), Leitura (Read), Atualização (Update) e Purga (Delete) de insumos.
- Sistema de ordenação de matriz (Alfabética, Base Alta, Base Baixa).
- Renderização de visão detalhada por rota paramétrica (`/prato/:id`).

### 3. ⏱️ Fluxo Operacional de Produção
- Interface interativa simulando o avanço lógico do status de um pedido de delivery ("Pendente" → "Em Preparo" → "Entregue") controlada por manipulação de array no `useState`.

### 4. 💬 Módulo de Resolução SAC
- Central de tickets corporativos para anomalias em pedidos.
- Permite que o operador elabore pareceres técnicos, alterando o estado do chamado para "Resolvido" e renderizando o log de auditoria na interface.

### 5. 📈 Inteligência de Rede Fiscal
- Dashboard analítico renderizando **Gráficos SVG Dinâmicos** (Pizza, Coluna e Linha) construídos puramente com matemática e React, sem depender de bibliotecas pesadas de terceiros.
- Filtros por status de operação e ordenação de receita bruta.

---

## 🛠️ Stack Tecnológica B2B

A infraestrutura prescinde de frameworks CSS engessados, optando por estilização purista e performática:

- **React 18:** Motor de reatividade, componentização e gerenciamento de estados (`useState`, `useEffect`).
- **Vite:** Bundler de ultra-alta velocidade para compilação local e build de produção.
- **React Router DOM v6:** Roteamento client-side para navegação SPA e tratamento de parâmetros de URL.
- **CSS3 Avançado:** Grid/Flexbox layouts, animações keyframe, media queries fluídas e transição de modos (Claro/Escuro) utilizando CSS Variables.
- **Lucide React:** Biblioteca de iconografia vetorial escalável.
- **Vercel Edge Network:** Configuração customizada (`vercel.json`) para reescrita de rotas (rewrites) garantindo o bypass de Erros 404 em implantações SPA.

---

## 💡 Auditoria de Aprendizado

A construção do Bitebox consolidou habilidades arquiteturais críticas de front-end corporativo:

1. **Subversão de Requisitos:** Capacidade de pegar um tema básico acadêmico e pivotar para um modelo de negócios escalável de mercado.
2. **Engenharia de Estados Complexos:** Imutabilidade em matrizes e objetos manipulados pelo `useState` para garantir a re-renderização precisa do DOM.
3. **Desenho de Componentes Matemáticos:** Manipulação de propriedades absolutas de SVGs parametrizados dinamicamente via estado.
4. **Responsividade Agressiva:** Transmutação de *Sidebars* de desktop para *Bottom Navigation Bars* nativas de aplicativos em dispositivos móveis, sem sacrificar usabilidade da tabela CRUD.
5. **Integração de DevOps Front-end:** Preparação de builds lógicas para instâncias serverless (Vercel), garantindo integridade de rotas virtuais.