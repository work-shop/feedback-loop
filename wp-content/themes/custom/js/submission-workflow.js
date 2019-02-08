'use strict';


import { gatherErrors, getPriorityErrors } from './submission-errors.js';
import { submitRequest } from './submission-ajax.js';

const inputTextareaId = '#feedback-input-textarea';
const nameFieldId = '#feedback-input-name';
const emailFieldId = '#feedback-input-email';
const submitButtonId = '#feedback-input-submit';


function submissionWorkflow() {
    $( document ).ready( function() { $( submitButtonId ).on( 'click', handleSubmitRequest ); } );
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
    let maybeErrors = gatherErrors( content );

    if ( maybeErrors.error ) {

        renderErrors( getPriorityErrors( maybeErrors ) );

    } else {

        submitRequest( content );

    }

}

function renderErrors( errors ) {
    console.log( errors );
}







export { submissionWorkflow };
