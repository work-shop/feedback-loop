'use strict';


import { WPRequestManager } from './submission-request.js';
import { SubmissionErrors } from './submission-errors.js';
import { SubmissionSuccess } from './submission-success.js';

import { SubmissionAnalytics } from './submission-analytics.js';


/**
 * These selectors identify
 * the key input fields and submit buttons
 * in the DOM.
 */
const inputSelectors = {
    inputTextareaId: '#feedback-input-textarea',
    nameFieldId: '#feedback-input-name',
    emailFieldId: '#feedback-input-email',
    instagramFieldId: '#feedback-input-instagram',
    submitButtonId: '#feedback-input-submit',
};


/**
 * These placeholders will be instantiated with
 * the various classes that manage request and data flow
 * through the application.
 */
var requestManager = null;
var errorsManager = null;
var successManager = null;
var analytics = null;


/**
 * This is the primary trigger for the entire application. it handles
 * setting up the managing classes on the application, and setting up the
 * entrypoint handler on the request submission.
 */
function submissionWorkflow() {
    $( document ).ready( function() {

        analytics = new SubmissionAnalytics( gtag );
        errorsManager = new SubmissionErrors(inputSelectors, analytics);
        successManager = new SubmissionSuccess(inputSelectors, analytics);
        requestManager = new WPRequestManager(errorsManager, successManager, inputSelectors, analytics);

        $( inputSelectors.submitButtonId ).click( handleSubmitRequest );

    } );
}


/**
 * This function gathers content out of the form fields
 * and puts them into a useful object which we can use to
 * handle errors.
 */
function gatherContentFromForm() {
    return {
        maybeResponse: $( inputSelectors.inputTextareaId ).val(),
        maybeName: $( inputSelectors.nameFieldId ).val(),
        maybeEmail: $( inputSelectors.emailFieldId ).val(),
        maybeInstagram: $( inputSelectors.instagramFieldId ).val()
    };
}


/**
 * This function is the primary callback mounted on the submit button.
 * It gathers form content, detects UI-level errors and renders them,
 * or, if there are no UI-level errors, submits the request.
 */
function handleSubmitRequest() {
    let content = gatherContentFromForm();
    console.log( content );
    let errors = errorsManager.gatherUIErrors( content );

    if ( errors.length > 0) {

        errorsManager.renderUIErrors( errors );

    } else {

        requestManager.submitRequest( content );

    }

}


export { submissionWorkflow };
