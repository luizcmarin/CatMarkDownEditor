/*
* Project: Catfeina/CatMarkDownEditor
* Github: https://github.com/luizcmarin/CatMarkDownEditor
* File: src/js/catmarkdowneditor.js
*
* Copyright (c) 2025 Marin. All rights reserved.
*
* Authors: Luiz Carlos Marin / Ivete Gielow Marin / Caroline Gielow Marin
*
* This file is part of the Catfeina project.
* Unauthorized reproduction or distribution of this file, or any part thereof, is strictly prohibited.
*
* Note: Main JavaScript file for the CatMarkDownEditor, using CodeMirror 6.
*
*/

'use strict';

import { EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, highlightActiveLine } from '@codemirror/view';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
// import { languages } from '@codemirror/language-data'; // Removido para evitar o build de todas as linguagens
import { defaultKeymap, history, indentWithTab } from '@codemirror/commands';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import { marked } from 'marked';

// Import the CSS file
import '../css/catmarkdowneditor.css';

// --- Marked.js Setup ---
// Basic configuration
marked.use({
    gfm: true,
    breaks: true,
});


// Helper function to merge options
function extend(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var property in source) {
            if (Object.prototype.hasOwnProperty.call(source, property)) {
                if (source[property] instanceof Array) {
                    target[property] = source[property];
                } else if (
                    source[property] !== null &&
                    typeof source[property] === 'object' &&
                    source[property].constructor === Object
                ) {
                    target[property] = extend(target[property] || {}, source[property]);
                } else {
                    target[property] = source[property];
                }
            }
        }
    }
    return target;
}

// Default options
const defaultOptions = {
    element: null,
    initialValue: '',
    lineNumbers: true,
    theme: 'light',
    toolbar: [
        'bold', 'italic', 'strikethrough', '|',
        'heading', 'quote', '|',
        'unordered-list', 'ordered-list', 'task-list', '|',
        'inline-code', 'code-block', 'horizontal-rule', '|',
        'link', 'image', '|',
        'table', 'footnote', '|',
        'preview', 'side-by-side', 'fullscreen', '|',
        'guide',
    ],
    toolbarPosition: 'top',
    statusbar: ['lines', 'words', 'cursor'],
    autosave: {
        enabled: false,
        delay: 1000,
        uniqueId: 'CatMarkDownEditor',
    },
    language: 'en-US',
};

class CatMarkDownEditor {
    constructor(options) {
        this.options = extend({}, defaultOptions, options || {});

        // Simple i18n object
        this.i18n = {
            toolbar: {
                bold: "Bold",
                italic: "Italic",
                strikethrough: "Strikethrough",
                heading: "Heading",
                quote: "Quote",
                "unordered-list": "Unordered List",
                "ordered-list": "Ordered List",
                "task-list": "Task List",
                "inline-code": "Inline Code",
                "code-block": "Code Block",
                "horizontal-rule": "Horizontal Rule",
                link: "Link",
                image: "Image",
                table: "Table",
                footnote: "Footnote",
                preview: "Preview",
                "side-by-side": "Side by Side",
                fullscreen: "Fullscreen",
                guide: "Markdown Guide"
            },
            statusbar: {
                lines: "Lines",
                words: "Words",
                cursor: "Cursor"
            },
            prompt: {
                url: "URL",
                imageUrl: "Image URL",
                language: "Language (e.g., javascript, python)",
            }
        };


        if (this.options.autosave.enabled) {
            const savedValue = localStorage.getItem(this.options.autosave.uniqueId);
            if (savedValue) {
                this.options.initialValue = savedValue;
            }
        }

        if (!this.options.element) {
            console.error('CatMarkDownEditor: "element" option is required.');
            return;
        }

        this.viewMode = 'editor-only';

        this.render();
    }

    render() {
        this.container = document.createElement('div');
        this.container.className = 'CatMarkDownEditorContainer';
        this.options.element.parentNode.insertBefore(this.container, this.options.element);
        this.options.element.style.display = 'none';

        const customTheme = EditorView.theme({
            '&': {
                height: this.options.minHeight || '300px',
                border: '1px solid #ced4da',
                borderRadius: '4px',
            },
            '.cm-scroller': {
                overflow: 'auto',
            },
            '.cm-content': {
                fontFamily: 'inherit',
            },
            '.cm-gutters': {
                backgroundColor: '#f7f7f7',
                borderRight: '1px solid #ddd',
            },
        });

        const myHighlightStyle = HighlightStyle.define([
            { tag: tags.heading1, class: 'cm-header-1' },
            { tag: tags.heading2, class: 'cm-header-2' },
            { tag: tags.strong, fontWeight: 'bold' },
            { tag: tags.emphasis, fontStyle: 'italic' },
            { tag: tags.strikethrough, textDecoration: 'line-through' },
            { tag: tags.quote, fontStyle: 'italic', color: '#7f8c8d' },
            { tag: tags.link, color: '#7f8c8d' },
            { tag: tags.url, color: '#aab2b3' },
        ]);

        let extensions = [
            markdown({
                base: markdownLanguage,
                // codeLanguages: languages, // Removido
            }),
            history(),
            keymap.of([...defaultKeymap, indentWithTab]),
            customTheme,
            syntaxHighlighting(myHighlightStyle),
            highlightActiveLine(),
            EditorView.lineWrapping,
            EditorView.updateListener.of((update) => {
                if (update.docChanged) {
                    this.updateStatusBar();
                    if (this.options.autosave.enabled) {
                        this.autosave();
                    }
                    if (this.viewMode === 'preview-only' || this.viewMode === 'side-by-side') {
                        this.updatePreview();
                    }
                }
                if(update.selectionSet) {
                    this.updateStatusBar();
                }
            }),
        ];

        if (this.options.lineNumbers) {
            extensions.push(lineNumbers());
        }

        const state = EditorState.create({
            doc: this.options.initialValue,
            extensions: extensions,
        });

        this.codemirror = new EditorView({
            state,
            parent: this.container,
        });

        if (this.options.toolbarPosition !== 'none') {
            const toolbarElement = this._createToolbarElement();
            if (this.options.toolbarPosition === 'top') {
                this.container.insertBefore(toolbarElement, this.codemirror.dom);
            } else if (this.options.toolbarPosition === 'bottom') {
                this.container.appendChild(toolbarElement);
            }
        }

        this.createStatusBar();
        this.updateViewMode();
    }

    _createToolbarElement() {
        const toolbarElement = document.createElement('div');
        toolbarElement.className = 'editor-toolbar';

        const iconMap = {
            bold: 'type-bold',
            italic: 'type-italic',
            strikethrough: 'type-strikethrough',
            heading: 'type-h1',
            quote: 'quote',
            'unordered-list': 'list-ul',
            'ordered-list': 'list-ol',
            'task-list': 'check2-square',
            'inline-code': 'code',
            'code-block': 'code-square',
            'horizontal-rule': 'hr',
            link: 'link-45deg',
            image: 'image',
            table: 'table',
            footnote: 'journal-text',
            preview: 'eye',
            'side-by-side': 'layout-split',
            fullscreen: 'fullscreen',
            guide: 'question-circle',
        };

        this.options.toolbar.forEach(item => {
            if (item === '|') {
                const separator = document.createElement('i');
                separator.className = 'separator';
                separator.innerHTML = '|';
                toolbarElement.appendChild(separator);
            } else {
                const button = document.createElement('button');
                button.className = item;
                button.title = this.i18n.toolbar[item] || item;
                const iconClass = iconMap[item] || '';
                button.innerHTML = `<i class="bi bi-${iconClass}"></i>`;
                button.onclick = () => {
                    if (this.toolbarActions[item]) {
                        this.toolbarActions[item](this.codemirror);
                    }
                };
                toolbarElement.appendChild(button);
            }
        });

        return toolbarElement;
    }

    createStatusBar() {
        this.statusbar = {};
        const statusBarElement = document.createElement('div');
        statusBarElement.className = 'editor-statusbar';

        this.options.statusbar.forEach(item => {
            const span = document.createElement('span');
            span.className = item;
            statusBarElement.appendChild(span);
            this.statusbar[item] = span;
        });

        this.container.appendChild(statusBarElement);
        this.updateStatusBar();
    }

    updateStatusBar() {
        if (!this.statusbar) return;

        const state = this.codemirror.state;
        const doc = state.doc;
        const selection = state.selection.main;

        let statusParts = [];

        if (this.statusbar.lines) {
            statusParts.push(`${this.i18n.statusbar.lines}: ${doc.lines}`);
        }

        if (this.statusbar.words) {
            const text = doc.toString();
            const words = text.match(/\b\w+\b/g);
            statusParts.push(`${this.i18n.statusbar.words}: ${words ? words.length : 0}`);
        }

        if (this.statusbar.cursor) {
            const line = doc.lineAt(selection.head);
            const lineNum = line.number;
            const colNum = selection.head - line.from;
            statusParts.push(`${this.i18n.statusbar.cursor}: ${lineNum}:${colNum}`);
        }

        this.container.querySelector('.editor-statusbar').textContent = statusParts.join(' | ');
    }

    autosave() {
        clearTimeout(this.autosaveTimeout);
        this.autosaveTimeout = setTimeout(() => {
            localStorage.setItem(this.options.autosave.uniqueId, this.value());
        }, this.options.autosave.delay);
    }

    get toolbarActions() {
        return {
            bold: (view) => this.toggleSurroundingText(view, '**'),
            italic: (view) => this.toggleSurroundingText(view, '*'),
            strikethrough: (view) => this.toggleSurroundingText(view, '~~'),
            quote: (view) => this.toggleLinePrefix(view, '> '),
            'unordered-list': (view) => this.toggleLinePrefix(view, '* '),
            'ordered-list': (view) => this.toggleOrderedList(view),
            'task-list': (view) => this.toggleTaskList(view),
            'inline-code': (view) => this.toggleSurroundingText(view, '`'),
            'code-block': (view) => this.toggleCodeBlock(view),
            'horizontal-rule': (view) => this.insertHorizontalRule(view),
            link: (view) => this.drawLink(view),
            image: (view) => this.drawImage(view),
            table: (view) => this.insertTable(view),
            footnote: (view) => this.insertFootnote(view),
            preview: () => this.togglePreview(),
            'side-by-side': () => this.toggleSideBySide(),
            fullscreen: () => this.toggleFullScreen(),
            guide: () => window.open('https://www.markdownguide.org/basic-syntax/', '_blank'),
        };
    }

    toggleSurroundingText(view, surroundingText) {
        const { from, to } = view.state.selection.main;
        const selection = view.state.sliceDoc(from, to);
        view.dispatch({
            changes: { from, to, insert: `${surroundingText}${selection}${surroundingText}` },
        });
        view.focus();
    }

    toggleLinePrefix(view, prefix) {
        const { from, to } = view.state.selection.main;
        const startLine = view.state.doc.lineAt(from);
        const endLine = view.state.doc.lineAt(to);

        let changes = [];
        for (let i = startLine.number; i <= endLine.number; i++) {
            const line = view.state.doc.line(i);
            if (line.text.startsWith(prefix)) {
                changes.push({ from: line.from, to: line.from + prefix.length, insert: '' });
            } else {
                changes.push({ from: line.from, insert: prefix });
            }
        }

        view.dispatch({ changes });
        view.focus();
    }

    toggleOrderedList(view) {
        const { from, to } = view.state.selection.main;
        const startLine = view.state.doc.lineAt(from);
        const endLine = view.state.doc.lineAt(to);

        let changes = [];
        let listNumber = 1;

        for (let i = startLine.number; i <= endLine.number; i++) {
            const line = view.state.doc.line(i);
            const match = line.text.match(/^(\d+\.\s+)/);
            if (match) {
                changes.push({ from: line.from, to: line.from + match[1].length, insert: '' });
            } else {
                changes.push({ from: line.from, insert: `${listNumber}. ` });
                listNumber++;
            }
        }

        view.dispatch({ changes });
        view.focus();
    }

    toggleTaskList(view) {
        const { from, to } = view.state.selection.main;
        const startLine = view.state.doc.lineAt(from);
        const endLine = view.state.doc.lineAt(to);

        let changes = [];
        for (let i = startLine.number; i <= endLine.number; i++) {
            const line = view.state.doc.line(i);
            const match = line.text.match(/^- \[(x| )\] /);
            if (match) {
                const newStatus = match[1] === 'x' ? ' ' : 'x';
                changes.push({ from: line.from + 3, to: line.from + 4, insert: newStatus });
            } else {
                changes.push({ from: line.from, insert: '- [ ] ' });
            }
        }

        view.dispatch({ changes });
        view.focus();
    }

    toggleCodeBlock(view) {
        const { from, to } = view.state.selection.main;
        const selection = view.state.sliceDoc(from, to);
        const fence = '```';
        const language = prompt(this.i18n.prompt.language, '');
        const codeBlock = `\n${fence}${language || ''}\n${selection}\n${fence}\n`;

        view.dispatch({
            changes: { from, to, insert: codeBlock },
        });
        view.focus();
    }

    insertHorizontalRule(view) {
        const { from } = view.state.selection.main;
        const hr = '\n\n***\n\n';
        view.dispatch({
            changes: { from, insert: hr },
        });
        view.focus();
    }

    drawLink(view) {
        const { from, to } = view.state.selection.main;
        const selection = view.state.sliceDoc(from, to);
        const url = prompt(this.i18n.prompt.url, 'https://');
        if (url) {
            view.dispatch({
                changes: { from, to, insert: `[${selection}](${url})` },
            });
        }
        view.focus();
    }

    drawImage(view) {
        const { from, to } = view.state.selection.main;
        const selection = view.state.sliceDoc(from, to);
        const url = prompt(this.i18n.prompt.imageUrl, 'https://');
        if (url) {
            view.dispatch({
                changes: { from, to, insert: `![${selection}](${url})` },
            });
        }
        view.focus();
    }

    insertTable(view) {
        const tableTemplate = `
| Header 1 | Header 2 |
| -------- | -------- |
| Row 1 Col 1 | Row 1 Col 2 |
| Row 2 Col 1 | Row 2 Col 2 |
`;
        const { from } = view.state.selection.main;
        view.dispatch({
            changes: { from, insert: tableTemplate },
        });
        view.focus();
    }

    insertFootnote(view) {
        const { from, to } = view.state.selection.main;
        const selection = view.state.sliceDoc(from, to);
        const footnoteId = Math.random().toString(36).substr(2, 9);
        const footnoteText = `[^${footnoteId}]: ${selection || 'Sua nota de rodapé aqui.'}`;
        const footnoteRef = `[^${footnoteId}]`;

        view.dispatch({
            changes: [
                { from, to, insert: footnoteRef },
                { from: view.state.doc.length, insert: `\n\n${footnoteText}` }
            ],
        });
        view.focus();
    }

    async updatePreview() {
        const previewElement = this.getPreviewElement();
        if (previewElement) {
            previewElement.innerHTML = await marked.parse(this.value());
        }
    }

    updateViewMode() {
        this.container.classList.remove('view-mode-editor-only', 'view-mode-preview-only', 'view-mode-side-by-side');
        this.container.classList.add(`view-mode-${this.viewMode}`);

        const editorDom = this.codemirror.dom;
        const previewElement = this.getPreviewElement();

        if (this.viewMode === 'editor-only') {
            editorDom.style.display = '';
            previewElement.style.display = 'none';
            this.container.classList.remove('sided');
            previewElement.classList.remove('sided');
        } else if (this.viewMode === 'preview-only') {
            editorDom.style.display = 'none';
            previewElement.style.display = '';
            this.updatePreview();
            this.container.classList.remove('sided');
            previewElement.classList.remove('sided');
        } else if (this.viewMode === 'side-by-side') {
            editorDom.style.display = '';
            previewElement.style.display = '';
            this.updatePreview();
            this.container.classList.add('sided');
            previewElement.classList.add('sided');
        }
    }

    togglePreview() {
        this.viewMode = this.viewMode === 'editor-only' ? 'preview-only' : 'editor-only';
        this.updateViewMode();
    }

    toggleSideBySide() {
        this.viewMode = this.viewMode === 'editor-only' ? 'side-by-side' : 'editor-only';
        this.updateViewMode();
    }

    toggleFullScreen() {
        this.container.classList.toggle('fullscreen');
        this.updateViewMode();
    }

    getPreviewElement() {
        let preview = this.container.querySelector('.editor-preview');
        if (!preview) {
            preview = document.createElement('div');
            preview.className = 'editor-preview';
            this.container.appendChild(preview);
        }
        return preview;
    }

    value(val) {
        if (val === undefined) {
            return this.codemirror.state.doc.toString();
        } else {
            this.codemirror.dispatch({
                changes: { from: 0, to: this.codemirror.state.doc.length, insert: val },
            });
        }
    }
}

window.CatMarkDownEditor = CatMarkDownEditor;
