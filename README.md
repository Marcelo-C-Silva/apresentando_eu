# Meu Portfólio

Portfólio pessoal desenvolvido com **React**, **Vite** e **System.css**, inspirado na interface clássica dos computadores Macintosh.

## Objetivo

Apresentar experiência, projetos, habilidades, currículo e formas de contato em uma experiência visual parecida com uma área de trabalho antiga, com janelas independentes e interface retrô.

## Tecnologias

- React
- Vite
- System.css
- react-rnd

## Como executar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Rode o servidor local:

   ```bash
   npm run dev
   ```

3. Abra a URL exibida no terminal. Normalmente:

   ```txt
   http://localhost:5173/
   ```

## Scripts

```bash
npm run dev
npm run build
npm run preview
```

## Estrutura principal

```txt
src/
  components/
  data/
  styles/
  utils/

public/
  assets/
```

## Funcionalidades

- Interface inspirada em Macintosh clássico
- Menu superior estilo sistema operacional
- Ícones na área de trabalho
- Janelas arrastáveis, redimensionáveis e maximizáveis no desktop, sempre ajustadas ao tamanho da tela
- Uma janela por vez, em tela cheia, no mobile
- Navegação por teclado (Esc fecha a janela ativa)
- Projetos carregados a partir de dados estruturados
- Player de música com CD girando: janela no desktop e mini barra no mobile, com pausa, troca de faixa e modo aleatório
- Currículo disponível para download
- Metadados para buscadores e compartilhamento (Open Graph)

## Autor

Desenvolvido por [João Marcelo Carneiro da Silva](https://github.com/Marcelo-C-Silva).
