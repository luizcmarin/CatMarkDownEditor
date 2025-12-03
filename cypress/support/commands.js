/*
* Project: Catfeina/CatMarkDownEditor
* Github: https://github.com/luizcmarin/CatMarkDownEditor
* File: cypress/support/commands.js
*
* Copyright (c) 2025 Marin. All rights reserved.
*
* Authors: Luiz Carlos Marin / Ivete Gielow Marin / Caroline Gielow Marin
*
* This file is part of the Catfeina project.
* Unauthorized reproduction or distribution of this file, or any part thereof, is strictly prohibited.
*
* Note: Cypress custom commands.
*
*/

/// <reference types="cypress" />

const unquote = (str) => str.replace(/(^")|("$)/g, '');

Cypress.Commands.add(
    'before',
    {
        prevSubject: 'element',
    },
    (element, property) => {
        const win = element[0].ownerDocument.defaultView;
        const before = win.getComputedStyle(element[0], 'before');
        return unquote(before.getPropertyValue(property));
    },
);

Cypress.Commands.add('previewOn' , () => {
    cy.get('.CatMarkDownEditorContainer .editor-preview').should('not.be.visible');
    cy.get('.CatMarkDownEditorContainer .editor-toolbar button.preview').should('not.have.class', 'active');
    cy.get('.CatMarkDownEditorContainer .editor-toolbar button.preview').click();
    cy.get('.CatMarkDownEditorContainer .editor-toolbar button.preview').should('have.class', 'active');
    cy.get('.CatMarkDownEditorContainer .editor-preview').should('be.visible');
});

Cypress.Commands.add('previewOff' , () => {
    cy.get('.CatMarkDownEditorContainer .editor-preview').should('be.visible');
    cy.get('.CatMarkDownEditorContainer .editor-toolbar button.preview').should('have.class', 'active');
    cy.get('.CatMarkDownEditorContainer .editor-toolbar button.preview').click();
    cy.get('.CatMarkDownEditorContainer .editor-toolbar button.preview').should('not.have.class', 'active');
    cy.get('.CatMarkDownEditorContainer .editor-preview').should('not.be.visible');
});
