/*
* Project: Catfeina/CatMarkDownEditor
* Github: https://github.com/luizcmarin/CatMarkDownEditor
* File: src/js/codemirror/tablist.js
*
* Copyright (c) 2025 Marin. All rights reserved.
*
* Authors: Luiz Carlos Marin / Ivete Gielow Marin / Caroline Gielow Marin
*
* This file is part of the Catfeina project.
* Unauthorized reproduction or distribution of this file, or any part thereof, is strictly prohibited.
*
* Note: This file is a modified version of a CodeMirror file.
*
*/

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

var CodeMirror = require('codemirror');

CodeMirror.commands.tabAndIndentMarkdownList = function (cm) {
    var ranges = cm.listSelections();
    var pos = ranges[0].head;
    var eolState = cm.getStateAfter(pos.line);
    var inList = eolState.list !== false;

    if (inList) {
        cm.execCommand('indentMore');
        return;
    }

    if (cm.options.indentWithTabs) {
        cm.execCommand('insertTab');
    } else {
        var spaces = Array(cm.options.tabSize + 1).join(' ');
        cm.replaceSelection(spaces);
    }
};

CodeMirror.commands.shiftTabAndUnindentMarkdownList = function (cm) {
    var ranges = cm.listSelections();
    var pos = ranges[0].head;
    var eolState = cm.getStateAfter(pos.line);
    var inList = eolState.list !== false;

    if (inList) {
        cm.execCommand('indentLess');
        return;
    }

    if (cm.options.indentWithTabs) {
        cm.execCommand('insertTab');
    } else {
        var spaces = Array(cm.options.tabSize + 1).join(' ');
        cm.replaceSelection(spaces);
    }
};
