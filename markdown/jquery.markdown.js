/*jshint smarttabs:true*/

/*
 * jquery.markdown.js
 *
 * Author: Andrew Preston | preston.co.nz
 *
 * Extends the stackoverflow markdown editor [1] to work as a jQuery
 * plugin [2].
 *
 * [1] http://code.google.com/p/pagedown/
 * [2] http://docs.jquery.com/Plugins/Authoring
 */

;(function($) {
    'use strict';

    var idCounter = 0;

    var methods = {
	init : function(options) {
	    return this.each(function(index) {
		var elem = $(this); // equivalent: this.eq(index);

		var defaults = {
		    'buttons'      : null,
		    'textarea'     : null,
		    'preview'      : null,
		    'buttonClass'  : 'markdown-buttons',
		    'textareaClass': 'markdown-editor',
		    'previewClass' : 'markdown-preview'
		};

		var settings = $.extend({}, defaults, options);

		/*
		 * Initialize the markdown editor if one is not
		 * already attached to elem:
		 *   1) find (or create) textarea, button, and preview children
		 *   2) instantiate a new editor
		 *   3) attach to elem as .data()
		 */
		if (!elem.data('markdown')) {

		    // 1) Find/create required elements
		    var textarea = settings.textarea || elem.find( '.'+settings.textareaClass );
		    var buttons  = settings.button   || elem.find( '.'+settings.buttonClass );
		    var preview  = settings.preview  || elem.find( '.'+settings.previewClass );

		    if (!textarea.length) {
			textarea = $('<textarea/>', {
			    class: settings.textareaClass,
			    id   : settings.textareaClass + idCounter++
			});
			elem.append(textarea);
		    }

		    if (!buttons.length) {
			buttons  = $('<div/>', {
			    class: settings.buttonClass,
			    id   : settings.buttonClass + idCounter++
			}).insertBefore(textarea);
		    }

		    if (!preview.length) {
			preview  = $('<div/>', {
			    class: settings.previewClass,
			    id   : settings.previewClass + idCounter++
			}).insertAfter(textarea);
		    }

		    // 2) Create the editor!
		    var converter = Markdown.getSanitizingConverter();
		    var editor    = new Markdown.Editor(
			converter,
			buttons.attr('id'),
			textarea.attr('id'),
			preview.attr('id')
		    );
		    editor.run();

		    // 3) Attach editor to the DOM
		    elem.data('markdown', {
			target   : elem,
			settings : settings,
			editor   : editor
		    });
		}
	    }); },

	refreshPreview : function() {
	    return this.each(function() {
		var elem   = $(this);
		var editor = elem.data('markdown').editor;
		editor.refreshPreview();
	    }); }
    };

    $.fn.markdown = function(method) {
	if (methods[method]) {
	    return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
	} else if (typeof method === 'object' || !method) {
	    return methods.init.apply(this, arguments);
	} else {
	    $.error('Method ' + method + ' is not defined for jQuery.markdown');
	}
    };

})(jQuery);

// $(document).ready(function() {
//     /*
//      * Init an editor on every .markdown-input in the DOM
//      */
//     $( ".markdown-input" ).markdown();
// });