"use strict";
// Note: for add obj type prop in template, please return data instead of set them in template otherwise it won't work properly.
// e.g You have something like in your plugin: `<component-obj-prop :author="{name: 'Veronica', company: 'Veridian Dynamics'}"></component-obj-prop>`
// You should make template: `<component-obj-prop :author="myPluginData1.author"></component-obj-prop>`
// Then set myPluginData1.author = {name: 'Veronica', company: 'Veridian Dynamics'} and return {myPluginData1, myPluginData2 ... } in your plugin.
// See a example in `pluginEmbeddedMediaVideo` plugin below.
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_js_1 = require("@dpc-sdp/ripple-global/utils/helpers.js");
// Encode double quote before pass it into Vue template prop, otherwise it breaks the template.
const _escapeQuotes = text => {
    text = text || '';
    return text.replace('"', '&quot;');
};
const pluginButton = function () {
    // Button
    this.find('.button').map((i, el) => {
        const $button = this.find(el);
        const buttonHref = $button.attr('href');
        const buttonText = $button.text();
        const attributes = [];
        attributes.push(`:icon="false"`);
        if (buttonHref) {
            attributes.push(`link="${buttonHref}"`);
        }
        const button = `<vt-button ${attributes.join(' ')}>${buttonText}</vt-button>`;
        return $button.replaceWith(button);
    });
};
const pluginTables = function () {
    // Wrap tables with a div.
    this.find('table').map((i, el) => {
        const $table = this.find(el);
        return $table.wrap(`<div class="vt-markup__table"></div>`);
    });
};
const pluginEmbeddedDocument = function () {
    this.find('.embedded-entity--media--file, .embedded-entity--media--document, .embedded-entity .media--type-document').map((i, element) => {
        const el = this.find(element);
        const mediaType = el.hasClass('embedded-entity--media--file')
            ? 'file'
            : 'document';
        const titleSelector = mediaType === 'document' ? '.file--title' : '.field--name-name';
        const fileSizeSelector = '.file--size';
        let url = el.find('a').attr('href');
        const fileName = el.find(titleSelector).text();
        const fileSize = el.find(fileSizeSelector).text();
        const caption = el.find('figcaption').text();
        let fileType = '';
        const fileTypeClasses = el.find('.file').attr('class');
        // TODO - Add other icons for file types. Only PDF correctly displays.
        if (fileTypeClasses) {
            fileTypeClasses
                .split(' ')
                .filter(cls => cls.includes('file--mime') || cls.includes('file--x'))
                .forEach(mimeType => {
                if (fileType === '') {
                    switch (mimeType) {
                        case 'file--mime-application-zip':
                            fileType = 'zip';
                            break;
                        case 'file--mime-application-msword':
                            fileType = 'doc';
                            break;
                        case 'file--mime-application-postscript':
                            fileType = 'eps';
                            break;
                        case 'file--x-office-document':
                        case 'file--mime-application-rtf':
                        case 'file--mime-application-vnd-openxmlformats-officedocument-wordprocessingml-document':
                            fileType = 'docx';
                            break;
                        case 'file--x-office-spreadsheet':
                        case 'file--mime-application-vnd-ms-excel':
                            fileType = 'xlsx';
                            break;
                        case 'file--mime-text-plain':
                            fileType = 'txt';
                            break;
                        case 'file--mime-text-csv':
                            fileType = 'csv';
                            break;
                        case 'file--mime-text-calendar':
                            fileType = 'ics';
                            break;
                        case 'file--mime-application-pdf':
                            fileType = 'pdf';
                            break;
                    }
                }
            });
        }
        if (url) {
            url = url.replace(/^.*\/\/[^/]+/, '');
        }
        if (fileType === '') {
            fileType = el
                .find('.file--type')
                .text()
                .toLowerCase();
        }
        if (url && fileName && fileSize && fileType) {
            const name = _escapeQuotes(fileName);
            const extension = fileType;
            const filesize = fileSize;
            const ariaLabel = `${name} File type: ${extension}. Size: ${filesize}`;
            const supportedIcons = [
                'ai',
                'csv',
                'doc',
                'docx',
                'dot',
                'dotm',
                'dotx',
                'eps',
                'ics',
                'indd',
                'pdf',
                'ppt',
                'pptx',
                'tif',
                'txt',
                'xls',
                'xlsx',
                'zip'
            ];
            const icon = supportedIcons.indexOf(fileType) >= 0 ? fileType : 'document';
            const isExternalLink = !helpers_js_1.isRelativeUrl(url);
            let documentlink = `
      <figure class="vt-markup__document-link">
        <vt-link class="vt-markup__document-link-link" aria-label="${ariaLabel}" link="${url}" :icon="false" :underline="false" download="${isExternalLink ? 'false' : ''}" target="_blank">
          ${icon
                ? `<svg-icon role="presentation" class="vt-markup__document-link-icon" name="${icon}" width="30px" height="30px"></svg-icon>`
                : ''}
          <div class="vt-markup__document-link-info">
            <span class="vt-markup__document-link-title">${name}</span>
            <div class="vt-markup__document-link-meta">
              ${extension
                ? `<span class="vt-markup__document-link-type">${extension}</span>`
                : ''}
              ${filesize
                ? `<span class="vt-markup__document-link-size${extension && filesize
                    ? ' vt-markup__document-link-size--seperator'
                    : ''}">${filesize}</span>`
                : ''}
            </div>
          </div>
        </vt-link>
        ${caption
                ? `<figcaption class="vt-markup__document-link-caption">${_escapeQuotes(caption)}</figcaption>`
                : ''}
      </figure>
      `;
            return el.replaceWith(documentlink);
        }
        return el;
    });
};
// const parseForLinks = function () {
//   // Give h2 headings an id so they can be linked to
//   this.find('h2').map((i, element) => {
//     const el = this.find(element)
//     const idName = el.text()
//     return el.attr('id', idName)
//   })
// }
const pluginImage = function () {
    // wrap iframes
    this.find('.embedded-entity--media--image').map((i, el) => {
        const $container = this.find(el);
        if ($container) {
            const $img = $container.find('img');
            const height = $img.attr('height');
            const src = $img.attr('src');
            const alt = $img.attr('alt');
            return $container.replaceWith(`<div class="vt-markup__image"><vt-responsive-img src="${src}" alt="${alt}" :height="${height}" fit="contain" :blur="true" :srcset="[375, 696, 696, 1200]" width="818" ></vt-responsive-img></div>`);
        }
    });
};
const pluginIframe = function () {
    // wrap iframes
    this.find('iframe').map((i, el) => {
        const $iframe = this.find(el);
        if ($iframe.hasClass('vt-markup__embedded-video-frame') !== true) {
            return $iframe.wrap(`<div class="vt-markup__iframe-container"></div>`);
        }
    });
};
const pluginEmbeddedMediaVideo = function () {
    // wrap iframes
    this.find('.embedded-entity--media--embedded-video').map((i, el) => {
        // Component data
        const element = this.find(el);
        const iframe = element.find('iframe');
        const height = iframe.attr('height');
        const width = iframe.attr('width');
        const src = iframe.attr('src');
        const figcaption = element.find('figcaption');
        const transcript = figcaption ? figcaption.text() : null;
        const link = element.find('.field--name-field-media-link a');
        // For Obj type props, using data to pass value to avoid HTML syntax and encoding issue.
        const mediaLink = link
            ? { text: link.text(), url: link.attr('href') }
            : null;
        const variant = mediaLink ? 'link' : 'full';
        let html = `
    <div class="vt-markup__embedded-video">
      <div class="vt-markup__embedded-video-iframe-container">
        <iframe class="vt-markup__embedded-video-frame" width="${width}" height="${height}" src="${src}" allowfullscreen></iframe>
      </div>
    `;
        if (variant === 'link') {
            html += `
      <div class="vt-markup__embedded-video-link">
        <vt-link link="${mediaLink.url}" :icon="false">${mediaLink.text}</vt-link>
      </div>
      `;
        }
        if (variant === 'full' || transcript) {
            html += `<div class="vt-markup__embedded-video-transcript">${transcript}</div>`;
        }
        html += `</div>`;
        return element.replaceWith(html);
    });
};
const pluginLinks = function () {
    this.find('a').map((i, el) => {
        const $a = this.find(el);
        const href = $a.attr('href');
        const isRelative = helpers_js_1.isRelativeUrl(href);
        const text = $a.text();
        const target = $a.attr('target');
        const attributes = [];
        attributes.push(!isRelative ? `icon="external"` : `:icon="false"`);
        if (href) {
            attributes.push(`link="${href}"`);
        }
        if (target) {
            attributes.push(`target="${target}"`);
        }
        let a = `<vt-link ${attributes.join(' ')}>${_escapeQuotes(text)}</vt-link>`;
        return $a.replaceWith(a);
    });
};
exports.default = [
    pluginButton,
    pluginEmbeddedDocument,
    pluginEmbeddedMediaVideo,
    pluginIframe,
    pluginImage,
    pluginLinks,
    pluginTables
];
