# Template React Micro fronts

Este repositório contém um template para a criação de um micro-frontend na arquitetura.

## Sumário

- [Template React Micro fronts](#template-react-micro-fronts)
  - [Sumário](#sum%C3%A1rio)
  - [Introdução](#introdu%C3%A7%C3%A3o)
    - [Principais tecnologias utilizadas](#principais-tecnologias-utilizadas)
    - [Pré-requisitos](#pr%C3%A9-requisitos)
  - [Recursos disponíveis](#recursos-dispon%C3%ADveis)
    - [Instalação](#instala%C3%A7%C3%A3o)
  - [Configurações](#configura%C3%A7%C3%B5es)
    - [Possíveis configs](#poss%C3%ADveis-configs)
    - [Variáveis de ambiente](#vari%C3%A1veis-de-ambiente)
    - [npm scripts](#npm-scripts)
  - [Testes Unitários](#testes-unit%C3%A1rios)
  - [Produção](#produ%C3%A7%C3%A3o)
  - [Possíveis melhorias](#poss%C3%ADveis-melhorias)
  - [Autor](#autor)
  - [License](#license)


## Introdução

Nessa seção é descrito as dependências utilizadas na aplicação como um todo, instruções de como iniciar o projeto em modo de desenvolvimento, realização de testes e deploy da aplicação.

### Principais tecnologias utilizadas

* [React](https://reactjs.org/) - O framework web utilizado.  Versão utilizada 16.8.6;
* [Node](https://nodejs.org/) - Necessário para rodar o fragment.
* [NPM](https://www.npmjs.com) - Gerenciador de Dependências.
* [Jest](https://jestjs.io/) - Framework de testes, necessário para criação dos specs, contendo spies, stubs, assertions e mais.
* [Webpack](https://webpack.js.org/) - Serve para buildar a aplicação, empacotando-a, lidando com assets como imagens e fontes, sass, entre outros recursos importantes.
* [Docker](https://www.docker.com) - Ferramenta de criação de containers para facilitar o processo de desenvolvimento da aplicação.
* [BetterScripts](https://github.com/benoror/better-npm-run) Possibilita a criação de diferentes npm scripts com variáveis de ambiente junto.
* [TypeScript](https://www.typescriptlang.org/) - Superset de JavaScript utilizado para tipagem de variável, criação de interfaces, enum, generics, entre outros.
* [TSLint](https://palantir.github.io/tslint/) - Analisador de código TypeScript.
* [Eslint](https://eslint.org/) - Analisador de código JavaScript.

### Pré-requisitos

O que é necessário para rodar o template: 

- Node versão v10.9.0
- GIT instalado
- Conta no Github

## Recursos disponíveis

Segue a lista de alguns dos recursos disponíveis para rodar esse projeto.

* Diferentes outputs libraryTarget - É possível buildar uma versão web com HTML ou em formato de lib com UMD, AMD, CommonJS ou CommonJS2. Esse build customizado serve para a aplicação poder ingressar em uma arquitetura de micro-frontend.
* npm scripts - Possui diferentes tipos de npm scripts utilizando o better script, é aqui que é possível passar variáveis de ambiente e customizar como iniciar o projeto, rodar testes, build, lint, tslint, csslint, entre outros.
* Dockerfile - Para facilitar o processo de deploy futuro, é nele que setamos args para serem variáveis de ambiente.
* Build via server - O start do build é feito via server e código, chamando o webpack. Essa abordagem da mais flexibilidade e customização ao projeto.
* Fragment - Adicionado fragment que cria os headers pra vários arquivos e le um diretório buscando os arquivos de forma recursiva.
* Suporte a Sass
* Code spliting - Para diminuir o first-loading da aplicação, deixando-o mais leve e carregando os scripts em lazy-loading.
* Criação de ambientes de forma fácil
* Injeção de variáveis de ambiente
* Ferramenta para ver o tamanho do bundle por dependência - Basta executar npm test e irá abrir uma janela do browser com o mapa de dependências.
* Chunk files para produção - Formato que é feito o deploy dos bundles, a hash criada no nome do arquivo é uma forma que o browser identifica quando deve ou não cachear algo.
* Externals para carregar dependências via CDN ou micro-front
* Adicionado algumas dependências já ao build
  * Axios
  * ClassName
  * Prop
  * RedBox React
* Suporte a typescript - O projeto possibilita criar componentes em TypeScript (extensão TSX) e componentes em JavaScript (extensão JSX), de forma simultânea.
* Otimizações de bundle - Através do webpack existe algumas configs para otimização do bundle.
* Pré-push do Husky que executa lint e build antes de subir um código não validado.

### Instalação

Passos necessários para rodar o projeto sem o docker: 

- Clonar no projeto: 
```
  git clone https://github.com/adrianlemess/react-microfront-template
```

- Entrar no diretório do projeto e instalar as dependências necessárias:

```
cd react-microfront-template

npm install
```

- Rodar o projeto em desenvolvimento:
```
npm start
```

- Rodar o projeto simulando prod
```
npm run start:prod
```

## Configurações

Essa seção descreve algumas possívels customizações que podemos fazer no template, como variáveis de ambiente, configs e quais npm scripts temos disponíveis.

### Possíveis configs

Package.json - Alterar o name, alterar o ENTRY_POINT_ID ou adicionar via pipeline jenkins.
Webpack - alterar library name
Adicionar mais um ambiente - adicionar uma env no webpack define plugins, globals, eslintrc e typings.d.ts

### Variáveis de ambiente

- PUBLIC_PATH - utilizada no processo de build da aplicação, se a aplicação roda sozinha o publicPath vai ser ela mesmo (ex: /) e se rodar no microfronts ai pode variar dependendo da configuração utilizado na arquitetura. publicPath serve para ajudar a resolver os assets.
- ENTRY_POINT_ID - o id da div que o componente de bootstrap irá fazer o attach. Útil para arquitetura de microfronts. Valor default: react-app-root;
- NODE_ENV - Ambiente em que está rodando a aplicação.
- LIBRARY_TARGET - Formato que irá ser buildado a aplicação, já tem npm script especifico para cada formato.

### npm scripts

- "start" - Inicia aplicação em desenvolvimento com hot reloading
- "start:prod" - Inicia aplicação em produção com hot reloading
- "test" - Rodar os testes
- "clean" - Serve para limpar os arquivos de dist
- "debug" - Modo debug para alguma config especifica do vscode
- "push" - Pré-push do husky
- "compile:amd" - Build AMD
- "compile:umd" - Build UMD
- "compile:cjs" - Build CommonJS
- "compile:cjs2" - Build CommonJS2
- "tslint" - Executar lint para os arquivos typescript
- "eslint" - Executar lint para os arquivos javascript
- "csslint" - Executar lint para os arquivos de estilo

## Testes Unitários

Para rodar os testes unitários é necessário rodar o comando: 

```
npm run test
```

## Produção

  Foi comfigurado alguns compile no projeto, para executar um deles o comando é: 

  ```
  PUBLIC_PATH="http://URL_QUE_ESTA_RODANDO/dist/" npm run compile:format
  ```

  Onde o format pode ser umd, amd, cjs, cjs2.
  A URL é a da própria aplicação e não a do microfront.

## Possíveis melhorias

- Adicionar font-awesome
- Adicionar o Cypress para testes E2E
  
## Autor

* **Adrian Lemes Caetano** -  [GitHub](https://github.com/adrianlemess)

<a href="https://adrianlemess.github.io">
  <img 
  alt="Imagem do Autor Adrian Lemes" src="https://avatars1.githubusercontent.com/u/12432777?s=400&u=927d77dcc0b02c1ac69360f2194336a2517e6f08&v=4" width="100">
</a>

## License

Este projeto possui Licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para saber mais detalhes.