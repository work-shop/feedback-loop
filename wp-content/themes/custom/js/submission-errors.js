'use strict';

import { uiErrorChecks, apiErrorChecks, defaultError } from './submission-error-types.js';

/**
 * These classes mark various ui states
 * on the application.
 */
const erroredClassName = 'errors';
const inactiveClassName = 'inactive';
const activeClassName = 'active';

/**
 * `getPriorityErrors` takes an error aggregate, including an {error: Bool} and
 * {blame: Array} key, and generates selects out the most important errors to
 * display, accoding to the priority on defined in the error tests in this file.
 *
 * Note that error tests that generate a lower priority error are rendered first.
 */

// NOTE: assumes the array of errors is a ascending-sorted partially-ordered set in the priority key.

function getPriorityErrors( errors, analytics ) {
    if ( errors.blame.length === 0 ) { throw new Error('getPriorityErrors received an empty error array!'); }

    let priority = errors.blame[0].priority; // gauranteed to exist at this point.

    let priority_errors = errors.blame.filter( function( error ) { return error.priority === priority; });

    analytics.reportFormSubmissionError( priority_errors[0] );

    return priority_errors;

}


/**
 * This method sets up a static initial state for the error
 * object which is constructed by this class during the
 * UI-error checking phase.
 */
function initialErrorState() {
    return {
        error: false,
        blame: []
    };
}


class SubmissionErrors {

    /**
     * The SubmissionErrors class is responsible for managing the error box, and
     * highlighting the various input fields that can be affected by various
     * errors that may come from the UI, or from the API.
     */
    constructor( inputSelectors, analytics ) {
        this.errorPaneSelector = '#error-pane';
        this.errorPaneHeadingSelector = '#error-pane .error-header';
        this.errorPaneTextSelector = '#error-pane .error-text';
        this.errorPaneCloseButtonSelector = '#error-pane .error-pane-close-button';
        this.errableElements = ['#feedback-input-textarea', '#feedback-input-name', '#feedback-input-email'];
        this.errorTimeout = 120000;
        this.timeout = null;
        this.analytics = analytics;

        $( this.errorPaneCloseButtonSelector ).click( this.hideErrorBox.bind( this ) );
    }


    /**
     * This routine loops through the set of possible UI-errors defined by
     * this application, and it checks to see whether any of the rules are
     * violated. If it finds errors, it renders the errors to the screen,
     * and prevents further propagation.
     */
    gatherUIErrors( content ) {
        let errors = uiErrorChecks.reduce( function( errorState, currentCheck ) {

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

        if ( errors.error ) {
            return getPriorityErrors( errors, this.analytics );
        } else {
            return [];
        }

    }


    /**
     * This function displays the highest priority ui error
     * in the error box.
     */
    renderUIErrors( errors ) {
        this.displayErrorBox( errors[0] );
    }


    /**
     * This function displays the api error that wordpress returned
     * in the error box.
     */
    renderAPIErrors( error ){

        const niceError = apiErrorChecks[ error.message ];

        if ( typeof niceError !== 'undefined' ) {
            this.analytics.reportFormSubmissionError( niceError );
            this.displayErrorBox( niceError );
        } else {
            let err = defaultError( error.message );
            this.analytics.reportFormSubmissionError( err );
            this.displayErrorBox( err );
        }

    }

    /**
     * This function handles displaying the error box,
     * and populating it with the appropriate text that
     * communicates the error.
     */
    displayErrorBox( error ) {

        var self = this;

        let pane = $( this.errorPaneSelector );
        let text = $( this.errorPaneTextSelector );

        this.errableElements.forEach( function( selector ) { $( selector ).removeClass(erroredClassName);});

        text.html( error.message );
        pane.removeClass(inactiveClassName).addClass(activeClassName);
        $( error.target ).addClass(erroredClassName);

        this.timeout = setTimeout( this.hideErrorBox.bind( this ), this.errorTimeout );

    }

    /**
     * This function dismisses the error box, and clears
     * any specific error indicators on the ui.
     */
    hideErrorBox() {

        if ( this.timeout !== null ) {
            clearTimeout( this.timeout );
            this.timeout = null;
        }

        let pane = $( this.errorPaneSelector );
        let text = $( this.errorPaneTextSelector );

        this.errableElements.forEach( function( selector ) { $( selector ).removeClass(erroredClassName);});
        pane.removeClass(activeClassName).addClass(inactiveClassName);

        text.text( '' );

    }

}



export { SubmissionErrors };
