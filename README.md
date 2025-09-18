# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

### Extensões do VSCode p projeto:
- Live Share: https://prod.liveshare.vsengsaas.visualstudio.com/join?845B6BA47A568B6077D6160AA79F35A9548F (link convite live share)
- ES7 React/Redux/GraphQL/React-Native snippets;
- Prettier;
- Tailwind CSS Intellisense;

#### Modelo e Design do site no Figma: https://www.figma.com/make/7dUkP1EXmsNFcUiUyluHUv/Camera-Event-List-Website?node-id=0-1&p=f&t=OkLz57h0AY02nwVi-0

OBS: Modelo inflenciado pelo software "Moni Softwares". Design elaborado pelo figma AI.

---

### Inicialização do projeto:
Instale as dependencias: 'npm install';

Ligar ambiente de desenvolvimento: 'npm run dev';

### Build e Deploy
construção do projeto (build): 'npm run build';
implatação do proejeto (deploy): 'firebase deploy'; 

Site implantado: https://fulltime-historico.web.app

---

#### Progresso:
- Instalando Vite com react: https://tailwindcss.com/docs/installation/using-vite
- Instalando Tailwind css
- Instalando Firebase: "npm install firebase"
    - firebase.js
    - Instalando ferramentas: "npm install -g firebase-tools"
    - "firebase login"
    - "firebase init hosting"
    - buildando o projeto com vite: "npm run build"
    - emitindo o projeto: "firebase deploy"
- Instalando os icons de react: 'npm install react-icons --save'
- Instalando rombo motion (https://rombo.co/tailwind/)
- Instalando react router: "npm install react-router-dom@6.22.1"
- Setando Firebase Authentication
    - Firebase website: authentication > on
    - Firebase website: settings > authorized domains
- useContext: user-context.jsx