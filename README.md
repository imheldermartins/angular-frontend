# Desafio Fullstack Vertrau | Helder

Este é o frontend **"Soft Produção"**, desenvolvido como parte do **Desafio Vertrau**. O projeto utiliza as tecnologias mais recentes do ecossistema Angular para entregar uma interface performática, escalável e de fácil manutenção.

---

## Tecnologias

- **Angular 21+**: Utilizando as APIs mais modernas (Signals, novos fluxos de controle).
- **PrimeNG 21+**: Biblioteca de componentes UI robusta para agilidade no desenvolvimento.
- **TailwindCSS v4**: Estilização utilitária de última geração para design responsivo e customizado.
- **Signal-based Forms**: Abordagem experimental e moderna para gerenciamento de formulários reativos.
- **Docker**: Containerização completa para garantir paridade entre ambientes.

### Componentes

Implementação simplificada com componentes base customizados (`Button`, `Input`, `Typography`).

- **Custom UI Kit**: Todos os componentes utilizam a utilidade `cn.ts` (Tailwind Merge + CLSX) para permitir extensibilidade total de estilos sem conflitos.

### Padrão de Tabelas CRUD MultTable<>Actions("api/v0/collections/")

O projeto embora não adote (por conta do prazo) adotaria um padrão de abstração para tabelas CRUD, inspirado em ecossistemas como ReactJS:

- **Auto-loading**: Tabelas que carregam automaticamente a partir de uma `<collection>/` via `getAll()`.
- **Dynamic Actions**: Definição simplificada de ações por linha, onde passamos apenas o `id` ou o `bodyRequest` para operações de edição e exclusão de forma declarativa.

---

## 🚧 Elementos Pendentes (Roadmap)

Ainda estamos em fase de evolução para cumprir 100% dos requisitos do desafio:

- [ ] **Integração ViaCEP**: Implementação do `AddressService` para busca automática de logradouro ao digitar o CEP.
- [ ] **Cadastro Multi-etapas**: Implementação do Wizard (2 abas) na página de cadastro de usuários.
- [ ] **Validações Estritas**: Restrição de entrada numérica para o campo "Número" no endereço.
- [ ] **Resumo em Modal**: Exibição do resumo dos dados via `p-dialog` antes da finalização.
- [ ] **Testes Unitários**: Cobertura de testes para os serviços de integração e lógica de formulários.

---

## Executando

### Docker

Para rodar o projeto em um container isolado:

```sh
docker compose up -d --build
```

### Desenvolvimento Local

Para testar localmente em ambiente de desenvolvimento:

```bash
npm install
npm start
# ou
ng serve
```

---

_Desenvolvido com foco em excelência técnica para o Desafio Vertrau._
