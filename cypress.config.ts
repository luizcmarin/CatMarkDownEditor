/*
* Project: Catfeina/CatMarkDownEditor
* Github: https://github.com/luizcmarin/CatMarkDownEditor
* File: cypress.config.ts
*
* Copyright (c) 2025 Marin. All rights reserved.
*
* Authors: Luiz Carlos Marin / Ivete Gielow Marin / Caroline Gielow Marin
*
* This file is part of the Catfeina project.
* Unauthorized reproduction or distribution of this file, or any part thereof, is strictly prohibited.
*
* Note: Cypress configuration file.
*
*/

import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        excludeSpecPattern: [
            '**/*.html',
        ],
        video: true,
    },
});
