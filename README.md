# Desafio Port Louis - Estudos Git

Projeto de automação de testes para GitHub usando **Cypress** e **Jest + Puppeteer**, com foco em seletores **XPath** e fluxos de autenticação.

---

## 📋 Sumário

1. [Instalação](#instalação)
2. [Configuração de Variáveis de Ambiente](#configuração-de-variáveis-de-ambiente)
3. [Cypress - Testes E2E](#cypress---testes-e2e)
4. [Jest + Puppeteer - Testes E2E](#jest--puppeteer---testes-e2e)
5. [Estrutura do Projeto](#estrutura-do-projeto)

---

## 🚀 Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/hugolimaxavier9/estudos-git.git
cd estudos-git
npm install
```

### Dependências Principais

- **Cypress**: Framework de testes E2E
- **cypress-xpath**: Plugin para suporte a seletores XPath no Cypress
- **Jest**: Framework de testes
- **Puppeteer**: Navegador automatizado (headless e headful)
- **dotenv**: Carregamento de variáveis de ambiente

---

## 🔐 Configuração de Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com suas credenciais do GitHub:

```env
USER_EMAIL=seu_email@example.com
USER_PASSWORD=sua_senha
USER_LOGIN=seu_username_github
BASE_URL=https://github.com
```

⚠️ **Importante**: Não commit o arquivo `.env` no repositório (já está em `.gitignore`).

---

## 🧪 Cypress - Testes E2E

### Arquivos de Testes

- **`cypress/e2e/loginGithub.cy.js`** - Testes de login e logout
- **`cypress/e2e/integracaoRepor.cy.js`** - Teste de criação de repositório usando XPath

### Testes Disponíveis no `integracaoRepor.cy.js`

#### 1. Abrir Repositories e Pull Requests

```bash
npx cypress run --spec "cypress/e2e/integracaoRepor.cy.js" --env USER_EMAIL=seu_email,USER_PASSWORD=sua_senha
```

**O que faz:**
- Login no GitHub
- Abre a aba "Repositories"
- Seleciona um repositório aleatório
- Navega até a aba "Pull requests"
- Valida que a URL contém `/pulls`

#### 2. Criar Repositório usando XPath

```bash
npx cypress run --spec "cypress/e2e/integracaoRepor.cy.js" --env USER_EMAIL=seu_email,USER_PASSWORD=sua_senha,USER_LOGIN=seu_username
```

**O que faz:**
- Login no GitHub
- Navega para `/new` (criação de repositório)
- **Usa XPath para localizar o campo de nome**: `//input[@id="repository-name-input"]`
- Digita um nome único (com timestamp)
- **Usa XPath para clicar no botão**: `//button[contains(normalize-space(.), 'Create repository')]`
- Valida que a URL contém o nome do repositório criado

**Seletores XPath Utilizados:**

```xpath
# Campo de nome do repositório
//input[@id="repository-name-input"]

# Botão Create repository
//button[contains(normalize-space(.), 'Create repository')]

# Link do repositório criado
//a[contains(@href, '<repoName>')]
```

### Testes no `loginGithub.cy.js`

#### Login com Credenciais Válidas

```bash
npx cypress run --spec "cypress/e2e/loginGithub.cy.js" --env USER_EMAIL=seu_email,USER_PASSWORD=sua_senha
```

**Valida:**
- Login bem-sucedido
- Dashboard é exibido
- Avatar do usuário está visível
- URL não contém `/login`

#### Logout com Sucesso

**Valida:**
- Clique no avatar abre menu
- Clique em "Sign out" funciona
- Redirecionamento para `/login`
- Botão "Sign in" visível

### Executar Testes Cypress

**Modo interativo (UI):**

```bash
npx cypress open
```

**Modo headless:**

```bash
npx cypress run --spec "cypress/e2e/integracaoRepor.cy.js"
```

**Com variáveis de ambiente inline:**

```bash
npx cypress run --spec "cypress/e2e/integracaoRepor.cy.js" --env USER_EMAIL=you@example.com,USER_PASSWORD=yourpass,USER_LOGIN=yourlogin
```

---

## 🧬 Jest + Puppeteer - Testes E2E

### Arquivos de Testes

- **`tests/login.test.js`** - Teste de login usando Puppeteer
- **`tests/createRepo.test.js`** - Criação de repositório com XPath
- **`tests/logout.test.js`** - Teste de logout
- **`tests/utils.js`** - Helpers e funções utilitárias

### Teste de Login

**Arquivo:** `tests/login.test.js`

```bash
npx jest tests/login.test.js --runInBand
```

**O que faz:**
- Abre navegador headless
- Navega até `/login`
- Digita email e senha (de `process.env`)
- Clica em "Sign in"
- Valida que o avatar está visível
- Valida que a URL não é mais `/login`

**Modo Visível (ver navegador aberto):**

```bash
$env:HEADLESS="false"
npx jest tests/login.test.js --runInBand
```

Ou use o script npm:

```bash
npm run test:login:show
```

### Teste de Criação de Repositório com XPath

**Arquivo:** `tests/createRepo.test.js`

```bash
npx jest tests/createRepo.test.js --runInBand
```

**O que faz:**
- Login automatizado
- Navega para `/new`
- **Tenta vários XPaths** para encontrar o campo de nome:
  - `//*[@id="repository_name"]`
  - `//*[@id="repository-name-input"]`
  - `//input[@name='repository[name]']`
  - `//input[@name='name']`
- Digita um nome único
- **Localiza botão via XPath**: `//button[contains(...,'Create repository')]`
- Valida que a URL contém o nome do repo

### Teste de Logout

**Arquivo:** `tests/logout.test.js`

```bash
npx jest tests/logout.test.js --runInBand
```

**O que faz:**
- Login automatizado
- Clica no avatar
- **Localiza "Sign out" via XPath**
- Clica e aguarda navegação
- Valida redirecionamento para `/login`

### Executar Todos os Testes Jest

```bash
npm run test:jest
```

Ou:

```bash
npx jest --runInBand
```

### Scripts Npm Disponíveis

```json
{
  "test:jest": "jest --runInBand",
  "test:login:show": "set HEADLESS=false && jest tests/login.test.js --runInBand"
}
```

---

## 📁 Estrutura do Projeto

```
estudos-git/
├── cypress/
│   ├── e2e/
│   │   ├── integracaoRepor.cy.js      (Testes: repositories, criar repo com XPath)
│   │   └── loginGithub.cy.js          (Testes: login, logout)
│   ├── fixtures/
│   │   └── example.json
│   └── support/
│       ├── commands.js
│       ├── e2e.js                     (Registra cypress-xpath)
│       └── index.js
├── tests/
│   ├── login.test.js                  (Jest: login simples)
│   ├── createRepo.test.js             (Jest: criar repo com XPath)
│   ├── logout.test.js                 (Jest: logout)
│   ├── utils.js                       (Jest: helpers de login, getByXPath)
│   └── screenshots/                   (Pasta para armazenar screenshots)
├── .env                               (Variáveis de ambiente - NÃO commitar)
├── .gitignore
├── cypress.config.js
├── package.json
├── package-lock.json
└── README.md
```

---

## 🔍 Seletores XPath Utilizados

### Cypress

```xpath
# Campo de nome (em /new)
//input[@id="repository-name-input"]

# Botão Create Repository
//button[contains(normalize-space(.), 'Create repository')]

# Link do repositório criado
//a[contains(@href, 'repo-xpath-<timestamp>')]
```

### Jest + Puppeteer

```xpath
# Campo de nome (tenta vários)
//*[@id="repository_name"]
//*[@id="repository-name-input"]
//input[@name='repository[name]']
//input[@name='name']

# Botão Create Repository
//button[contains(normalize-space(.), 'Create repository')]

# Sign out button
//button[contains(., 'Sign out')]
```

---

## 🐛 Troubleshooting

### Cypress não encontra elemento

**Solução:** Aumentar timeout no seletor
```javascript
cy.get('selector', { timeout: 30000 })
```

### Jest/Puppeteer timeout

**Solução:** Verificar se as credenciais estão corretas no `.env`

**Solução:** Desativar 2FA da conta GitHub (se habilitado)

### Variáveis de ambiente não carregam

**Solução:** Confirmar que o arquivo `.env` existe e tem as variáveis corretas
```bash
cat .env
```

---

## 📝 Resumo dos Fluxos Testados

### ✅ Cypress

1. **Login + Repositories + Pull Requests**
   - Autentica no GitHub
   - Abre aba Repositories
   - Seleciona repo aleatório
   - Clica em Pull requests

2. **Criar Repositório com XPath**
   - Login
   - Navega para `/new`
   - Preenche nome (via XPath)
   - Clica botão (via XPath)
   - Valida URL com repo criado

3. **Logout**
   - Login
   - Clica avatar
   - Clica "Sign out"
   - Valida redirecionamento

### ✅ Jest + Puppeteer

1. **Login Simples**
   - Preenche credenciais
   - Clica "Sign in"
   - Valida avatar visível

2. **Criar Repositório com XPath**
   - Tenta múltiplos XPaths para input
   - Digita nome único
   - Localiza e clica botão via XPath
   - Valida URL

3. **Logout**
   - Clica avatar
   - Localiza "Sign out" via XPath
   - Clica e valida redirecionamento

---

## 📄 Licença

ISC

## 👤 Autor

Hugo Lima Xavier - [@hugolimaxavier9](https://github.com/hugolimaxavier9)

---

**Última atualização:** Dezembro 2025
