/*
* Project: Catfeina/CatMarkDownEditor
* Github: https://github.com/luizcmarin/CatMarkDownEditor
* File: cypress/e2e/1-default-editor/statusbar.cy.js
*
* Copyright (c) 2025 Marin. All rights reserved.
*
* Authors: Luiz Carlos Marin / Ivete Gielow Marin / Caroline Gielow Marin
*
* This file is part of the Catfeina project.
* Unauthorized reproduction or distribution of this file, or any part thereof, is strictly prohibited.
*
* Note: Cypress test for the status bar functionality.
*
*/

/// <reference types="cypress" />

describe('Default statusbar', () => {
    beforeEach(() => {
        cy.visit(__dirname + '/index.html');
    });

    it('loads the editor with default statusbar', () => {
        cy.get('.CatMarkDownEditorContainer').should('be.visible');
        cy.get('.CatMarkDownEditorContainer .editor-statusbar').should('be.visible');

        cy.get('.CatMarkDownEditorContainer .editor-statusbar .autosave').should('be.empty');

        cy.get('.CatMarkDownEditorContainer .editor-statusbar .lines').should('contain', '1');

        cy.get('.CatMarkDownEditorContainer .editor-statusbar .words').should('contain', '0');

        cy.get('.CatMarkDownEditorContainer .editor-statusbar .cursor').should('contain', '1:1');
    });

    it('updates the statusbar when typing', () => {
        cy.get('.CatMarkDownEditorContainer').should('be.visible');
        cy.get('.CatMarkDownEditorContainer .editor-statusbar').should('be.visible');

        cy.get('.CatMarkDownEditorContainer .CodeMirror').type('Hello');

        cy.get('.CatMarkDownEditorContainer .editor-statusbar .autosave').should('be.empty');

        cy.get('.CatMarkDownEditorContainer .editor-statusbar .lines').should('contain', '1');
        cy.get('.CatMarkDownEditorContainer .editor-statusbar .words').should('contain', '1');
        cy.get('.CatMarkDownEditorContainer .editor-statusbar .cursor').should('contain', '1:6');

        cy.get('.CatMarkDownEditorContainer .CodeMirror').type(' World');

        cy.get('.CatMarkDownEditorContainer .editor-statusbar .lines').should('contain', '1');
        cy.get('.CatMarkDownEditorContainer .editor-statusbar .words').should('contain', '2');
        cy.get('.CatMarkDownEditorContainer .editor-statusbar .cursor').should('contain', '1:12');

        cy.get('.CatMarkDownEditorContainer .CodeMirror').type('{enter}');

        cy.get('.CatMarkDownEditorContainer .editor-statusbar .lines').should('contain', '2');
        cy.get('.CatMarkDownEditorContainer .editor-statusbar .words').should('contain', '2');
        cy.get('.CatMarkDownEditorContainer .editor-statusbar .cursor').should('contain', '2:1');

        cy.get('.CatMarkDownEditorContainer .CodeMirror').type('This is a sample text.{enter}We\'re testing the statusbar.{enter}Did it work?');

        cy.get('.CatMarkDownEditorContainer .editor-statusbar .autosave').should('be.empty');
        cy.get('.CatMarkDownEditorContainer .editor-statusbar .lines').should('contain', '4');
        cy.get('.CatMarkDownEditorContainer .editor-statusbar .words').should('contain', '15');
        cy.get('.CatMarkDownEditorContainer .editor-statusbar .cursor').should('contain', '4:13');
    });
});
