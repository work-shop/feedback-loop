'use strict';

const errorChecks = [

    // TODO: Add XSS and SQL Injection Guards here?

    function emptyText( content ) { return {
        error: content.maybeResponse.length === 0,
        message: 'Whoops! Looks like you haven\'t entered a response yet.',
        priority: 0
    }; },

    function emptyName( content ) { return {
        error: content.maybeName.length === 0,
        message: 'Whoops! Looks like you haven\'t entered a name.',
        priority: 1
    };},

    function emptyEmail( content ) {return {
        error: content.maybeEmail.length === 0,
        message: 'Whoops! Looks like you haven\'t added your email.',
        priority: 1
    };}

    // TODO: Add softer guards (length, email checks) here, with

];

function initialErrorState() {
    return {
        error: false,
        blame: []
    };
}

function gatherErrors( content ) {
    return errorChecks.reduce( function( errorState, currentCheck ) {

        let checkResult = currentCheck( content );

        if ( checkResult.error ) {

            return {
                error: true,
                blame: errorState.blame.concat( checkResult )
            };

        } else {

            return errorState;

        }

    }, initialErrorState() );

}

/**
 * `getPriorityErrors` takes an error aggregate, including an {error: Bool} and
 * {blame: Array} key, and generates selects out the most important errors to
 * display, accoding to the priority on defined in the error tests in this file.
 *
 * Note that error tests that generate a lower priority error are rendered first.
 */

// NOTE: assumes the array of errors is a ascending-sorted partially-ordered set in the priority key.

function getPriorityErrors( errors ) {
    if ( errors.blame.length === 0 ) { throw new Error('getLowestPriorityErrors received an empty error array!'); }

    console.log( errors );

    let priority = errors.blame[0].priority; // gauranteed to exist at this point.

    return errors.blame.filter( function( error ) { return error.priority === priority; });

}

export { gatherErrors, getPriorityErrors };
