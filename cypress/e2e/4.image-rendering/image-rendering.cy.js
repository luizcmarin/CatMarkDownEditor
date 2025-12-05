/*
* Project: Catfeina/CatMarkDownEditor
* Github: https://github.com/luizcmarin/CatMarkDownEditor
* File: cypress/e2e/4.image-rendering/image-rendering.cy.js
*
* Copyright (c) 2025 Marin. All rights reserved.
*
* Authors: Luiz Carlos Marin / Ivete Gielow Marin / Caroline Gielow Marin
*
* This file is part of the Catfeina project.
* Unauthorized reproduction or distribution of this file, or any part thereof, is strictly prohibited.
*
* Note: Cypress test for the image rendering functionality.
*
*/

/// <reference types="cypress" />

describe('Image rendering', () => {

    const imageUrl = 'https://picsum.photos/id/237/150';

    beforeEach(() => {
        cy.visit(__dirname + '/index.html');
        cy.intercept('GET', imageUrl).as('image');
    });

    it('must render an image inside the editor', () => {
        cy.get('.CatMarkDownEditorContainer').should('be.visible');
        cy.get('#textarea').should('not.be.visible');

        cy.get('.CatMarkDownEditorContainer .cm-editor').type(`![Dog!](${imageUrl})`);

        cy.wait('@image');

        cy.get('button.preview').click();

        cy.get('.CatMarkDownEditorContainer .editor-preview').should('contain.html', `<p><img src="${imageUrl}" alt="Dog!"></p>`);
    });

    it('must be able to handle parentheses inside image alt text', () => {
        cy.get('.CatMarkDownEditorContainer').should('be.visible');
        cy.get('#textarea').should('not.be.visible');

        cy.get('.CatMarkDownEditorContainer .cm-editor').type(`![Dog! (He's a good boy!)](${imageUrl})`);

        cy.wait('@image');

        cy.get('button.preview').click();

        cy.get('.CatMarkDownEditorContainer .editor-preview').should('contain.html', `<p><img src="${imageUrl}" alt="Dog! (He's a good boy!)"></p>`);
    });
});
