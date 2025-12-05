/*
* Project: Catfeina/CatMarkDownEditor
* Github: https://github.com/luizcmarin/CatMarkDownEditor
* File: cypress/e2e/3-class-prefix/class-prefix.cy.js
*
* Copyright (c) 2025 Marin. All rights reserved.
*
* Authors: Luiz Carlos Marin / Ivete Gielow Marin / Caroline Gielow Marin
*
* This file is part of the Catfeina project.
* Unauthorized reproduction or distribution of this file, or any part thereof, is strictly prohibited.
*
* Note: Cypress test for the class prefix functionality.
*
*/

/// <reference types="cypress" />

describe('Class prefix', () => {
    it('should not have a prefix by default', () => {
        cy.visit(__dirname + '/index-no-prefix.html');

        cy.get('button.table').should('be.visible');
    });

    it('should have a prefix when specified', () => {
        cy.visit(__dirname + '/index.html');

        cy.get('button.mde-table').should('be.visible');
    });
});
