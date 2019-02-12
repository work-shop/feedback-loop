'use strict';



class SubmissionSuccess {

    /**
     *
     *
     */
    constructor( inputSelectors ) {
        this.thankYouPaneSelector = '#feedback-input-thank-you-pane';
        this.thankYouPaneCloseButtonSelector = '#feedback-input-thank-you-pane .done-button';
        this.thankYouPaneTimeout = 120000;
        this.timeout = null;
        this.inputSelectors = inputSelectors;

        console.log( this.inputSelectors );

        $( this.thankYouPaneCloseButtonSelector ).on('click', this.dismissThankYouPane.bind(this) );
    }

    renderSuccess( success ) {
        $( this.thankYouPaneSelector ).data('response-id', success.id);
        this.showThankYouPane();

    }

    showThankYouPane() {

        $( this.thankYouPaneSelector ).removeClass('inactive').addClass('active');
        this.timeout = setTimeout( this.dismissThankYouPane.bind(this), this.thankYouPaneTimeout );

    }

    dismissThankYouPane() {

        if ( this.timeout !== null ) {
            clearTimeout( this.timeout );
            this.timeout = null;
        }

        this.clearResponses();
        
        $( this.thankYouPaneSelector ).data('response-id', '');
        $( this.thankYouPaneSelector ).removeClass('active').addClass('inactive');
    }

    clearResponses() {
        $( this.inputSelectors.inputTextareaId ).text('');
        $( this.inputSelectors.nameFieldId ).val('');
        $( this.inputSelectors.emailFieldId ).val('');
    }

}


export { SubmissionSuccess };
