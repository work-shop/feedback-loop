'use strict';

const WPAPI = require('wpapi');
const rest_endpoint = 'http://localhost:8080/wp-json/';

class WPRequestManager {

    constructor() {
        console.log( 'WPRequestManager constructor invoked!' );
        this.wp = new WPAPI({ endpoint: rest_endpoint });
    }

    submitRequest( content ) {
        console.log('submitRequest invoked!');
        console.log('Assumption: at this stage the email, name, and response are all wellformed.');
        this.wp.comments().create({
            post: 43,
            author_email: content.maybeEmail,
            author_name: content.maybeName,
            content: content.maybeResponse
        }).then(function( response ) {

            console.log( response );

        }).catch(function( error ){

            console.error( error );

        });
    }

}

export { WPRequestManager };
