#jQuery Markdown#

Extends the [stacakoverflow markdown editor][1] to work as a jQuery plugin.

##Usage##

Include scripts in your html file:

      <script type="text/javascript" src="http://code.jquery.com/jquery-1.7.2.min.js"></script>
      <script type="text/javascript" src="../markdown/Markdown.Converter.js"></script>
      <script type="text/javascript" src="../markdown/Markdown.Sanitizer.js"></script>
      <script type="text/javascript" src="../markdown/Markdown.Editor.js"></script>
      <script type="text/javascript" src="../markdown/jquery.markdown.js"></script>

Add a markdown holder:

      <div class="markdown-input"></div>

Initialize the editor:

      $(document).ready(function() {
            $( ".markdown-input" ).markdown();
      });

##Options##

The editor can use the DOM elements you pass to it instead of initializing new ones:

      $( ".markdown-input" ).markdown({
            'buttonClass'  : $( '#markdown-buttons' ),
            'textareaClass': $( '#markdown-editor' ),
            'previewClass' : $( 'markdown-preview' )
      });




  [1]: http://code.google.com/p/pagedown/