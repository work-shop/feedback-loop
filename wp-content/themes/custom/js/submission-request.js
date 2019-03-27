'use strict';

const WPAPI = require('wpapi');
const rest_endpoint = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/wp-json';

class WPRequestManager {

    /**
     * The WPRequestManager manager class handles submitting requests to
     * the WP API, and dispatching success or error responses off to the
     * classes that manage those funtions.
     */
    constructor( errorsManager, successManager, inputSelectors, analytics ) {
        this.wp = new WPAPI({ endpoint: rest_endpoint });
        this.errorsManager = errorsManager;
        this.successManager = successManager;
        this.inputSelectors = inputSelectors;
        this.analytics = analytics;
    }


    /**
     * A simple method to extract the wordpress id of this particular
     * prompt. We render this to an element on the dom at php-time.
     */
    getPromptId() {
        return parseInt( $('#feedback').data('prompt-id'));
    }

    /**
     * This method handles hiding error boxes, and submitting the comment
     * to the API. When the response comes back, this routine handles
     * submitting the response to the appropriate managing class.
     */
    submitRequest( content ) {

        var self = this;

        self.errorsManager.hideErrorBox();

        self.wp.comments().create({

            post: self.getPromptId(),
            author_email: content.maybeEmail,
            author_name: content.maybeName,
            content: content.maybeResponse,

        }).then(( response ) => {

            if ( content.maybeInstagram.length > 0 ) {

                $.ajax( {
                    type: 'POST',
                    url: rest_endpoint + '/feedback/v1/instagram/' + response.id + '/' + content.maybeInstagram,
                })
                .done( function( data ) {
                    console.log( data )

                    if ( data.success ) {

                        self.analytics.reportFormSubmissionSuccess( content );
                        self.successManager.renderSuccess( response );

                    } else {
                        self.errorsManager.renderAPIErrors( data );
                    }

                }).fail( function( xhr, status ) {

                    console.log( status )
                    self.errorsManager.renderAPIErrors( { message: status } );
                });

            } else {

                self.analytics.reportFormSubmissionSuccess( content );
                self.successManager.renderSuccess( response );

            }

        }).catch(( error ) => {

            self.errorsManager.renderAPIErrors( error );

        });
    }

}

export { WPRequestManager };
