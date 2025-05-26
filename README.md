# Coopers Project

Este repositório contém duas aplicações:

- **`client/`** – Front-end em React + Vite + Tailwind CSS  
- **`backend/`** – API Express para envio de e-mail de contato

---

## Pré-requisitos

- **Node.js** v18+  
- **npm** ou **yarn**  
- Conta e projeto no **Supabase** (para Auth / To-Do)  
- Conta no **Resend** (para envio de e-mail)  

---

## 1. Clone do repositório

```bash
git clone git@github.com:felipepitol/coopers-project-dev.git
cd coopers-project-dev
```

---

## 2. Configurar variáveis de ambiente

### 2.1. Front-end (`client/.env.local`)

Crie um arquivo `client/.env.local` com:

```ini
VITE_SUPABASE_URL=https://<your-supabase-project>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

### 2.2. Back-end (`backend/.env`)

Crie um arquivo `backend/.env` com:

```ini
PORT=4000
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 3. Criar tabela no Supabase

Execute essa query SQL no editor do Supabase para criar a tabela de tarefas:

```sql
-- Criar tabela de tarefas (todos)
create table if not exists todos (
  id           uuid        primary key default uuid_generate_v4(),
  user_id      uuid        not null,                           -- vinculado ao usuário supabase
  label        text        not null,                           -- descrição da tarefa
  is_done      boolean     not null default false,             -- status concluído
  inserted_at  timestamptz not null default now(),             -- data de criação
  position     int         not null default 0,                 -- índice para ordenação
  constraint fk_todos_user
    foreign key(user_id) references auth.users(id) on delete cascade
);
```

---

## 4. Instalar dependências

### Usando workspaces no root:

```bash
npm install
```

### Ou instale separadamente:

```bash
cd client && npm install
cd ../backend && npm install
```

---

## 5. Executar em modo de desenvolvimento

Abra dois terminais:

### 5.1. Front-end

```bash
cd client
npm run dev
```

Por padrão, o Vite roda em http://localhost:5173.

### 5.2. Back-end

```bash
cd backend
npm run dev
```

O Express ficará disponível em http://localhost:4000.

---

## 6. Testar funcionalidades

### Cadastro / Login

- Acesse `http://localhost:5173`, clique em **Entrar**, registre-se ou faça login  
- Confirme o e-mail enviado pelo Supabase  

### To-Do List

- Após login, a seção “To-Do List” será exibida  
- Crie, edite, conclua e reordene tarefas (persistidas no Supabase)  

### Formulário de contato

- Preencha e envie o formulário na seção **GET IN TOUCH**  
- O back-end enviará um e-mail via Resend  

---

## 7. Build para produção

### 7.1. Front-end

```bash
cd client
npm run build
```

A saída estará em `client/dist`.

### 7.2. Back-end

Se não houver etapa de build, copie `backend/src`, `package.json` e instale dependências no servidor.

---

## Estrutura de pastas

```bash
.
├── client/             # React + Vite + Tailwind
│   ├── public/
│   ├── src/
│   ├── .env.local      # vars front-end
│   ├── package.json
│   └── vite.config.js
├── backend/            # Express API de contato
│   ├── src/
│   ├── .env            # RESEND_API_KEY + PORT
│   └── package.json
├── .gitignore
└── README.md
```

---

## Dicas

- Em produção, sirva o front-end com **Nginx** e o back-end com **PM2**
- Configure **CI/CD** (GitHub Actions) para build e deploy automático na sua VPS

---

Feito por **Felipe Pitol**  
**Coopers Project – Maio/2025**
