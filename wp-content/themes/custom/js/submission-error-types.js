'use strict';

const uiErrorChecks = [

    // TODO: Add XSS and SQL Injection Guards here?

    function emptyText( content ) { return {
        error: content.maybeResponse.length === 0,
        message: 'Looks like you haven\'t entered a response yet.',
        priority: 0,
        target: '#feedback-input-textarea',
        active: true
    }; },

    // NOTE: This rule is commented out, as we're not requiring individuals to
    // submit their names or emails, unless they want to.
    // function emptyName( content ) { return {
    //     error: content.maybeName.length === 0,
    //     message: 'Looks like you haven\'t entered a name.',
    //     priority: 1,
    //     target: '#feedback-input-name',
    //     active: false
    // };},

    // NOTE: This rule is commented out, as we're not requiring individuals to
    // submit their names or emails, unless they want to.
    // function emptyEmail( content ) {return {
    //     error: content.maybeEmail.length === 0,
    //     message: 'Looks like you haven\'t added your email.',
    //     priority: 1,
    //     target: '#feedback-input-email',
    //     active: false
    // };}

    // TODO: Add softer guards (length, email checks) here, with

];

const apiErrorChecks = {

    'Invalid parameter(s): author_email': {
        message: 'Looks like you mis-entered your email address below!',
        priority: 1,
        target: '#feedback-input-email'
    },

    'Creating a comment requires valid author name and email values.': {
        message: 'Looks like you\'re missing a name an email!',
        priority: 1,
        target: '#feedback-input-name, #feedback-input-email'
    },

    'Duplicate comment detected; it looks as though you&#8217;ve already said that!': {
        message: 'Looks like this bit of feedback was already posted!',
        priority: 1,
        target: '#feedback-input-textarea'
    }
};


export { uiErrorChecks, apiErrorChecks };