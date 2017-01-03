/* global $, document, kendo */

$(document).ready(() => {
  kendo.pdf.defineFont({
    // 'Josefin Sans': 'http://mironidis.com/dojo/fonts/Josefin_Sans/JosefinSans-Regular.ttf',
    // 'Josefin Sans|Bold': 'fonts/Josefin_Sans/JosefinSans-Bold.ttf',
    'FontAwesome': 'http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/fonts/fontawesome-webfont.ttf',
  });

  $('.print').click(() => {
    $('body').addClass('size-a4');
    kendo.drawing.drawDOM($('body'))
    .then((group) => kendo.drawing.exportPDF(group, {
      paperSize: 'auto',
      margin: { top: 0, left: 0, right: 0, bottom: 0 },
      multiPage: true,
    }))
    .done((data) => {
      $('body').removeClass('size-a4');
      kendo.saveAs({
        dataURI: data,
        fileName: 'MironidisTheodorosCV.pdf',
        proxyURL: '//demos.telerik.com/kendo-ui/service/export',
      });
    });
  });
});
