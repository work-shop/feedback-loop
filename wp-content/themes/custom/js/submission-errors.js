'use strict';

import { uiErrorChecks, apiErrorChecks } from './submission-error-types.js';


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


class SubmissionErrors {

    constructor() {
        this.errorPaneSelector = '#error-pane';
        this.errorPaneHeadingSelector = '#error-pane .error-header';
        this.errorPaneTextSelector = '#error-pane .error-text';
        this.errorPaneCloseButtonSelector = '#error-pane .error-pane-close-button';
        this.errableElements = ['#feedback-input-textarea', '#feedback-input-name', '#feedback-input-email'];

        $( this.errorPaneCloseButtonSelector ).on('click', this.hideErrorBox.bind( this ) );
    }

    initialErrorState() {
        return {
            error: false,
            blame: []
        };
    }

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

        }, this.initialErrorState() );

        if ( errors.error ) {
            return getPriorityErrors( errors );
        } else {
            return [];
        }

    }

    renderUIErrors( errors ) {
        console.log( errors );
        this.displayErrorBox( errors[0] );
    }

    renderAPIErrors( error ){
        console.log( error );
        this.displayErrorBox( apiErrorChecks[ error.message ] );
    }

    displayErrorBox( error ) {

        let pane = $( this.errorPaneSelector );
        let text = $( this.errorPaneTextSelector );

        this.errableElements.forEach( function( selector ) { $( selector ).removeClass(erroredClassName);});

        text.text( error.message );
        pane.removeClass(inactiveClassName).addClass(activeClassName);
        $( error.target ).addClass(erroredClassName);

    }

    hideErrorBox() {

        let pane = $( this.errorPaneSelector );
        let text = $( this.errorPaneTextSelector );

        this.errableElements.forEach( function( selector ) { $( selector ).removeClass(erroredClassName);});
        pane.removeClass(activeClassName).addClass(inactiveClassName);

        text.text( '' );

    }

}



export { SubmissionErrors };
