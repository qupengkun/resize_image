/*!
 * FileInput Spanish (Latin American) Translations
 *
 * This file must be loaded after 'fileinput.js'. Patterns in braces '{}', or
 * any HTML markup tags in the messages must not be converted or translated.
 *
 * @see http://github.com/kartik-v/bootstrap-fileinput
 *
 * NOTE: this file must be saved in UTF-8 encoding.
 */
(function ($) {
    "use strict";
    $.fn.fileinput.locales.es = {
    		fileSingle: '单个文件',
            filePlural: '多个文件',
            browseLabel: '添加图片',
            removeLabel: '删除文件',
            removeTitle: '删除选中文件',
            cancelLabel: '取消',
            cancelTitle: '取消上传',
            uploadLabel: '上传',
            uploadTitle: '上传选中文件',
            msgSizeTooLarge: '文件 "{name}" 为 (<b>{size} KB</b>)， 上传文件不能大于 <b>{maxSize} KB</b>. 请重新上传!',
            msgFilesTooLess: '文件数量必须大于 <b>{n}</b> {files} ，请重新上传！',
            msgFilesTooMany: '额，你选了 <b>({n})</b> 张图片，但是呢，我设置的最多传 <b>{m}</b>张. 少来几张喽!',
            msgFileNotFound: '文件 "{name}" 未找到!',
            msgFileSecured: 'Security restrictions prevent reading the file "{name}".',
            msgFileNotReadable: 'File "{name}" is not readable.',
            msgFilePreviewAborted: 'File preview aborted for "{name}".',
            msgFilePreviewError: 'An error occurred while reading the file "{name}".',
            msgInvalidFileType: '文件无效 "{name}". 只能上传 "{types}" 类型的图片.',
            msgInvalidFileExtension: '文件无效 "{name}". 只能上传 "{extensions}" 类型的图片.',
            msgValidationError: '文件上传错误',
            msgLoading: '正在上传 {index} of {files} &hellip;',
            msgProgress: '正在上传 {index} of {files} - {name} - {percent}% 已传.',
            msgSelected: '选中{n}个文件',
            msgFoldersNotAllowed: 'Drag & drop files only! {n} folder(s) dropped were skipped.',
            dropZoneTitle: '对,就是下面,点一下就能上传。也可以直接把图片们拖进来'
    };

    $.extend($.fn.fileinput.defaults, $.fn.fileinput.locales.es);
})(window.jQuery);
