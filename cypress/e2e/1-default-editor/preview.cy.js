/*
* Project: Catfeina/CatMarkDownEditor
* Github: https://github.com/luizcmarin/CatMarkDownEditor
* File: cypress/e2e/1-default-editor/preview.cy.js
*
* Copyright (c) 2025 Marin. All rights reserved.
*
* Authors: Luiz Carlos Marin / Ivete Gielow Marin / Caroline Gielow Marin
*
* This file is part of the Catfeina project.
* Unauthorized reproduction or distribution of this file, or any part thereof, is strictly prohibited.
*
* Note: Cypress test for the preview functionality.
*
*/

/// <reference types="cypress" />

describe('Preview', () => {
    beforeEach(() => {
        cy.visit(__dirname + '/index.html');
    });

    it('can show a preview of markdown text', () => {
        cy.get('.CatMarkDownEditorContainer').should('be.visible');
        cy.get('.CatMarkDownEditorContainer .editor-preview').should('not.exist');

        // Enter markdown text.
        cy.get('.CatMarkDownEditorContainer .cm-editor').type('# My Big Title');
        cy.get('.CatMarkDownEditorContainer .cm-editor').type('{enter}');
        cy.get('.CatMarkDownEditorContainer .cm-editor').type('This is some **important** text!');

        cy.get('.CatMarkDownEditorContainer .cm-line').should('contain', '# My Big Title');
        cy.get('.CatMarkDownEditorContainer .cm-header-1').should('exist');

        cy.get('.CatMarkDownEditorContainer .cm-line').should('contain', 'This is some important text!');
        cy.get('.CatMarkDownEditorContainer .cm-strong').should('exist');

        cy.get('button.preview').click();

        // Check preview window for rendered markdown.
        cy.get('.CatMarkDownEditorContainer .editor-preview').should('be.visible');
        cy.get('.CatMarkDownEditorContainer .editor-preview').should('contain.html', '<h1>My Big Title</h1>');
        cy.get('.CatMarkDownEditorContainer .editor-preview').should('contain.html', '<p>This is some <strong>important</strong> text!</p>');
    });
});
