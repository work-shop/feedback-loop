'use strict';

const WPAPI = require('wpapi');
const rest_endpoint = 'http://localhost:8080/wp-json/';
const username = 'dev';
const password = 'Cmi!!2012'


class WPRequestManager {

    constructor() {
        console.log( 'WPRequestManager constructor invoked!' );
        this.wp = new WPAPI({
            endpoint: rest_endpoint,
            username: username,
            password: password
        });
    }

    submitRequest( content ) {
        console.log('submitRequest invoked!');
        console.log('Assumption: at this stage the email, name, and response are all wellformed.');
        this.wp.comments().create({
            post: 43,
            author_email: content.maybeEmail,
            author_name: content.maybeName,
            content: content.maybeResponse
        }).then(function( createdAComment ) {

            console.log( createdAComment );

        }).catch(function( error ){

            console.error( error );

        });
    }

}

export { WPRequestManager };
