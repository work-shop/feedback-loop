'use strict';

import { uiErrorChecks, apiErrorChecks } from './submission-error-types.js';

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

function getPriorityErrors( errors ) {
    if ( errors.blame.length === 0 ) { throw new Error('getPriorityErrors received an empty error array!'); }

    console.log( errors );

    let priority = errors.blame[0].priority; // gauranteed to exist at this point.

    return errors.blame.filter( function( error ) { return error.priority === priority; });

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
    constructor() {
        this.errorPaneSelector = '#error-pane';
        this.errorPaneHeadingSelector = '#error-pane .error-header';
        this.errorPaneTextSelector = '#error-pane .error-text';
        this.errorPaneCloseButtonSelector = '#error-pane .error-pane-close-button';
        this.errableElements = ['#feedback-input-textarea', '#feedback-input-name', '#feedback-input-email'];
        this.errorTimeout = 120000;
        this.timeout = null;

        $( this.errorPaneCloseButtonSelector ).on('click', this.hideErrorBox.bind( this ) );
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
            return getPriorityErrors( errors );
        } else {
            return [];
        }

    }


    /**
     * This function displays the highest priority ui error
     * in the error box.
     */
    renderUIErrors( errors ) {
        console.log( errors );
        this.displayErrorBox( errors[0] );
    }


    /**
     * This function displays the api error that wordpress returned
     * in the error box.
     */
    renderAPIErrors( error ){
        console.log( error );
        this.displayErrorBox( apiErrorChecks[ error.message ] );
    }

    /**
     * This function handles displaying the error box,
     * and populating it with the appropriate text that
     * communicates the error.
     */
    displayErrorBox( error ) {

        let pane = $( this.errorPaneSelector );
        let text = $( this.errorPaneTextSelector );

        this.errableElements.forEach( function( selector ) { $( selector ).removeClass(erroredClassName);});

        text.text( error.message );
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
