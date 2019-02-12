'use strict';


import { WPRequestManager } from './submission-request.js';
import { SubmissionErrors } from './submission-errors.js';
import { SubmissionSuccess } from './submission-success.js';

const inputSelectors = {
    inputTextareaId: '#feedback-input-textarea',
    nameFieldId: '#feedback-input-name',
    emailFieldId: '#feedback-input-email',
    submitButtonId: '#feedback-input-submit'
};

var requestManager = null;
var errorsManager = null;
var successManager = null;

function submissionWorkflow() {
    $( document ).ready( function() {

        errorsManager = new SubmissionErrors( inputSelectors);
        successManager = new SubmissionSuccess(inputSelectors);
        requestManager = new WPRequestManager(errorsManager, successManager, inputSelectors);

        $( inputSelectors.submitButtonId ).on( 'click', handleSubmitRequest );

    } );
}

function gatherContentFromForm() {
    return {
        maybeResponse: $( inputSelectors.inputTextareaId ).val(),
        maybeName: $( inputSelectors.nameFieldId ).val(),
        maybeEmail: $( inputSelectors.emailFieldId ).val()
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
