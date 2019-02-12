'use strict';

const WPAPI = require('wpapi');
const rest_endpoint = 'http://localhost:8080/wp-json/';

class WPRequestManager {

    constructor( errorsManager, successManager ) {
        console.log( 'WPRequestManager constructor invoked!' );
        this.wp = new WPAPI({ endpoint: rest_endpoint });
        this.errorsManager = errorsManager;
        this.successManager = successManager;
    }

    getPromptId() {
        return parseInt( $('#feedback').data('prompt-id'));
    }

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
