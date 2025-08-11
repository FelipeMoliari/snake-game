# 🐍 Snake Game - Versão Moderna e Aprimorada
<img src="snake-game.gif">

## 📋 Visão Geral

Um jogo Snake moderno e sofisticado desenvolvido em JavaScript puro, com arquitetura modular, efeitos visuais impressionantes e sistema de power-ups inovador. Este projeto demonstra práticas avançadas de desenvolvimento front-end e design de jogos.

## ✨ Características Principais

### 🎮 Jogabilidade Aprimorada
- **Controles Duplos**: Suporte tanto para teclas WASD quanto setas direcionais
- **Sistema de Pausa**: Pause/resume com a tecla Espaço
- **Reinício Inteligente**: Botão "Play Again" funcional após game over
- **Crescimento Controlado**: Mecânica de crescimento precisa da cobra

### 🚀 Power-ups Únicos
- **⚡ Speed Boost**: Aumenta temporariamente a velocidade da cobra
- **×2 Double Score**: Dobra os pontos obtidos por um período
- **🛡️ Shield Teleport**: Permite atravessar paredes com efeito de teleporte
- **⏱️ Slow Motion**: Reduz a velocidade para controle mais preciso
- **↓ Shrink**: Reduz o tamanho da cobra instantaneamente

### 🎨 Efeitos Visuais
- **Gradientes Dinâmicos**: Cobra com efeitos de gradiente em tempo real
- **Sistema de Partículas**: Explosões visuais ao comer comida e coletar power-ups
- **Indicadores Visuais**: Feedback visual para power-ups ativos
- **Animações Fluidas**: Movimentação suave e responsiva
- **Efeitos de Sombra**: Realce visual com sombras e brilhos

### 📊 Sistema de Pontuação
- **Ranking Persistente**: Top 10 melhores pontuações salvas localmente
- **Sistema de Níveis**: Progressão automática com aumento de velocidade
- **Multiplicadores**: Pontuação dinâmica com power-ups

## 🏗️ Arquitetura Técnica

### 📁 Estrutura Modular
```
snake-game/
├── index.html              # Interface principal
├── styles.css              # Estilos e animações
├── js/
│   ├── config/
│   │   └── gameConfig.js   # Configurações centralizadas
│   ├── controllers/
│   │   └── Game.js         # Controlador principal do jogo
│   ├── entities/
│   │   ├── Snake.js        # Lógica da cobra
│   │   ├── Food.js         # Sistema de comida
│   │   ├── PowerUp.js      # Entidades de power-up
│   │   └── Particle.js     # Sistema de partículas
│   ├── systems/
│   │   ├── GameState.js    # Gerenciamento de estado
│   │   ├── PowerUpSystem.js # Sistema de power-ups
│   │   └── BackgroundParticles.js # Partículas de fundo
│   └── utils/
│       └── helpers.js      # Funções utilitárias
```

### 🔧 Padrões de Design Implementados
- **MVC (Model-View-Controller)**: Separação clara de responsabilidades
- **Entity-Component System**: Entidades modulares e reutilizáveis
- **Observer Pattern**: Sistema de eventos para power-ups
- **Factory Pattern**: Criação dinâmica de power-ups e partículas
- **Singleton Pattern**: Gerenciamento centralizado de configurações

## 🎯 Funcionalidades Técnicas Avançadas

### ⚙️ Sistema de Configuração
- Configurações centralizadas e facilmente modificáveis
- Constantes para cores, durações e comportamentos
- Sistema flexível de tipos de power-ups

### 🔄 Game Loop Otimizado
- **RequestAnimationFrame**: Renderização suave e eficiente
- **Delta Time**: Movimentação independente de framerate
- **Collision Detection**: Detecção precisa de colisões
- **State Management**: Gerenciamento robusto de estados do jogo

### 💾 Persistência de Dados
- **LocalStorage**: Salvamento automático de rankings
- **JSON Serialization**: Estrutura de dados otimizada
- **Data Validation**: Validação de dados salvos

## 🎮 Como Jogar

### Controles
- **Movimento**: Use WASD ou setas direcionais
- **Pausa**: Pressione Espaço para pausar/despausar
- **Reiniciar**: Pressione R para reiniciar o jogo

### Objetivos
1. **Coma a comida** (quadrado vermelho) para crescer e ganhar pontos
2. **Colete power-ups** para obter habilidades especiais
3. **Evite colisões** com as paredes e com o próprio corpo
4. **Alcance a maior pontuação** possível

### Power-ups Especiais
- **⚡ Speed**: Movimento mais rápido por 10 segundos
- **×2 Double**: Pontos dobrados por 10 segundos
- **🛡️ Shield**: Proteção que permite teleporte através de paredes
- **⏱️ Slow**: Movimento mais lento para controle preciso
- **↓ Shrink**: Reduz o tamanho da cobra instantaneamente

## 🎨 Destaques Visuais

### Interface Moderna
- Design responsivo e atrativo
- Gradientes e efeitos CSS avançados
- Tipografia moderna e legível
- Feedback visual imediato

### Efeitos Especiais
- Partículas explosivas ao comer comida
- Brilho especial na cobra com shield
- Transições suaves entre estados
- Indicadores visuais de power-ups ativos

## 📈 Métricas de Performance

- **60 FPS**: Renderização suave e consistente
- **Baixo uso de memória**: Gerenciamento eficiente de recursos
- **Responsividade**: Controles precisos e responsivos
- **Compatibilidade**: Funciona em todos os navegadores modernos

## 🏆 Conclusão

Este projeto Snake representa uma implementação moderna e sofisticada do clássico jogo, demonstrando:

- **Arquitetura limpa e escalável**
- **Código bem estruturado e documentado**
- **Práticas modernas de desenvolvimento**
- **Experiência de usuário aprimorada**
- **Performance otimizada**

Um excelente exemplo de como transformar um conceito simples em uma experiência de jogo rica e envolvente usando tecnologias web modernas.

---

**Desenvolvido com ❤️ usando JavaScript puro, HTML5 Canvas e CSS3**
