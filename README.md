### Projeto de Implementação de Recursos de Comunicação entre os Softwares FullCenter e F/Safe
#### Empresa: FullTime

#### Unimar BCC - TM4, A 2025

#### Integrantes:
- Allan Shinhama (Líder): Encarregado pela ideia, desenvimento front + montageme encaixe dos outros componentes.
- Emanuelly: Encarregada pela ingessão da webcam na plataforma.
- Gabriel Claus: Elaboração dos Protocolos de Segurança e Exportação em Pdf;
- Carlos Eduardo: Auxiliar com os testes e ideias;
- Maria Eduarda: Encarregada do código boilerplate de CRUD do Backend no Firebase;
- Enzo Brumatee: Encarregado do código boilerplate de CRUD do Backend no Firebase;

Apresentação realizada dia 26/11/25 - antes da versão final.

### Extensões do VSCode p projeto:
- ES7 React/Redux/GraphQL/React-Native snippets;
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
- Instalando react fireabse hooks (useAuthState em user-context): npm install react-firebase-hooks firebase
- Login do usuário pelo App.jsx
- Correção de erro de sintaxe antiga do firestore: 
    O objeto db do Firebase v9 não tem o método .collection(). Em vez disso, você deve usar as funções collection() e addDoc().
- firebase emulators:start
- Trocando o modo do Firestore para Teste;
- (Não foi necessário usar o emulator);
- Instalando o Google Maps para react 'npm install @vis.gl/react-google-maps' via git bash
    - React Google Maps, é uma biblioteca que contém hooks e components do gmaps p react que facilita


---
### Notes:
- Organizar depois: https://www.youtube.com/watch?v=W30jg08UQow

---
### Bibliotecas

- Rombo Motion (Abandonado - Não funciona)
- Firebase
    - Hooks;
    - Authentication;
    - Firestore;
- React Icons
- React Router
- npm install jspdf html2canvas (pdf)
