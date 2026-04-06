# Peau Santé - Landing Page

Este é o repositório da Landing Page do **Peau Santé**, um centro de estética avançada. O projeto é um site estático focado em altíssima performance, com estilos sendo gerenciados e compilados através do [Tailwind CSS](https://tailwindcss.com/).

## 🚀 Como executar o projeto localmente

Como o projeto é em HTML nativo com Tailwind CSS, o setup é bastante simples:

1. **Instale as dependências** do Node.js (necessário apenas para compilar o CSS via Tailwind):
   ```bash
   npm install
   ```
2. **Execute em modo de desenvolvimento**:
   O comando abaixo irá monitorar alterações nos arquivos `.html` e compilar o CSS automaticamente para `pub/assets/css/style.min.css`.
   ```bash
   npm run dev
   ```
3. **Visualize o projeto**:
   Basta abrir o arquivo `pub/index.html` em seu navegador ou utilizar um live server (como o Live Server do VS Code) apontando para o diretório `pub/`.

4. **Build de Produção**:
   Para gerar o CSS minificado final:
   ```bash
   npm run build
   ```

---

## ☁️ Deploy no Google Cloud Platform (GCP)

Sendo um site estático (HTML, CSS e Imagens locais contidos no diretório `pub/`), há várias formas otimizadas de publicar este projeto de forma barata e escalável no GCP.

### Opção 1: Firebase Hosting (Recomendado e mais fácil)
O Firebase Hosting é a solução mais prática e performática oferecida nativamente dentro do ecossistema do GCP para sites estáticos.

1. Instale as ferramentas CLI do Firebase: `npm install -g firebase-tools`
2. Faça login: `firebase login`
3. Inicialize o projeto na raiz do repositório: `firebase init hosting`
   - **Importante:** Quando for perguntado "What do you want to use as your public directory?", digite `pub`.
   - Configure como single-page app? Não (`N`).
4. Rode a build de produção do Tailwind: `npm run build`
5. Realize o deploy: `firebase deploy`

### Opção 2: Cloud Storage + Cloud CDN
Ideal se você precisa hospedar isso dentro de um projeto contido puramente no console do GCP (sem CLI do Firebase).

1. Acesse o **Google Cloud Console > Cloud Storage**.
2. Crie um novo bucket (ex: `www.peausante.com.br`).
3. Nas propriedades do bucket, edite as "Permissões" adicionando o principal `allUsers` com o papel de `Storage Object Viewer`.
4. Ainda no Bucket, vá na aba de configurações do "Website" e defina o arquivo de índice principal como `index.html` e a sua página de erro.
5. Faça o upload manual ou via CLI (`gsutil rsync -R pub/ gs://seu-bucket/`) de todo o **conteúdo da pasta `pub/`** (não da pasta em si, mas do que está dentro dela).
6. Configure um recurso de Load Balancer (com Cloud CDN ativado) apontando para este backend de bucket com o seu domínio customizado.

### Opção 3: Cloud Run via Container Docker (Nginx)
Caso a arquitetura exija implantação via containers (Docker):
1. Crie um arquivo `Dockerfile` na raiz do projeto com o conteúdo:
   ```dockerfile
   FROM nginx:alpine
   COPY pub /usr/share/nginx/html
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```
2. Após gerar seu `npm run build`, construa e publique utilizando a Google Cloud CLI:
   `gcloud run deploy peausante-lp --source . --port 80 --allow-unauthenticated`

---

## ☁️ Deploy no Microsoft Azure

Da mesma forma, o Azure dispõe de soluções modernas para hospedar os conteúdos estáticos da pasta `pub/`.

### Opção 1: Azure Static Web Apps (Recomendado)
A plataforma global especializada em publicar front-ends acoplada com CI/CD.

1. Suba o projeto para um repositório no GitHub ou Azure DevOps.
2. Acesse o **Azure Portal** e pesquise por **Static Web Apps**.
3. Clique em **Criar** e conecte a sua conta do GitHub/DevOps.
4. Em "Build Details", escolha **Custom** e configure:
   - **App location:** `/` (raiz do repositório).
   - **Api location:** Deixe vazio.
   - **Output location:** `pub` (a pasta dos arquivos de produção gerados).
5. O Azure criará automaticamente um Workflow (via Actions/Pipelines) no seu repositório realizando o Build e cuidando do certificado SSL do domínio.

### Opção 2: Azure Blob Storage (Static Web Hosting)
Opção equivalente ao Cloud Storage do GCP.

1. No Portal Azure, crie um recurso do tipo **Storage Account** (Conta de Armazenamento).
2. No menu lateral *Data management*, vá em **Static website** (Site estático) e mude para "Enabled" (Habilitado).
3. Especifique `index.html` no campo "Index document name" e salve.
4. O painel fornecerá o link da "Primary endpoint" e criará um contêiner virtual chamado `$web`.
5. Usando o [Azure Storage Explorer](https://azure.microsoft.com/pt-br/features/storage-explorer/) ou portal web, faça upload de todos os arquivos de dentro da sua pasta `pub/` para o interior do contêiner `$web`.
6. Para aplicar domínio corporativo HTTPS `peausante.com.br`, adicione um **Azure Front Door / CDN profile** linkando ao container `$web`.

---
**Nota Importante:** Lembre-se sempre de executar a compilação final (`npm run build`) para atualizar a minificação do Tailwind antes de enviar qualquer atualizaçao dos arquivos estáticos.
