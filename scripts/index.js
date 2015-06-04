var markdown = require('marked');
markdown.setOptions({
    highlight: function(code) {
        return require('highlight.js').highlightAuto(code).value;
    }
});
var $ = function(selectize) {
    return document.querySelector(selectize);
};
var $$ = function(selectize) {
    return document.querySelectorAll(selectize);
};
//生成Code Edit实例 & 初始化
var editInput = CodeMirror($("#edit-input"), {
    value: '',
    mode: 'text/x-markdown',
    //theme: 'monokai',
    lineNumbers: false,
    readyOnly: false,
    inputStyle: 'textarea',
    autofocus: true
});
editInput.setSize('100%', '100%');
//实时预览
var timeId = 0;
editInput.on('change', function(cm, obj) {
    try {
        var text = cm.doc.getValue();
        $('#edit-preview').innerHTML = markdown(text);
    } catch (e) {}
});