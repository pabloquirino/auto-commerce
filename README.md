# Auto Commerce

**Auto Commerce** é uma plataforma web para **compra e venda de veículos**, desenvolvida com **Angular 19**, que permite aos usuários anunciar, editar e gerenciar seus próprios anúncios após autenticação via **Google (Firebase Auth)**.

_Compatível com dispositivos móveis_ 📱

🔗 **Deploy:** https://auto-commerce-eight.vercel.app/

---

## ✨ Funcionalidades

- 🔐 Autenticação com Google (Firebase Authentication)
- 📝 Criar anúncios de veículos
- ✏️ Editar anúncios (somente o proprietário)
- 🗑️ Excluir anúncios
- 📋 Listagem de todos os anúncios
- 🔍 Filtros por:
  - Modelo
  - Marca
  - Ano
  - Faixa de preço
- 🔎 Visualização completa do anúncio
- 📞 Contato com o anunciante via WhatsApp
- 🧑‍💼 Exibição do perfil do anunciante (nome e foto)
- 🛡️ Proteção de rotas com Auth Guard
- 💾 Persistência de dados utilizando LocalStorage (mock)

---

## 🛠️ Tecnologias Utilizadas

- **Angular 19**
- **Angular Standalone Components**
- **TypeScript**
- **Firebase Authentication**
- **Tailwind CSS**
- **LocalStorage** (simulação de backend)
- **Jasmine / Karma** (testes unitários)

---

## 📁 Organização de Pastas

```txt
src/
├── app/
│   ├── data/                   # Dados mockados (cars.mock.ts)
│   │   └── cars.mock.ts
│   │
│   ├── environment/            # Dados do firebase
│   │   └── environment.ts
│   │ 
│   │
│   ├── guards/                 # Guards de autenticação
│   │   ├── auth.guard.ts
│   │   └── auth.guard.spec.ts
│   │
│   ├── homepage/               # Página inicial pública
│   │   ├── homepage.component.ts
│   │   ├── homepage.component.html
│   │   └── homepage.component.scss
│   │
│   ├── layout/                 # Layout principal e páginas protegidas
│   │   ├── anunciar/           # Página de anúncio de veículo
│   │   ├── explorar/           # Página de exploração de anúncios
│   │   ├── meus-anuncios/      # Página de anúncios do usuário
│   │   ├── ver-anuncio/        # Página de detalhes do anúncio
│   │   ├── layout.component.ts
│   │   ├── layout.component.html
│   │   ├── layout.component.scss
│   │   └── layout.routes.ts
│   │
│   ├── models/                 # Modelo da aplicação
│   │   └── car.model.ts
│   │
│   ├── services/               # Services da aplicação
│   │   ├── auth.service.ts
│   │   ├── auth.service.spec.ts
│   │   ├── car.service.ts
│   │   ├── car.service.spec.ts
│   │   └── toast.service.ts
│   │
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.config.ts
│   └── app.routes.ts
│
├── index.html
├── main.ts
└── styles.scss
````

## 🖼️ Preview da Aplicação

### Página Inicial
![Página Inicial](/public/assets/preview/home.png)

### Explorar Anúncios
![Explorar Anúncios](/public/assets/preview/explorar.png)

### Ver Anúncio
![Ver Anúncio](/public/assets/preview/ver-anuncio.png)

## 📌 Observações
  - Este projeto utiliza LocalStorage para simular um backend.
  - A autenticação é real, feita via Firebase Auth (Google).
  - O foco é demonstrar boas práticas com Angular moderno, não um produto final comercial.

