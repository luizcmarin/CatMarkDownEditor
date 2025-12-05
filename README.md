# CatMarkDownEditor - Editor Markdown

[![npm version](https://img.shields.io/npm/v/catmarkdowneditor.svg?style=for-the-badge)](https://www.npmjs.com/package/catmarkdowneditor)
[![Build Status](https://img.shields.io/github/actions/workflow/status/luizcmarin/CatMarkDownEditor/cd.yaml?branch=master&style=for-the-badge)](https://github.com/luizcmarin/CatMarkDownEditor/actions?query=branch%3Amaster)


Um substituto de área de texto JavaScript para escrever Markdown bonito e compreensível. O CatMarkDownEditor permite que usuários menos experientes com Markdown usem botões e atalhos de barra de ferramentas familiares.

Além disso, a sintaxe é renderizada durante a edição para mostrar claramente o resultado esperado. Os cabeçalhos são maiores, as palavras enfatizadas ficam em itálico, os links são sublinhados, etc.

O CatMarkDownEditor também possui salvamento automático e verificação ortográfica integrados. O editor é totalmente personalizável, desde temas até botões da barra de ferramentas e ganchos de javascript.


## Acesso Rápido

- [CatMarkDownEditor - Editor Markdown](#catmarkdowneditor---editor-markdown)
  - [Acesso Rápido](#acesso-rápido)
  - [Instalar o CatMarkDownEditor](#instalar-o-catmarkdowneditor)
  - [Como usar](#como-usar)
    - [Carregando o editor](#carregando-o-editor)
    - [Funções do editor](#funções-do-editor)
  - [Como funciona](#como-funciona)
  - [Modificando o CatMarkDownEditor](#modificando-o-catmarkdowneditor)
  - [Contribuindo](#contribuindo)
  - [Licença](#licença)


## Instalar o CatMarkDownEditor

Via [npm](https://www.npmjs.com/package/catmarkdowneditor):

```
npm install catmarkdowneditor
```

Via CDN *UNPKG*:

```html
<link rel="stylesheet" href="https://unpkg.com/catmarkdowneditor/dist/catmarkdowneditor.min.css">
<script src="https://unpkg.com/catmarkdowneditor/dist/catmarkdowneditor.min.js"></script>
```

Ou *jsDelivr*:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/catmarkdowneditor/dist/catmarkdowneditor.min.css">
<script src="https://cdn.jsdelivr.net/npm/catmarkdowneditor/dist/catmarkdowneditor.min.js"></script>
```

## Como usar

### Carregando o editor

Depois de instalar e/ou importar o módulo, você pode carregar o CatMarkDownEditor no primeiro elemento `textarea` da página da web:

```html
<textarea></textarea>
<script>
const catMDE = new CatMarkDownEditor();
</script>
```

Alternativamente, você pode selecionar uma `textarea` específica, via JavaScript:

```html
<textarea id="my-text-area"></textarea>
<script>
const catMDE = new CatMarkDownEditor({element: document.getElementById('my-text-area')});
</script>
```

### Funções do editor

Use `catMDE.value()` para obter o conteúdo do editor:

```html
<script>
catMDE.value();
</script>
```

Use `catMDE.value(val)` para definir o conteúdo do editor:

```html
<script>
catMDE.value('Nova entrada para **CatMarkDownEditor**');
</script>
```

## Como funciona

O CatMarkDownEditor é construído sobre uma base de tecnologias modernas de desenvolvimento web. A espinha dorsal do editor é o [CodeMirror 6](https://codemirror.net/), um editor de código de última geração, modular e altamente extensível.

- **CodeMirror 6:** Fornece a base para a edição de texto, com recursos como destaque de sintaxe, histórico de alterações, e uma API robusta para manipulação de conteúdo.
- **Marked:** Uma biblioteca de alta performance para analisar Markdown e convertê-lo em HTML para a funcionalidade de visualização.
- **Font Awesome:** Utilizado para os ícones da barra de ferramentas, proporcionando uma interface familiar e intuitiva.

A sintaxe do Markdown é analisada e estilizada em tempo real no editor, proporcionando um feedback visual imediato do resultado final.

## Modificando o CatMarkDownEditor

Para modificar o CatMarkDownEditor, você precisará ter o Node.js e o npm instalados.

1. **Instale as dependências:**
   ```sh
   npm install
   ```

2. **Faça suas alterações:**
   Os principais arquivos do projeto estão localizados em `src/js/catmarkdowneditor.js` e `src/css/catmarkdowneditor.css`.

3. **Compile o projeto:**
   Execute o seguinte comando para compilar os arquivos de desenvolvimento e gerar os arquivos de distribuição na pasta `dist/`:
   ```sh
   npx gulp
   ```

## Contribuindo

Quer contribuir com o CatMarkDownEditor? Obrigado! Temos um [guia de contribuição](CONTRIBUTING.md) só para você!


## Licença

Este projeto é lançado sob a [Licença GPL-3.0-or-later](LICENSE).

- Copyright (c) 2025 Marin. All rights reserved.
