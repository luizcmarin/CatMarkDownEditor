/*
* Project: Catfeina/CatMarkDownEditor
* Github: https://github.com/luizcmarin/CatMarkDownEditor
* File: cypress/e2e/1-default-editor/visual.cy.js
*
* Copyright (c) 2025 Marin. All rights reserved.
*
* Authors: Luiz Carlos Marin / Ivete Gielow Marin / Caroline Gielow Marin
*
* This file is part of the Catfeina project.
* Unauthorized reproduction or distribution of this file, or any part thereof, is strictly prohibited.
*
* Note: Cypress test for the default editor's visual elements.
*
*/

/// <reference types="cypress" />

describe('Default editor', () => {
    beforeEach(() => {
        cy.visit(__dirname + '/index.html');
    });

    it('loads the editor with default settings', () => {
        cy.get('.CatMarkDownEditorContainer').should('be.visible');
        cy.get('#textarea').should('not.be.visible');

        cy.get('.CatMarkDownEditorContainer .editor-toolbar').should('be.visible');
        cy.get('.CatMarkDownEditorContainer .cm-editor').should('be.visible');
        cy.get('.CatMarkDownEditorContainer .editor-preview').should('not.exist');
        cy.get('.CatMarkDownEditorContainer .editor-statusbar').should('be.visible');
    });
});
