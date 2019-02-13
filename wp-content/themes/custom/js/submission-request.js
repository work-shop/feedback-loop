'use strict';

const WPAPI = require('wpapi');
const rest_endpoint = 'http://feedbackloop.kinsta.cloud/wp-json/';

class WPRequestManager {

    /**
     * The WPRequestManager manager class handles submitting requests to
     * the WP API, and dispatching success or error responses off to the
     * classes that manage those funtions.
     */
    constructor( errorsManager, successManager, inputSelectors ) {
        this.wp = new WPAPI({ endpoint: rest_endpoint });
        this.errorsManager = errorsManager;
        this.successManager = successManager;
        this.inputSelectors = inputSelectors;
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

        console.log('submitRequest invoked!');
        console.log('Assumption: at this stage the email, name, and response are all wellformed.');

        self.wp.comments().create({

            post: self.getPromptId(),
            author_email: content.maybeEmail,
            author_name: content.maybeName,
            content: content.maybeResponse

        }).then(( response ) => {

            self.successManager.renderSuccess( response );

        }).catch(( error ) => {

            self.errorsManager.renderAPIErrors( error );

        });
    }

}

export { WPRequestManager };
