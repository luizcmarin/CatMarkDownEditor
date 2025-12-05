/*
* Project: Catfeina/CatMarkDownEditor
* Github: https://github.com/luizcmarin/CatMarkDownEditor
* File: cypress/e2e/2-url-prompt/url-prompt.cy.js
*
* Copyright (c) 2025 Marin. All rights reserved.
*
* Authors: Luiz Carlos Marin / Ivete Gielow Marin / Caroline Gielow Marin
*
* This file is part of the Catfeina project.
* Unauthorized reproduction or distribution of this file, or any part thereof, is strictly prohibited.
*
* Note: Cypress test for the URL prompt functionality.
*
*/

/// <reference types="cypress" />

describe('URL prompts', () => {
    beforeEach(() => {
        cy.visit(__dirname + '/index.html');
    });

    it('must show the correct text for a link prompt', () => {
        cy.get('.CatMarkDownEditorContainer').should('be.visible');
        cy.get('#textarea').should('not.be.visible');

        cy.window().then(($win) => {
            const stub = cy.stub($win, 'prompt');
            cy.get('button.link').click();
            cy.get('button.link').then(() => {
                expect(stub).to.be.calledWith('URL', 'https://');
            });
        });
    });

    it('must show the correct text for an image prompt', () => {
        cy.get('.CatMarkDownEditorContainer').should('be.visible');
        cy.get('#textarea').should('not.be.visible');

        cy.window().then(($win) => {
            const stub = cy.stub($win, 'prompt');
            cy.get('button.image').click();
            cy.get('button.image').then(() => {
                expect(stub).to.be.calledWith('Image URL', 'https://');
            });
        });
    });

    it('must enter a link correctly through a prompt', () => {
        cy.get('.CatMarkDownEditorContainer').should('be.visible');
        cy.get('#textarea').should('not.be.visible');

        cy.window().then(($win) => {
            cy.stub($win, 'prompt').returns('https://example.com');
            cy.get('button.link').click();
        });
        cy.get('.CatMarkDownEditorContainer .cm-editor').contains('[](https://example.com)');
        cy.get('.CatMarkDownEditorContainer .cm-editor').type('{home}{rightArrow}Link to a website!');

        cy.get('button.preview').click();

        cy.get('.CatMarkDownEditorContainer .editor-preview').should('contain.html', '<p><a href="https://example.com">Link to a website!</a></p>');
    });
});
