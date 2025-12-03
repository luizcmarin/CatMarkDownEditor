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
  - [Configuração](#configuração)
    - [Lista de opções](#lista-de-opções)
    - [Exemplo de opções](#exemplo-de-opções)
    - [Ícones da barra de ferramentas](#ícones-da-barra-de-ferramentas)
    - [Personalização da barra de ferramentas](#personalização-da-barra-de-ferramentas)
    - [Atalhos de teclado](#atalhos-de-teclado)
  - [Uso avançado](#uso-avançado)
    - [Manipulação de eventos](#manipulação-de-eventos)
    - [Removendo o CatMarkDownEditor da área de texto](#removendo-o-catmarkdowneditor-da-área-de-texto)
    - [Métodos úteis](#métodos-úteis)
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


## Configuração

### Lista de opções

- **autoDownloadFontAwesome**: Se definido como `true`, força o download do Font Awesome (usado para ícones). Se definido como `false`, impede o download. O padrão é `undefined`, que verificará de forma inteligente se o Font Awesome já foi incluído e fará o download accordingly.
- **autofocus**: Se definido como `true`, foca o editor automaticamente. O padrão é `false`.
- **autosave**: *Salva o texto que está sendo escrito e o carregará de volta no futuro. Ele esquecerá o texto quando o formulário em que está contido for enviado.*
  - **enabled**: Se definido como `true`, salva o texto automaticamente. O padrão é `false`.
  - **delay**: Atraso entre os salvamentos, em milissegundos. O padrão é `10000` (10 segundos).
  - **submit_delay**: Atraso antes de assumir que o envio do formulário falhou e salvar o texto, em milissegundos. O padrão é `autosave.delay` ou `10000` (10 segundos).
  - **uniqueId**: Você deve definir um identificador de string exclusivo para que o CatMarkDownEditor possa salvar automaticamente. Algo que o separe de outras instâncias do CatMarkDownEditor em seu site.
  - **timeFormat**: Define o DateTimeFormat. Mais informações em [Instâncias de DateTimeFormat](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat). Padrão `locale: en-US, format: hour:minute`.
  - **text**: Define o texto para o salvamento automático.
- **autoRefresh**: Útil ao inicializar o editor em um nó DOM oculto. Se definido como `{ delay: 300 }`, ele verificará a cada 300 ms se o editor está visível e, se positivo, chamará o [`refresh()`](https://codemirror.net/doc/manual.html#refresh) do CodeMirror.
- **blockStyles**: Personaliza como certos botões que estilizam blocos de texto se comportam.
  - **bold**: Pode ser definido como `**` ou `__`. O padrão é `**`.
  - **code**: Pode ser definido como ` ``` ` ou `~~~`. O padrão é ` ``` `.
  - **italic**: Pode ser definido como `*` ou `_`. O padrão é `*`.
- **unorderedListStyle**: pode ser `*`, `-` ou `+`. O padrão é `*`.
- **scrollbarStyle**: Escolhe uma implementação de barra de rolagem. O padrão é "native", mostrando barras de rolagem nativas. A biblioteca principal também fornece o estilo "null", que oculta completamente as barras de rolagem. Addons podem implementar modelos de barra de rolagem adicionais.
- **element**: O elemento DOM para o `textarea` a ser usado. O padrão é o primeiro elemento `textarea` na página.
- **forceSync**: Se definido como `true`, força que as alterações de texto feitas no CatMarkDownEditor sejam imediatamente armazenadas na área de texto original. O padrão é `false`.
- **hideIcons**: Uma matriz de nomes de ícones a serem ocultados. Pode ser usado para ocultar ícones específicos mostrados por padrão sem personalizar completamente a barra de ferramentas.
- **indentWithTabs**: Se definido como `false`, recua usando espaços em vez de tabulações. O padrão é `true`.
- **initialValue**: Se definido, personalizará o valor inicial do editor.
- **previewImagesInEditor**: - O CatMarkDownEditor mostrará a visualização de imagens, `false` por padrão, a visualização de imagens aparecerá apenas para imagens em linhas separadas.
- **imagesPreviewHandler**: - Uma função personalizada para lidar com a visualização de imagens. Recebe a string analisada entre os parênteses do markdown da imagem `![]( )` como argumento e retorna uma string que serve como o atributo `src` da tag `<img>` na visualização. Permite a visualização dinâmica de imagens no frontend sem a necessidade de enviá-las para um servidor, permite copiar e colar imagens no editor com visualização.
- **insertTexts**: Personaliza como certos botões que inserem texto se comportam. Leva uma matriz com dois elementos. O primeiro elemento será o texto inserido antes do cursor ou destaque, e o segundo elemento será inserido depois. Por exemplo, este é o valor do link padrão: `["[", "](http://)"]`.
  - horizontalRule
  - image
  - link
  - table
- **lineNumbers**: Se definido como `true`, habilita os números de linha no editor.
- **lineWrapping**: Se definido como `false`, desabilita a quebra de linha. O padrão é `true`.
- **minHeight**: Define a altura mínima para a área de composição, antes que ela comece a crescer automaticamente. Deve ser uma string contendo um valor CSS válido como `"500px"`. O padrão é `"300px"`.
- **maxHeight**: Define a altura fixa para a área de composição. A opção `minHeight` será ignorada. Deve ser uma string contendo um valor CSS válido como `"500px"`. O padrão é `undefined`.
- **onToggleFullScreen**: Uma função que é chamada quando o modo de tela cheia do editor é alternado. A função receberá um booleano como parâmetro, `true` quando o editor estiver entrando no modo de tela cheia, ou `false`.
- **parsingConfig**: Ajusta as configurações para analisar o Markdown durante a edição (não a visualização).
  - **allowAtxHeaderWithoutSpace**: Se definido como `true`, renderizará cabeçalhos sem um espaço após o `#`. O padrão é `false`.
  - **strikethrough**: Se definido como `false`, não processará a sintaxe de riscado do GFM. O padrão é `true`.
  - **underscoresBreakWords**: Se definido como `true`, permite que os sublinhados sejam um delimitador para separar palavras. O padrão é `false`.
- **overlayMode**: Passa um [modo de sobreposição](https://codemirror.net/doc/manual.html#modeapi) personalizado do codemirror para analisar e estilizar o Markdown durante a edição.
  - **mode**: Um objeto de modo do codemirror.
  - **combine**: Se definido como `false`, *substituirá* as classes CSS retornadas pelo modo Markdown padrão. Caso contrário, as classes retornadas pelo modo personalizado serão combinadas com as classes retornadas pelo modo padrão. O padrão é `true`.
- **placeholder**: Se definido, exibe uma mensagem de placeholder personalizada.
- **previewClass**: Uma string ou matriz de strings que será aplicada à tela de visualização quando ativada. O padrão é `"editor-preview"`.
- **previewRender**: Função personalizada para analisar o Markdown de texto simples e retornar HTML. Usado quando o usuário visualiza.
- **promptURLs**: Se definido como `true`, uma janela de alerta JS aparece pedindo o URL do link ou da imagem. O padrão é `false`.
- **promptTexts**: Personaliza o texto usado para solicitar URLs.
  - **image**: O texto a ser usado ao solicitar o URL de uma imagem. O padrão é `URL of the image:`.
  - **link**: O texto a ser usado ao solicitar o URL de um link. O padrão é `URL for the link:`.
- **iconClassMap**: Usado para especificar os nomes das classes de ícones para os vários botões da barra de ferramentas.
- **uploadImage**: Se definido como `true`, habilita a funcionalidade de upload de imagem, que pode ser acionada por arrastar e soltar, copiar e colar e através da janela de navegação de arquivos (aberta quando o usuário clica no ícone *upload-image*). O padrão é `false`.
- **imageMaxSize**: Tamanho máximo da imagem em bytes, verificado antes do upload (nota: nunca confie no cliente, sempre verifique o tamanho da imagem no lado do servidor). O padrão é `1024 * 1024 * 2` (2 MB).
- **imageAccept**: Uma lista separada por vírgulas de tipos mime usados para verificar o tipo de imagem antes do upload (nota: nunca confie no cliente, sempre verifique os tipos de arquivo no lado do servidor). O padrão é `image/png, image/jpeg`.
- **imageUploadFunction**: Uma função personalizada para lidar com o upload da imagem. O uso desta função tornará as opções `imageMaxSize`, `imageAccept`, `imageUploadEndpoint` e `imageCSRFToken` ineficazes.
    - A função recebe um arquivo e as funções de retorno de chamada `onSuccess` e `onError` como parâmetros. `onSuccess(imageUrl: string)` e `onError(errorMessage: string)`
- **imageUploadEndpoint**: O endpoint para onde os dados das imagens serão enviados, por meio de uma solicitação *POST* assíncrona. O servidor deve salvar esta imagem e retornar uma resposta JSON.
     - se a solicitação foi processada com sucesso (HTTP 200 OK): `{"data": {"filePath": "<filePath>"}}` onde *filePath* é o caminho da imagem (absoluto se `imagePathAbsolute` for definido como true, relativo caso contrário);
     - caso contrário: `{"error": "<errorCode>"}`, onde *errorCode* pode ser `noFileGiven` (HTTP 400 Bad Request), `typeNotAllowed` (HTTP 415 Unsupported Media Type), `fileTooLarge` (HTTP 413 Payload Too Large) ou `importError` (veja *errorMessages* abaixo). Se *errorCode* não for uma das *errorMessages*, ele será alertado inalterado para o usuário. Isso permite mensagens de erro do lado do servidor.
     Nenhum valor padrão.
- **imagePathAbsolute**: Se definido como `true`, tratará `imageUrl` de `imageUploadFunction` e *filePath* retornado de `imageUploadEndpoint` como um caminho absoluto em vez de relativo, ou seja, não precederá `window.location.origin` a ele.
- **imageCSRFToken**: Token CSRF a ser incluído na chamada AJAX para upload de imagem. Para várias instâncias como Django, Spring e Laravel.
- **imageCSRFName**: Nome do campo do token CSRF a ser incluído na chamada AJAX para upload de imagem, aplicado quando `imageCSRFToken` tem valor, o padrão é `csrfmiddlewaretoken`.
- **imageCSRFHeader**: Se definido como `true`, passa o token CSRF via cabeçalho. O padrão é `false`, que passa o CSRF pelo corpo da solicitação.
- **imageTexts**: Textos exibidos ao usuário (principalmente na barra de status) para o recurso de importação de imagem, onde `#image_name#`, `#image_size#` e `#image_max_size#` serão substituídos por seus respectivos valores, que podem ser usados para personalização ou internacionalização:
    - **sbInit**: Mensagem de status exibida inicialmente se `uploadImage` for definido como `true`. O padrão é `Anexe arquivos arrastando e soltando ou colando da área de transferência.`.
    - **sbOnDragEnter**: Mensagem de status exibida quando o usuário arrasta um arquivo para a área de texto. O padrão é `Solte a imagem para enviá-la.`.
    - **sbOnDrop**: Mensagem de status exibida quando o usuário solta um arquivo na área de texto. O padrão é `Enviando imagens #images_names#`.
    - **sbProgress**: Mensagem de status exibida para mostrar o progresso do upload. O padrão é `Enviando #file_name#: #progress#%`.
    - **sbOnUploaded**: Mensagem de status exibida quando a imagem foi enviada. O padrão é `Enviado #image_name#`.
    - **sizeUnits**: Uma lista separada por vírgulas de unidades usadas para exibir mensagens com tamanhos de arquivo legíveis por humanos. O padrão é ` B, KB, MB` (exemplo: `218 KB`). Você pode usar `B,KB,MB` em vez disso, se preferir sem espaços em branco (`218KB`).
- **errorMessages**: Erros exibidos ao usuário, usando a opção `errorCallback`, onde `#image_name#`, `#image_size#` e `#image_max_size#` serão substituídos por seus respectivos valores, que podem ser usados para personalização ou internacionalização:
    - **noFileGiven**: O servidor não recebeu nenhum arquivo do usuário. O padrão é `Você deve selecionar um arquivo.`.
    - **typeNotAllowed**: O usuário enviou um tipo de arquivo que não corresponde à lista `imageAccept`, ou o servidor retornou este código de erro. O padrão é `Este tipo de imagem não é permitido.`.
    - **fileTooLarge**: O tamanho da imagem que está sendo importada é maior que o `imageMaxSize`, ou se o servidor retornou este código de erro. O padrão é `A imagem #image_name# é muito grande (#image_size#).\nO tamanho máximo do arquivo é #image_max_size#.`.
    - **importError**: Ocorreu um erro inesperado ao enviar a imagem. O padrão é `Algo deu errado ao enviar a imagem #image_name#.`.
- **errorCallback**: Uma função de retorno de chamada usada para definir como exibir uma mensagem de erro. O padrão é `(errorMessage) => alert(errorMessage)`.
- **renderingConfig**: Ajusta as configurações para analisar o Markdown durante a visualização (não a edição).
  - **codeSyntaxHighlighting**: Se definido como `true`, destacará usando [highlight.js](https://github.com/isagalaev/highlight.js). O padrão é `false`. Para usar este recurso, você deve incluir o highlight.js em sua página ou passá-lo usando a opção `hljs`. Por exemplo, inclua o script e os arquivos CSS como:<br>`<script src="https://cdn.jsdelivr.net/highlight.js/latest/highlight.min.js"></script>`<br>`<link rel="stylesheet" href="https://cdn.jsdelivr.net/highlight.js/latest/styles/github.min.css">`
  - **hljs**: Uma instância injetável de [highlight.js](https://github.com/isagalaev/highlight.js). Se você não quiser depender do namespace global (`window.hljs`), pode fornecer uma instância aqui. O padrão é `undefined`.
  - **markedOptions**: Define as [opções](https://marked.js.org/#/USING_ADVANCED.md#options) do renderizador de Markdown interno. Outras opções de `renderingConfig` terão precedência.
  - **singleLineBreaks**: Se definido como `false`, desabilita a análise de quebras de linha única do [GitHub Flavored Markdown](https://github.github.com/gfm/) (GFM). O padrão é `true`.
  - **sanitizerFunction**: Função personalizada para higienizar a saída HTML do renderizador de Markdown.
- **shortcuts**: Atalhos de teclado associados a esta instância. O padrão é a [matriz de atalhos](#atalhos-de-teclado).
- **showIcons**: Uma matriz de nomes de ícones a serem mostrados. Pode ser usado para mostrar ícones específicos ocultos por padrão sem personalizar completamente a barra de ferramentas.
- **spellChecker**: Se definido como `false`, desabilita o verificador ortográfico. O padrão é `true`. Opcionalmente, passe uma função compatível com CodeMirrorSpellChecker.
- **inputStyle**: `textarea` ou `contenteditable`. O padrão é `textarea` para desktop e `contenteditable` para celular. A opção `contenteditable` é necessária para habilitar o `nativeSpellcheck`.
- **nativeSpellcheck**: Se definido como `false`, desabilita o verificador ortográfico nativo. O padrão é `true`.
- **sideBySideFullscreen**: Se definido como `false`, permite a edição lado a lado sem entrar em tela cheia. O padrão é `true`.
- **status**: Se definido como `false`, oculta a barra de status. O padrão é a matriz de itens da barra de status integrados.
  - Opcionalmente, você pode definir uma matriz de itens da barra de status a serem incluídos e em que ordem. Você pode até definir seus próprios itens de barra de status personalizados.
- **styleSelectedText**: Se definido como `false`, remove a classe `CodeMirror-selectedtext` das linhas selecionadas. O padrão é `true`.
- **syncSideBySidePreviewScroll**: Se definido como `false`, desabilita a sincronização da rolagem no modo lado a lado. O padrão é `true`.
- **tabSize**: Se definido, personaliza o tamanho da tabulação. O padrão é `2`.
- **theme**: Substitui o tema. O padrão é `catMDE`.
- **toolbar**: Se definido como `false`, oculta a barra de ferramentas. O padrão é a [matriz de ícones](#ícones-da-barra-de-ferramentas).
- **toolbarTips**: Se definido como `false`, desabilita as dicas dos botões da barra de ferramentas. O padrão é `true`.
- **toolbarButtonClassPrefix**: Adiciona um prefixo às classes dos botões da barra de ferramentas quando definido. Por exemplo, um valor de `"mde"` resulta em `"mde-bold"` para o botão Negrito.
- **direction**: `rtl` ou `ltr`. Altera a direção do texto para suportar idiomas da direita para a esquerda. O padrão é `ltr`.


### Exemplo de opções

A maioria das opções demonstra o comportamento não padrão:

```js
const editor = new CatMarkDownEditor({
    autofocus: true,
    autosave: {
        enabled: true,
        uniqueId: "MyUniqueID",
        delay: 1000,
        submit_delay: 5000,
        timeFormat: {
            locale: 'en-US',
            format: {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            },
        },
        text: "Autosaved: "
    },
    blockStyles: {
        bold: "__",
        italic: "_",
    },
    unorderedListStyle: "-",
    element: document.getElementById("MyID"),
    forceSync: true,
    hideIcons: ["guide", "heading"],
    indentWithTabs: false,
    initialValue: "Olá, mundo!",
    insertTexts: {
        horizontalRule: ["", "\n\n-----\n\n"],
        image: ["![](http://", ")"],
        link: ["[", "](https://)"],
        table: ["", "\n\n| Coluna 1 | Coluna 2 | Coluna 3 |\n| -------- | -------- | -------- |\n| Texto    | Texto    | Texto    |\n\n"],
    },
    lineWrapping: false,
    minHeight: "500px",
    parsingConfig: {
        allowAtxHeaderWithoutSpace: true,
        strikethrough: false,
        underscoresBreakWords: true,
    },
    placeholder: "Digite aqui...",

    previewClass: "my-custom-styling",
    previewClass: ["my-custom-styling", "more-custom-styling"],

    previewRender: (plainText) => customMarkdownParser(plainText), // Retorna HTML de um analisador personalizado
    previewRender: (plainText, preview) => { // Método assíncrono
        setTimeout(() => {
            preview.innerHTML = customMarkdownParser(plainText);
        }, 250);

        // Se você retornar nulo, o innerHTML da visualização não
        // será sobrescrito. Útil se você controlar o conteúdo do nó de visualização via
        // vdom diffing.
        // return null;

        return "Carregando...";
    },
    promptURLs: true,
    promptTexts: {
        image: "Prompt personalizado para URL:",
        link: "Prompt personalizado para URL:",
    },
    renderingConfig: {
        singleLineBreaks: false,
        codeSyntaxHighlighting: true,
        sanitizerFunction: (renderedHTML) => {
            // Usando DOMPurify e permitindo apenas tags <b>
            return DOMPurify.sanitize(renderedHTML, {ALLOWED_TAGS: ['b']})
        },
    },
    shortcuts: {
        drawTable: "Cmd-Alt-T"
    },
    showIcons: ["code", "table"],
    spellChecker: false,
    status: false,
    status: ["autosave", "lines", "words", "cursor"], // Uso opcional
    status: ["autosave", "lines", "words", "cursor", {
        className: "keystrokes",
        defaultValue: (el) => {
            el.setAttribute('data-keystrokes', 0);
        },
        onUpdate: (el) => {
            const keystrokes = Number(el.getAttribute('data-keystrokes')) + 1;
            el.innerHTML = `${keystrokes} Keystrokes`;
            el.setAttribute('data-keystrokes', keystrokes);
        },
    }], // Outro uso opcional, com um item de barra de status personalizado que conta as teclas pressionadas
    styleSelectedText: false,
    sideBySideFullscreen: false,
    syncSideBySidePreviewScroll: false,
    tabSize: 4,
    toolbar: false,
    toolbarTips: false,
    toolbarButtonClassPrefix: "mde",
});
```


### Ícones da barra de ferramentas

Abaixo estão os ícones da barra de ferramentas integrados (apenas alguns dos quais estão habilitados por padrão), que podem ser reorganizados como você desejar. "Name" é o nome do ícone, referenciado no JavaScript. "Action" é uma função ou um URL a ser aberto. "Class" é a classe atribuída ao ícone. "Tooltip" é a pequena dica de ferramenta que aparece através do atributo `title=""`. Observe que as dicas de atalho são adicionadas automaticamente e refletem a ação especificada se ela tiver uma tecla associada a ela (ou seja, com o valor de `action` definido como `bold` e o de `tooltip` definido como `Bold`, o texto final que o usuário verá seria "Bold (Ctrl-B)").

Além disso, você pode adicionar um separador entre quaisquer ícones adicionando `"|"` à matriz da barra de ferramentas.

| Nome            | Ação                                                     | Dica<br>Classe                                               |
|:----------------|:---------------------------------------------------------|:-------------------------------------------------------------|
| bold            | toggleBold                                               | Negrito<br>fa fa-bold                                        |
| italic          | toggleItalic                                             | Itálico<br>fa fa-italic                                      |
| strikethrough   | toggleStrikethrough                                      | Riscado<br>fa fa-strikethrough                               |
| heading         | toggleHeadingSmaller                                     | Cabeçalho<br>fa fa-header                                    |
| heading-smaller | toggleHeadingSmaller                                     | Cabeçalho Menor<br>fa fa-header                              |
| heading-bigger  | toggleHeadingBigger                                      | Cabeçalho Maior<br>fa fa-lg fa-header                        |
| heading-1       | toggleHeading1                                           | Cabeçalho Grande<br>fa fa-header header-1                    |
| heading-2       | toggleHeading2                                           | Cabeçalho Médio<br>fa fa-header header-2                     |
| heading-3       | toggleHeading3                                           | Cabeçalho Pequeno<br>fa fa-header header-3                   |
| code            | toggleCodeBlock                                          | Código<br>fa fa-code                                         |
| quote           | toggleBlockquote                                         | Citação<br>fa fa-quote-left                                  |
| unordered-list  | toggleUnorderedList                                      | Lista Genérica<br>fa fa-list-ul                              |
| ordered-list    | toggleOrderedList                                        | Lista Numerada<br>fa fa-list-ol                              |
| clean-block     | cleanBlock                                               | Limpar Bloco<br>fa fa-eraser                                 |
| link            | drawLink                                                 | Criar Link<br>fa fa-link                                     |
| image           | drawImage                                                | Inserir Imagem<br>fa fa-picture-o                            |
| upload-image    | drawUploadedImage                                        | Abrir janela de seleção de arquivo<br>fa fa-image            |
| table           | drawTable                                                | Inserir Tabela<br>fa fa-table                                |
| horizontal-rule | drawHorizontalRule                                       | Inserir Linha Horizontal<br>fa fa-minus                      |
| preview         | togglePreview                                            | Alternar Visualização<br>fa fa-eye no-disable                |
| side-by-side    | toggleSideBySide                                         | Alternar Lado a Lado<br>fa fa-columns no-disable no-mobile   |
| fullscreen      | toggleFullScreen                                         | Alternar Tela Cheia<br>fa fa-arrows-alt no-disable no-mobile |
| guide           | [Este link](https://www.markdownguide.org/basic-syntax/) | Guia Markdown<br>fa fa-question-circle                       |
| undo            | undo                                                     | Desfazer<br>fa fa-undo                                       |
| redo            | redo                                                     | Refazer<br>fa fa-redo                                        |

### Personalização da barra de ferramentas

Personalize a barra de ferramentas usando a opção `toolbar`.

Apenas a ordem dos botões existentes:

```js
const catMDE = new CatMarkDownEditor({
    toolbar: ["bold", "italic", "heading", "|", "quote"]
});
```

Todas as informações e/ou adicione seus próprios ícones ou texto

```js
const catMDE = new CatMarkDownEditor({
    toolbar: [
        {
            name: "bold",
            action: CatMarkDownEditor.toggleBold,
            className: "fa fa-bold",
            title: "Negrito",
        },
        "italic", // atalho para botão pré-fabricado
        {
            name: "custom",
            action: (editor) => {
                // Adicione seu próprio código
            },
            className: "fa fa-star",
            text: "Com estrela",
            title: "Botão Personalizado",
            attributes: { // para atributos personalizados
                id: "custom-id",
                "data-value": "custom value" // atributos de dados HTML5 precisam ser colocados entre aspas ("") por causa do hífen (-) em seu nome.
            }
        },
        "|" // Separador
        // [, ...]
    ]
});
```

Coloque alguns botões no menu suspenso

```js
const catMDE = new CatMarkDownEditor({
    toolbar: [{
                name: "heading",
                action: CatMarkDownEditor.toggleHeadingSmaller,
                className: "fa fa-header",
                title: "Cabeçalhos",
            },
            "|",
            {
                name: "others",
                className: "fa fa-blind",
                title: "outros botões",
                children: [
                    {
                        name: "image",
                        action: CatMarkDownEditor.drawImage,
                        className: "fa fa-picture-o",
                        title: "Imagem",
                    },
                    {
                        name: "quote",
                        action: CatMarkDownEditor.toggleBlockquote,
                        className: "fa fa-percent",
                        title: "Citação",
                    },
                    {
                        name: "link",
                        action: CatMarkDownEditor.drawLink,
                        className: "fa fa-link",
                        title: "Link",
                    }
                ]
            },
        // [, ...]
    ]
});
```

### Atalhos de teclado

O CatMarkDownEditor vem com uma matriz de atalhos de teclado predefinidos, mas eles podem ser alterados com uma opção de configuração. A lista dos padrões é a seguinte:

| Atalho (Windows / Linux)                      | Atalho (macOS)                               | Ação                   |
|:----------------------------------------------|:---------------------------------------------|:-----------------------|
| <kbd>Ctrl</kbd>-<kbd>'</kbd>                  | <kbd>Cmd</kbd>-<kbd>'</kbd>                  | "toggleBlockquote"     |
| <kbd>Ctrl</kbd>-<kbd>B</kbd>                  | <kbd>Cmd</kbd>-<kbd>B</kbd>                  | "toggleBold"           |
| <kbd>Ctrl</kbd>-<kbd>E</kbd>                  | <kbd>Cmd</kbd>-<kbd>E</kbd>                  | "cleanBlock"           |
| <kbd>Ctrl</kbd>-<kbd>H</kbd>                  | <kbd>Cmd</kbd>-<kbd>H</kbd>                  | "toggleHeadingSmaller" |
| <kbd>Ctrl</kbd>-<kbd>I</kbd>                  | <kbd>Cmd</kbd>-<kbd>I</kbd>                  | "toggleItalic"         |
| <kbd>Ctrl</kbd>-<kbd>K</kbd>                  | <kbd>Cmd</kbd>-<kbd>K</kbd>                  | "drawLink"             |
| <kbd>Ctrl</kbd>-<kbd>L</kbd>                  | <kbd>Cmd</kbd>-<kbd>L</kbd>                  | "toggleUnorderedList"  |
| <kbd>Ctrl</kbd>-<kbd>P</kbd>                  | <kbd>Cmd</kbd>-<kbd>P</kbd>                  | "togglePreview"        |
| <kbd>Ctrl</kbd>-<kbd>Alt</kbd>-<kbd>C</kbd>   | <kbd>Cmd</kbd>-<kbd>Alt</kbd>-<kbd>C</kbd>   | "toggleCodeBlock"      |
| <kbd>Ctrl</kbd>-<kbd>Alt</kbd>-<kbd>I</kbd>   | <kbd>Cmd</kbd>-<kbd>Alt</kbd>-<kbd>I</kbd>   | "drawImage"            |
| <kbd>Ctrl</kbd>-<kbd>Alt</kbd>-<kbd>L</kbd>   | <kbd>Cmd</kbd>-<kbd>Alt</kbd>-<kbd>L</kbd>   | "toggleOrderedList"    |
| <kbd>Shift</kbd>-<kbd>Ctrl</kbd>-<kbd>H</kbd> | <kbd>Shift</kbd>-<kbd>Cmd</kbd>-<kbd>H</kbd> | "toggleHeadingBigger"  |
| <kbd>F9</kbd>                                 | <kbd>F9</kbd>                                | "toggleSideBySide"     |
| <kbd>F11</kbd>                                | <kbd>F11</kbd>                               | "toggleFullScreen"     |
| <kbd>Ctrl</kbd>-<kbd>Alt</kbd>-<kbd>1</kbd>   | <kbd>Cmd</kbd>-<kbd>Alt</kbd>-<kbd>1</kbd>   | "toggleHeading1"       |
| <kbd>Ctrl</kbd>-<kbd>Alt</kbd>-<kbd>2</kbd>   | <kbd>Cmd</kbd>-<kbd>Alt</kbd>-<kbd>2</kbd>   | "toggleHeading2"       |
| <kbd>Ctrl</kbd>-<kbd>Alt</kbd>-<kbd>3</kbd>   | <kbd>Cmd</kbd>-<kbd>Alt</kbd>-<kbd>3</kbd>   | "toggleHeading3"       |
| <kbd>Ctrl</kbd>-<kbd>Alt</kbd>-<kbd>4</kbd>   | <kbd>Cmd</kbd>-<kbd>Alt</kbd>-<kbd>4</kbd>   | "toggleHeading4"       |
| <kbd>Ctrl</kbd>-<kbd>Alt</kbd>-<kbd>5</kbd>   | <kbd>Cmd</kbd>-<kbd>Alt</kbd>-<kbd>5</kbd>   | "toggleHeading5"       |
| <kbd>Ctrl</kbd>-<kbd>Alt</kbd>-<kbd>6</kbd>   | <kbd>Cmd</kbd>-<kbd>Alt</kbd>-<kbd>6</kbd>   | "toggleHeading6"       |

Veja como você pode alterar alguns, deixando outros intocados:

```js
const editor = new CatMarkDownEditor({
    shortcuts: {
        "toggleOrderedList": "Ctrl-Alt-K", // altera o atalho para toggleOrderedList
        "toggleCodeBlock": null, // desvincula Ctrl-Alt-C
        "drawTable": "Cmd-Alt-T", // vincula Cmd-Alt-T à ação drawTable, que não vem com um atalho padrão
    }
});
```

Os atalhos são convertidos automaticamente entre plataformas. Se você definir um atalho como "Cmd-B", no PC esse atalho será alterado para "Ctrl-B". Por outro lado, um atalho definido como "Ctrl-B" se tornará "Cmd-B" para usuários de Mac.

A lista de ações que podem ser vinculadas é a mesma que a lista de ações integradas disponíveis para os [botões da barra de ferramentas](#ícones-da-barra-de-ferramentas).


## Uso avançado

### Manipulação de eventos

Você pode capturar a seguinte lista de eventos: https://codemirror.net/doc/manual.html#events

```js
const catMDE = new CatMarkDownEditor();
catMDE.codemirror.on("change", () => {
    console.log(catMDE.value());
});
```


### Removendo o CatMarkDownEditor da área de texto

Você pode reverter para a área de texto inicial chamando o método `toTextArea`. Observe que isso limpa o salvamento automático (se habilitado) associado a ele. A área de texto manterá qualquer texto da instância do CatMarkDownEditor destruída.

```js
const catMDE = new CatMarkDownEditor();
// ...
catMDE.toTextArea();
catMDE = null;
```

Se você precisar remover os ouvintes de eventos registrados (quando o editor não for mais necessário), chame `catMDE.cleanup()`.


### Métodos úteis

Os seguintes métodos autoexplicativos podem ser úteis durante o desenvolvimento com o CatMarkDownEditor.

```js
const catMDE = new CatMarkDownEditor();
catMDE.isPreviewActive(); // retorna booleano
catMDE.isSideBySideActive(); // retorna booleano
catMDE.isFullscreenActive(); // retorna booleano
catMDE.clearAutosavedValue(); // nenhum valor retornado
```


## Como funciona

O CatMarkDownEditor é uma continuação do CatMDE, que por sua vez foi um fork do SimpleMDE.

Ele é empacotado com o [CodeMirror](https://github.com/codemirror/codemirror) e depende do [Font Awesome](http://fontawesome.io).

O CodeMirror é a espinha dorsal do projeto e analisa grande parte da sintaxe do Markdown à medida que é escrita. Isso nos permite adicionar estilos ao Markdown que está sendo escrito. Além disso, uma barra de ferramentas e uma barra de status foram adicionadas na parte superior e inferior, respectivamente. As visualizações são renderizadas pelo [Marked](https://github.com/markedjs/marked) usando o GitHub Flavored Markdown (GFM).


## Modificando o CatMarkDownEditor

Você pode querer editar esta biblioteca para adaptar seu comportamento às suas necessidades. Isso pode ser feito em algumas etapas rápidas:

1. Siga as instruções de [pré-requisitos](CONTRIBUTING.md#prerequisites) e [instalação](CONTRIBUTING.md#installation) no guia de contribuição;
2. Faça suas alterações;
3. Execute o comando `npx gulp`, que irá gerar os arquivos: `dist/catmarkdowneditor.min.css` e `dist/catmarkdowneditor.min.js`;
4. Copie e cole esses arquivos em sua base de código e pronto.


## Contribuindo

Quer contribuir com o CatMarkDownEditor? Obrigado! Temos um [guia de contribuição](CONTRIBUTING.md) só para você!


## Licença

Este projeto é lançado sob a [Licença MIT](LICENSE).

- Copyright (c) 2025 Marin. All rights reserved.
