jQuery(document).ready(function() {
    
    var colorsN2 = ['red', 'green', 'blue', 'yellow'];
    var currentColorN2 = 0;
    jQuery('#demoN2').click(function() {
        new jBox('Notice', {
            animation: 'flip',
            position: {
                x: 15,
                y: 65
            },
            content: 'Oooh! They also come in colors!',
            onInit: function() {
                this.options.color = colorsN2[currentColorN2];
                currentColorN2++; (currentColorN2 >= colorsN2.length) && (currentColorN2 = 0)
            },
            zIndex: 12000
        })
    });
	
	
    var colorsN3 = ['red', 'green', 'blue', 'yellow'];
    var titlesN3 = ['Oops', 'Well done', 'Reminder', 'Attention'];
    var contentsN3 = ['Sorry, something went wrong', 'You perfectly clicked a button', 'Don\'t forget to click the button one more time', 'Take care out there'];
    var currentColorN3 = 0;
    jQuery('#graph').click(function() {
        new jBox('Notice', {
            attributes: {
                x: 'right',
                y: 'top'
            },
            theme: 'NoticeBorder',
            color: 'black',
            animation: {
                open: 'slide:top',
                close: 'slide:right'
            },
            onInit: function() {
                this.options.color = colorsN3[currentColorN3];
                this.options.title = titlesN3[currentColorN3];
                this.options.content = contentsN3[currentColorN3];
                currentColorN3++; (currentColorN3 >= colorsN3.length) && (currentColorN3 = 0)
            },
        })
    });
});