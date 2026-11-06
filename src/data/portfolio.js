export const profile = {
  name: 'João Marcelo Carneiro da Silva',
  displayName: 'João Marcelo',
  role: 'Desenvolvedor Full Stack',
  location: 'Fortaleza, CE',
  course: 'Análise e Desenvolvimento de Sistemas (previsão: 2027)',
  email: 'carneiromarcelodev@gmail.com',
  github: 'https://github.com/Marcelo-C-Silva',
  linkedin: 'https://www.linkedin.com/in/joão-marcelo-009873234/',
  resume: 'docs/Curriculo_Joao_Marcelo.pdf',
  featuredSkills: ['C#, .NET e Blazor', 'Ruby on Rails', 'Angular', 'PostgreSQL e Docker'],
  softSkills: ['Organização no código', 'Proatividade', 'Foco na experiência do usuário'],
};

export const experience = [
  {
    role: 'Desenvolvedor Full Stack – C# / Blazor',
    company: 'Unichristus',
    period: '2026 – atual',
    location: 'Fortaleza, CE',
    items: [
      'Desenvolvimento e evolução de sistemas web com C# no ecossistema .NET.',
      'Construção de interfaces ricas, responsivas e dinâmicas com Blazor.',
      'Atuação em todo o ciclo de desenvolvimento, da modelagem de dados à experiência final.',
      'Integração de soluções e otimização de fluxos internos do ambiente educacional.',
    ],
  },
  {
    role: 'Estágio em Desenvolvimento Full Stack',
    company: 'SEFIN – Secretaria de Finanças de Fortaleza',
    period: '2024 – 2026',
    location: 'Fortaleza, CE',
    items: [
      'Desenvolvimento e manutenção de aplicações em Ruby on Rails (MVC) integradas a front-end em Angular.',
      'Construção de interfaces com Material Design e arquitetura MVVM.',
      'Integração de APIs REST, versionamento com Git/GitLab e uso de Docker.',
      'Trabalho com bancos Oracle e PostgreSQL, com correção de bugs e melhoria de desempenho.',
    ],
  },
];

export const education = [
  {
    title: 'Análise e Desenvolvimento de Sistemas',
    detail: 'Faculdade Descomplica | previsão de conclusão: 2027',
  },
];

export const courses = [
  { title: 'Desenvolvedor Full Stack', detail: 'IEL | 2024' },
  { title: 'Desenvolvedor Web', detail: 'Udemy | 2024' },
  { title: 'UI Design com Figma', detail: 'Udemy | 2024' },
  { title: 'Programador', detail: 'Senac | 2024' },
  { title: 'Desenvolvedor Full Stack', detail: 'Digital College | 2022' },
  { title: 'Desenvolvedor PHP e Magento', detail: 'Digital College | 2022' },
];

const tech = {
  csharp: { name: 'C#', icon: 'icons/csharp.svg' },
  javascript: { name: 'JavaScript', icon: 'icons/javascript.svg' },
  ruby: { name: 'Ruby', icon: 'icons/ruby.svg' },
  java: { name: 'Java', icon: 'icons/java-brands-solid.svg' },
  php: { name: 'PHP', icon: 'icons/php.svg' },
  html: { name: 'HTML5', icon: 'icons/html5.svg' },
  css: { name: 'CSS3', icon: 'icons/css3.svg' },
  dotnet: { name: '.NET', icon: 'icons/dotnet.svg' },
  blazor: { name: 'Blazor', icon: 'icons/blazor.svg' },
  rails: { name: 'Ruby on Rails', icon: 'icons/rubyonrails.svg' },
  angular: { name: 'Angular', icon: 'icons/angular.svg' },
  react: { name: 'React', icon: 'icons/react.svg' },
  stimulus: { name: 'Stimulus', icon: 'icons/stimulus.svg' },
  bootstrap: { name: 'Bootstrap', icon: 'icons/bootstrap.svg' },
  postgresql: { name: 'PostgreSQL', icon: 'icons/postgresql.svg' },
  oracle: { name: 'Oracle', icon: 'icons/oracle.svg' },
  mysql: { name: 'MySQL', icon: 'icons/mysql.svg' },
  sqlite: { name: 'SQLite', icon: 'icons/sqlite.svg' },
  graphql: { name: 'GraphQL', icon: 'icons/graphql.svg' },
  make: { name: 'Make', icon: 'icons/make.svg' },
  pipefy: { name: 'Pipefy', icon: 'icons/pipefy.svg' },
  git: { name: 'Git', icon: 'icons/git.svg' },
  github: { name: 'GitHub', icon: 'icons/github.svg' },
  gitlab: { name: 'GitLab', icon: 'icons/gitlab.svg' },
  docker: { name: 'Docker', icon: 'icons/docker.svg' },
  figma: { name: 'Figma', icon: 'icons/figma.svg' },
  canva: { name: 'Canva', icon: 'icons/canva.svg' },
  selenium: { name: 'Selenium', icon: 'icons/selenium.svg' },
};

export const technologies = [
  {
    title: 'Linguagens',
    items: [tech.csharp, tech.javascript, tech.ruby, tech.java, tech.php, tech.html, tech.css],
  },
  {
    title: 'Frameworks',
    items: [tech.dotnet, tech.blazor, tech.rails, tech.angular, tech.react, tech.stimulus, tech.bootstrap],
  },
  {
    title: 'Banco de dados',
    items: [tech.postgresql, tech.oracle, tech.mysql, tech.sqlite],
  },
  {
    title: 'APIs e automação',
    items: [tech.graphql, tech.make, tech.pipefy],
  },
  {
    title: 'Ferramentas',
    items: [tech.git, tech.github, tech.gitlab, tech.docker, tech.figma, tech.canva, tech.selenium],
  },
];

export const projects = [
  {
    id: 'automacao-matricula',
    title: 'Automação de Pré-Matrículas',
    image: 'img/automacao-matricula.svg',
    context: 'Projeto de destaque | 2026',
    summary: 'Fluxo automatizado de ponta a ponta para triagem e mapeamento de pré-matrículas acadêmicas.',
    description:
      'Fluxo construído de ponta a ponta para triar e mapear pré-matrículas. No Make, a lógica dinâmica segmenta os estudantes pelo período letivo atual. No Pipefy, a integração usa API e consultas GraphQL para criar e atualizar registros.',
    technologies: [tech.make, tech.pipefy, tech.graphql],
    links: [],
  },
  {
    id: 'bodega-bytes',
    title: 'Bodega de Bytes',
    image: 'img/site-bodega.webp',
    context: 'Projeto em grupo | avaliação acadêmica',
    summary: 'Projeto em grupo desenvolvido com foco no front-end, criado para avaliação acadêmica.',
    description:
      'Foi pensado como um local confortável para desenvolvedores compartilharem projetos e ideias. Hoje tem a página inicial, com possibilidade de evolução futura.',
    technologies: [tech.html, tech.css, tech.javascript],
    links: [{ label: 'Ver site', href: 'https://bodegadebytes.netlify.app' }],
  },
  {
    id: 'prototype-bodega',
    title: 'Protótipo Bodega de Bytes',
    image: 'img/prototype-bodega.webp',
    context: 'Design de interface',
    summary: 'Protótipo desenvolvido no Figma para uma rede social chamada Bodega de Bytes.',
    description:
      'Protótipo criado para explorar design de interfaces, usabilidade, criatividade visual e estrutura de uma experiência social para desenvolvedores.',
    technologies: [tech.figma],
    links: [
      {
        label: 'Abrir no Figma',
        href: 'https://www.figma.com/design/nvtuxxGAmujiueOOZ7xYVu/bodega-de-bytes?node-id=0-1&t=IrEhxLtcrLqmnjtz-1',
      },
    ],
  },
  {
    id: 'my-links',
    title: 'My Links',
    image: 'img/my-links.webp',
    summary: 'Projeto compacto em HTML, CSS e JavaScript para organizar links importantes.',
    description:
      'Projeto feito para armazenar links importantes em uma interface simples, direta e fácil de usar.',
    technologies: [tech.html, tech.css, tech.javascript],
    links: [
      { label: 'Ver site', href: 'https://marcelo-c-silva.github.io/mylinks/' },
      { label: 'Ver código', href: 'https://github.com/Marcelo-C-Silva/mylinks' },
    ],
  },
  {
    id: 'to-do-list',
    title: 'To-Do List',
    image: 'img/to-do-list.webp',
    summary: 'Aplicação simples e funcional de lista de tarefas desenvolvida com HTML, CSS e JavaScript.',
    description:
      'Permite adicionar, marcar como concluídas e excluir tarefas de forma prática, com foco em organização e interatividade.',
    technologies: [tech.html, tech.css, tech.javascript],
    links: [
      { label: 'Ver site', href: 'https://marcelo-c-silva.github.io/to-do-list/' },
      { label: 'Ver código', href: 'https://github.com/Marcelo-C-Silva/to-do-list' },
    ],
  },
  {
    id: 'x-men-list',
    title: 'X-Men List',
    image: 'img/x-men.webp',
    context: 'Desafio Dev em Dobro',
    summary: 'Lista inspirada nos X-Men, criada para o desafio Dev em Dobro.',
    description:
      'Projeto feito com foco didático para ensinar desenvolvimento a iniciantes usando uma interface simples e intuitiva.',
    technologies: [tech.html, tech.css, tech.javascript],
    links: [
      { label: 'Ver site', href: 'https://marcelo-c-silva.github.io/x-men/' },
      { label: 'Ver código', href: 'https://github.com/Marcelo-C-Silva/x-men' },
    ],
  },
  {
    id: 'java-logica',
    title: 'Lógica de Programação em Java',
    image: 'img/atividade_de_logica.webp',
    context: 'Estudos',
    summary: 'Repositório com exercícios e práticas de lógica de programação em Java.',
    description:
      'Registro de exercícios, desafios e implementações feitos durante os estudos, com foco em raciocínio lógico, boas práticas e familiaridade com Java.',
    technologies: [tech.java],
    links: [
      { label: 'Ver código', href: 'https://github.com/Marcelo-C-Silva/aulas_java/tree/main/atividades' },
    ],
  },
];
