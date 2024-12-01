# Node.js och React.js Applikation
Det här projektet är en fullstack-applikation med en Node.js backend och en React.js frontend.

---

## Förutsättningar:
Innan du börjar- se till att du har följande installerat på din dator:

1. **Node.js** (v16 eller senare rekommenderas)  
   [Ladda ner Node.js här!](https://nodejs.org)
   
2. **npm** (Node Package Manager)  
   npm installeras automatiskt med Node.js.

3. En terminal (exempelvis terminalen i datorn eller i VS Code).

---

## Installation och körning:

### 1. Klona projektet

Om projektet finns på ett Git-repository, klona det med följande kommando:
```
git clone https://github.com/mathildahansson/case_8.git
cd case_8
```
Observera: Döper du mappen till något annat än "case_8" behöver du istället hänvisa till denna genom:
```
cd <projektmapp>
```

### 2. Installera alla beroenden
För att installera alla beroenden för både frontend och backend, kör detta kommando:
```
npm run setup
```
**Detta kommando:**
* Går in i frontend-mappen och installerar dess beroenden med npm install.
* Går in i backend-mappen och installerar dess beroenden med npm install.


### 3. Starta applikationen i utvecklingsläge
Applikationen har två delar som måste köras samtidigt: frontend och backend.

**Starta frontend**
1. Öppna en ny terminal.
2. Navigera till frontend-mappen
````
cd frontend
````

3. Kör kommandot:
```
npm run dev
```
Detta startar React.js-applikationen med Vite och den körs som standard på http://localhost:5173.

**Starta backend**
1. Öppna en annan terminal.
2. Navigera till backend-mappen:
```
cd backend
```
3. Kör kommandot:
```
npm run dev
```
4. Detta startar Node.js-backenden.


### 4. Öppna applikationen
När både frontend och backend körs kan du använda applikationen genom att öppna följande adresser i webbläsaren:
* **Frontend:**
```
http://localhost:5173 (eller vad terminalen hänvisar till när du kört "npm run dev")
```

* **Backend:**
```
http://localhost:3000
```
