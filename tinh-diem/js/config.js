/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function (config) {
    // Define changes to default configuration here. For example:
    // config.language = 'fr';
    // config.uiColor = '#AADC6E';
    config.extraPlugins = 'youtube,uploadimage,mathjax,html5audio,ckeditor_wiris,videojs,ckeditorfa,ckeditor-gwf-plugin,wordcount,';
    config.mathJaxClass = 'my-math';
    config.mathJaxLib = '/statics/plugins/ckeditor/plugins/MathJax2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML';
    config.youtube_related = true;
    config.youtube_width = '300';
    config.youtube_height = '250';
    config.youtube_privacy = false;
    config.youtube_older = false;
    config.tabSpaces = 6;
    config.baseFloatZIndex = 999999999;
    config.removePlugins = 'iframe';
    config.allowedContent = true;
    config.fontSize_sizes = '8/8px;9/9px;10/10px;11/11px;12/12px;13/13px;14/14px;15/15px;16/16px;17/17px;18/18px;19/19px;20/20px;24/24px;28/28px;32/32px;36/36px;48/48px;72/72px;';
    config.font_names = 'Arial/Arial, Helvetica, sans-serif;' +
        'Comic Sans MS/Comic Sans MS, cursive;' +
        'Courier New/Courier New, Courier, monospace;' +
        'Georgia/Georgia, serif;' +
        'Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;' +
        'Tahoma/Tahoma, Geneva, sans-serif;' +
        'Times New Roman/Times New Roman, Times, serif;' +
        'Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;' +
        'Verdana/Verdana, Geneva, sans-serif;' +
        'Mincho/mincho;' +
        'UTM Avo/UTM Avo;' +
        'UsherWoodStd;' +
        'GoogleWebFonts;'
    config.disallowedContent = 'script; *[on*]';
    config.contentsCss = '/statics/fonts/font-awesome/css/fontawesome-all.min.css';
};

CKEDITOR.dtd.$removeEmpty['span'] = false;
CKEDITOR.timestamp = '1.2.7';