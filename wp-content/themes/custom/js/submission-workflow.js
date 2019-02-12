'use strict';


import { WPRequestManager } from './submission-request.js';
import { SubmissionErrors } from './submission-errors.js';
import { SubmissionSuccess } from './submission-success.js';

const inputTextareaId = '#feedback-input-textarea';
const nameFieldId = '#feedback-input-name';
const emailFieldId = '#feedback-input-email';
const submitButtonId = '#feedback-input-submit';

var requestManager = null;
var errorsManager = null;
var successManager = null;

function submissionWorkflow() {
    $( document ).ready( function() {

        errorsManager = new SubmissionErrors();
        successManager = new SubmissionSuccess();
        requestManager = new WPRequestManager(errorsManager, successManager);

        $( submitButtonId ).on( 'click', handleSubmitRequest );
    } );
}

function gatherContentFromForm() {
    return {
        maybeResponse: $( inputTextareaId ).val(),
        maybeName: $( nameFieldId ).val(),
        maybeEmail: $( emailFieldId ).val()
    };
}

function handleSubmitRequest() {
    let content = gatherContentFromForm();
    let errors = errorsManager.gatherUIErrors( content );

    if ( errors.length > 0) {

        errorsManager.renderUIErrors( errors );

    } else {

        requestManager.submitRequest( content );

    }

}


export { submissionWorkflow };
