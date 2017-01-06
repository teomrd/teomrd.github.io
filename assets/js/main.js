/* global $, document, kendo */

$(document).ready(() => {
  kendo.pdf.defineFont({
    'Josefin Sans': '/assets/fonts/Josefin_Sans/JosefinSans-Regular.ttf',
    'Josefin Sans|Bold': '/assets/fonts/Josefin_Sans/JosefinSans-Bold.ttf',
    'Josefin Sans|Italic': '/assets/fonts/Josefin_Sans/JosefinSans-Italic.ttf',
    'Josefin Sans|Bold|Italic': '/assets/fonts/Josefin_Sans/JosefinSans-BoldItalic.ttf',
    'Material Icons': '/assets/fonts/Material_Icons/MaterialIcons-Regular.ttf',
  });

  $('.print').click(() => {
    $('body').addClass('size-a4');
    kendo.drawing.drawDOM($('body'))
    .then((group) => kendo.drawing.exportPDF(group, {
      title: 'Mironidis Theodoros CV',
      author: 'Mironidis Theodoros',
      keywords: 'teomrd, Mironidis, mironidis.gr',
      creator: 'teomrd',
      paperSize: 'auto',
      margin: { top: 0, left: 0, right: 0, bottom: 0 },
    }))
    .done((data) => {
      $('body').removeClass('size-a4');
      kendo.saveAs({
        dataURI: data,
        fileName: 'MironidisTheodorosCV.pdf',
        function() {
          console.log('komple');
        },
      });
    });
  });
});
