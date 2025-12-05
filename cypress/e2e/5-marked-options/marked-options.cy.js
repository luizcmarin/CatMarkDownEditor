/*
* Project: Catfeina/CatMarkDownEditor
* Github: https://github.com/luizcmarin/CatMarkDownEditor
* File: cypress/e2e/5-marked-options/marked-options.cy.js
*
* Copyright (c) 2025 Marin. All rights reserved.
*
* Authors: Luiz Carlos Marin / Ivete Gielow Marin / Caroline Gielow Marin
*
* This file is part of the Catfeina project.
* Unauthorized reproduction or distribution of this file, or any part thereof, is strictly prohibited.
*
* Note: Cypress test for the marked options functionality.
*
*/

/// <reference types="cypress" />

describe('Marked options', () => {
    beforeEach(() => {
        cy.visit(__dirname + '/index.html');
    });

    it('must apply the markedOptions to the markdown parser', () => {
        cy.get('.CatMarkDownEditorContainer').should('be.visible');
        cy.get('#textarea').should('not.be.visible');

        cy.get('.CatMarkDownEditorContainer .cm-editor').type('# Title{enter}');

        cy.get('button.preview').click();

        cy.get('.CatMarkDownEditorContainer .editor-preview').should('contain.html', '<h1 id="header-prefix-title">Title</h1>');
    });
});
