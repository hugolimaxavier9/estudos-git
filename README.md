# Desafio Port Louis — Estudos Git (Cypress + Jest/Puppeteer)

Automação de testes para GitHub com foco em confiabilidade: comandos reutilizáveis, `cy.session()` e seletores estáveis (XPath quando necessário).

---

## Quickstart (passo a passo)

1. Clone e instale dependências:

```powershell
git clone https://github.com/hugolimaxavier9/estudos-git.git
cd estudos-git
npm install
```

2. Crie `.env` (NÃO commitar) com email e senha do GitHub:

```env
USER_EMAIL=seu_email@example.com
USER_PASSWORD=sua_senha
BASE_URL=https://github.com
```

3. Exemplos de execução:

- Abrir Cypress (UI):

```powershell
npx cypress open
```

- Rodar um spec específico (headless):

```powershell
npx cypress run --spec "cypress/e2e/integracaoRepor.cy.js"
```

- Rodar o spec de logout isolado:

```powershell
npx cypress run --spec "cypress/e2e/logout.cy.js"
```

- Rodar testes Jest/Puppeteer:

```powershell
npx jest tests/login.test.js --runInBand
```

### Jest + Puppeteer — modos headless / mostrando navegador

- Headless (padrão):

```powershell
npx jest tests/login.test.js --runInBand
```

- Mostrar o navegador (headed) — PowerShell:

```powershell
$env:HEADLESS = "false"; npx jest tests/login.test.js --runInBand
```

- Scripts npm sugeridos para Jest:

```json
"scripts": {
   "test:jest": "jest --runInBand",
   "test:jest:show": "powershell -Command \"$env:HEADLESS='false'; npx jest --runInBand\""
}
```

---

## O que este repositório fornece

- `cypress/e2e/login.cy.js`: fluxo de login e usos de `cy.login()`.
- `cypress/e2e/integracaoRepor.cy.js`: navegação em repositories e criação de repositório (usa XPath quando necessário).
- `cypress/e2e/logout.cy.js`: spec isolado para validar logout.
- `cypress/support/commands.js`: comandos `cy.login()`, `cy.logout()` e helpers.

---

## Uso rápido dos comandos (exemplos)

- Em um spec autenticado simples:

```js
describe('Fluxo autenticado', () => {
   beforeEach(() => cy.login());

   it('faz algo autenticado', () => {
      // seu teste aqui
   });
});
```

- Para validar logout isoladamente:

```js
it('faz logout', () => {
   cy.login();
   cy.logout();
   cy.url().should('include', '/logout');
});
```

---

## Screenshots e artefatos

- Path padrão: `cypress/screenshots/`.
- Exemplo de arquivo gerado: `cypress/screenshots/e2e/integracaoRepor.cy.js/repo-created.png`.

---

## Boas práticas / Troubleshooting rápido

- Prefira usar um PAT (`USER_TOKEN`) ao invés de senha.
- Sincronização: use `cy.intercept()` e `cy.wait()` por alias em vez de `cy.wait()` fixo.
- utilizei o `cy.wait()`, pois o `cy.intercept()` estava sempre quebrando.
- Elemento não encontrado: aumente timeout do seletor:

```js
cy.get('seletor', { timeout: 30000 })
```

- Se logout estiver instável, execute `cypress/e2e/logout.cy.js` isolado e envie o screenshot/console para eu ajustar seletores.

---

## Scripts sugeridos (opcional)

Adicione ao `package.json` para conveniência:

```json
"scripts": {
   "cypress:open": "cypress open",
   "cypress:run": "cypress run",
   "test:jest": "jest --runInBand"
}
```

Posso aplicar esses scripts por você.

---

## Autor
Hugo Lima Xavier — https://github.com/hugolimaxavier9

**Última atualização:** Dezembro 2025
