'use strict';

const uiErrorChecks = [

    // TODO: Add XSS and SQL Injection Guards here?

    function emptyText( content ) { return {
        error: content.maybeResponse.length === 0,
        message: 'Looks like you haven\'t entered a response yet.',
        priority: 0,
        target: '#feedback-input-textarea'
    }; },

    function emptyName( content ) { return {
        error: content.maybeName.length === 0,
        message: 'Looks like you haven\'t entered a name.',
        priority: 1,
        target: '#feedback-input-name'
    };},

    function emptyEmail( content ) {return {
        error: content.maybeEmail.length === 0,
        message: 'Looks like you haven\'t added your email.',
        priority: 1,
        target: '#feedback-input-email'
    };}

    // TODO: Add softer guards (length, email checks) here, with

];

const apiErrorChecks = {
    'Invalid parameter(s): author_email': {
        message: 'Looks like you mis-entered your email address below!',
        priority: 1,
        target: '#feedback-input-email'
    }
};


export { uiErrorChecks, apiErrorChecks };
