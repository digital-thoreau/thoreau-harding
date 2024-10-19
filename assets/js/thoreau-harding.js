/**
 * Thoreau Harding Javascript.
 *
 * Implements better handling of Walter Harding comments on the Digital Thoreau Website site.
 *
 * @package Thoreau_Harding
 */

/**
 * Create Thoreau Harding object.
 *
 * This works as a "namespace" of sorts, allowing us to hang properties, methods
 * and "sub-namespaces" from it.
 */
var Thoreau_Harding = Thoreau_Harding || {};

/**
 * Set up Thoreau Harding when the page is ready.
 *
 * @since 1.0
 */
jQuery(document).ready( function($) {

	/**
	 * Create Thoreau Harding Comments Object.
	 *
	 * @since 1.0
	 */
	Thoreau_Harding.comments = new function() {

		// Prevent collisions.
		var me = this;

		/**
		 * Initialise Thoreau Harding.
		 *
		 * This method should only be called once.
		 *
		 * @since 1.0
		 */
		this.init = function() {

		};

		/**
		 * Do setup when jQuery reports that the DOM is ready.
		 *
		 * This method should only be called once.
		 *
		 * @since 1.0
		 */
		this.dom_ready = function() {

			// Enable listeners.
			me.listeners();

		};

		/**
		 * Initialise listeners.
		 *
		 * This method should only be called once.
		 *
		 * @since 1.0
		 */
		this.listeners = function() {

			/**
			 * Rolling onto a Walter Harding comment.
			 *
			 * @since 1.0
			 *
			 * @param {Object} event The rolled-over object.
			 */
			$('#comments_sidebar').on( 'mouseenter', '.comment-wrapper', function( event ) {

				// Define vars.
				var element = $(this);

				// Does the parent <li> have the identifying class?
				if ( element.parent().hasClass( 'comment-author-walterharding' ) ) {

					// Call highlight method for this element.
					me.highlight_text( element );

				}

			});

			/**
			 * Rolling off a Walter Harding comment.
			 *
			 * @since 1.0
			 *
			 * @param {Object} event The rolled-off object.
			 */
			$('#comments_sidebar').on( 'mouseleave', '.comment-wrapper', function( event ) {

				// Define vars.
				var element = $(this);

				// Does the parent <li> have the identifying class?
				if ( element.parent().hasClass( 'comment-author-walterharding' ) ) {

					// Clear all highlights.
					me.unhighlight_text();

				}

			});

		};

		/**
		 * Highlight the matched text in the body of the page.
		 *
		 * @since 1.0
		 *
		 * @param {Object} element The element containing the matched text.
		 */
		this.highlight_text = function( element ) {

			// Define vars.
			var text, match_text, para_text,
				text_sig, textblock_id,
				item, start, end;

			// Bail if we have no text to match.
			text = element.find( 'strong' );
			if ( ! text.length ) {
				return;
			}

			// Get matched text wrapped in <strong> tag.
			match_text = text.html().replace( /[\[\]']+/g,'' );

			// Find the paragraph's text sig.
			text_sig = element.closest( '.paragraph_wrapper' ).prop( 'id' ).split( '-' )[1];

			// Bail if it's a "whole page" comment.
			if ( 'undefined' === typeof text_sig || text_sig == '' ) {
				return;
			}

			// Construct textblock ID.
			textblock_id = 'textblock-' + text_sig;

			// Target para.
			para_text = $('#' + textblock_id).text();

			// Get start.
			start = para_text.indexOf( match_text );

			// If we can't find the text.
			if ( start === -1 ) {

				// Trace.
				me.debug( 'Could not find text:', match_text );

				// Try removing fancy quotes from para text and match text.
				para_text = para_text.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');
				match_text = match_text.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');

				// Get start.
				start = para_text.indexOf( match_text );

				// If we can't find the text.
				if ( start === -1 ) {

					// Trace.
					me.debug( 'Could not find un-smartened text:', match_text );

					// Try making para text and match text lowercase.
					para_text = para_text.toLowerCase();
					match_text = match_text.toLowerCase();

					// Get start.
					start = para_text.indexOf( match_text );

					// Tf we can't find the text.
					if ( start === -1 ) {

						// Trace.
						me.debug( 'Could not find lowercase text:', match_text );

						// Try replacing various words in para text and match text.
						para_text = para_text.replace(/traveling/g, "travelling")
											 .replace(/&amp;/g, "&");
						match_text = match_text.replace(/traveling/g, "travelling")
											   .replace(/&amp;/g, "&");

						// Get start.
						start = para_text.indexOf( match_text );

						// If we can't find the text.
						if ( start === -1 ) {

							// trace
							me.debug( 'Could not find word-replaced text:', match_text );

							// Strip tags.
							match_text = $(match_text).text();

							// Get start.
							start = para_text.indexOf( match_text );

							// If we find the text, return adjusted start value.
							if ( start === -1 ) {

								// Trace.
								me.debug( 'Could not find tags-stripped text:', match_text );

								// Try removing the last character, which is often punctuation.
								match_text = match_text.substr( 0, match_text.length - 1 );

								// Get start.
								start = para_text.indexOf( match_text );

								// If we can't find the text.
								if ( start === -1 ) {

									// Trace.
									me.debug( 'Could not find shortened text:', match_text );

									// If all of this fails, bail.
									return;

								}

							}

						}

					}

				}

			}

			// Find end.
			end = start + match_text.length;

			// Construct item.
			item = { start: start, end: end };

			// Highlight the match using CommentPress.texthighlighter.
			CommentPress.texthighlighter.utilities.selection_restore( document.getElementById( textblock_id ), item );
			$('#' + textblock_id).wrapSelection({fitToWord: false}).addClass( 'inline-highlight-per-comment' );

		};

		/**
		 * Unhighlight all matched text in the body of the page.
		 *
		 * @since 1.0
		 *
		 * @param {Object} element The element.
		 */
		this.unhighlight_text = function( element ) {

			// Clear all highlights.
			CommentPress.texthighlighter.textblocks.highlights_clear_for_comment();

		};

		/**
		 * Debugging.
		 *
		 * @since 1.0
		 *
		 * @param {String} message The message to display.
		 * @param {Mixed} variable The variable to display.
		 */
		this.debug = function( message, variable ) {
			if ( console && console.log ) {
				console.log( message, variable );
			}
		};

	};

	// Init comment-handler.
	Thoreau_Harding.comments.init();

});


/**
 * Trigger dom_ready methods where necessary.
 *
 * @since 1.0
 */
jQuery(document).ready(function($) {

	// The DOM is loaded now.
	Thoreau_Harding.comments.dom_ready();

});
