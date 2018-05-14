module.exports = {
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module', // habilita suporte a ECMAScript modules
    ecmaFeatures: {
      impliedStrict: true, // todo código é considerado implicitamente 'strict' (mesmo sem 'use strict').
      jsx: true, // suporte a JSX
      experimentalObjectRestSpread: true,
    },
  },
  env: {
    browser: true, // permite vars globais de browsers
    commonjs: true, // permite vars globais de commonjs (p/ browser code que usa browserify/webpack)
    embertest: true, // permite vars globais de embertest
    es6: true, // permite recursos do ES6
    node: true, // permite vars globais do node e seu escopo
  },
  rules: { // all rules are disabled by default (veja "eslint:recommended" abaixo)
    'block-scoped-var': 2, // proíbe vars de serem usadas fora do bloco onde foram declaradas (emula estilo do C)
    'comma-dangle': [2, 'always-multiline'], // exige ',' em {}s e []s multi line e proíbe em single line
    'dot-location': [2, 'property'], // exige que newlines sejam antes do ponto numa *member expression* (ponto fica junto com propriedade).
    eqeqeq: [2, 'smart'], // exige comparação estrita (===) salvo em alguns casos (http://eslint.org/docs/rules/eqeqeq)
    indent: [2, 2], // exige indentação de 2 espaços
    'linebreak-style': [2, 'unix'], // proíbe quebras de linha do Windows
    'no-else-return': 2, // proíbe 'else' desnecessario quando 'if' já tem 'return' (pq pode ficar fora do bloco)
    'no-unused-vars': [2, { 'vars': 'all', 'args': 'none' }], // exige que todas as vars sejam usadas, ignora (ñ) uso de argumentos
    quotes: [2, 'single', 'avoid-escape'], // exige  '' e não reclama de "quotes 'assim'"
    semi: [2, 'always'], // exige ';'
    strict: [1, 'global'], // warn pedindo que todo código esteja no strict mode (declaração no escopo global, reclama de 'use strict's redundantes)
    'vars-on-top': 2, // exige que vars estejam declaradas no topo do escopo    
    'no-console': 0, // permite o uso de console.log em desenvolvimento e produção
  },
  extends: [ // extende conf. com a de outros arquivos (últimos tem primazia)
    'eslint:recommended', // habilita rules recomendadas (ver essas em <http://eslint.org/docs/rules/>)
  ],
};

//https://felipehw.github.io/2016/03/12/qualidade-de-vida-ao-desenvolver-javascript-eslint-atom-es6-jsx/