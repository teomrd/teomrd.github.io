/* global $, document, kendo */

$(document).ready(() => {
  kendo.pdf.defineFont({
    'Open Sans': 'plugins/fonts/fonts-open-sans/OpenSans-Regular.ttf',
    'FontAwesome': 'http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/fonts/fontawesome-webfont.ttf',
  });

  $('.print').click(() => {
    kendo.drawing.drawDOM($('body'))
    .then((group) => kendo.drawing.exportPDF(group, {
      paperSize: 'auto',
      margin: { left: '1cm', top: '1cm', right: '1cm', bottom: '1cm' },
    }))
    .done((data) => {
      kendo.saveAs({
        dataURI: data,
        fileName: 'MironidisTheodorosCV.pdf',
        proxyURL: '//demos.telerik.com/kendo-ui/service/export',
      });
    });
  });
});
