'use strict';



class SubmissionSuccess {

    /**
     * The SubmissionSuccess class handles displaying and dismissing the thankyou pane.
     */
    constructor( inputSelectors ) {
        this.thankYouPaneSelector = '#feedback-input-thank-you-pane';
        this.thankYouPaneCloseButtonSelector = '#feedback-input-thank-you-pane .done-button';
        this.thankYouPaneTimeout = 120000;
        this.timeout = null;
        this.inputSelectors = inputSelectors;

        $( this.thankYouPaneCloseButtonSelector ).click( this.dismissThankYouPane.bind(this) );
    }


    /**
     * This method is called when the Wordpress API returns a
     * successful response. It handles recording the id of the comment
     * that was created, and displaying the thankyou pane.
     */
    renderSuccess( success ) {
        $( this.thankYouPaneSelector ).data('response-id', success.id);
        this.showThankYouPane();

    }


    /**
     * This method displays the thankyou pane explicitly. It also adds a time
     * out, which will dismiss the thankyou pane after a set number of seconds.
     */
    showThankYouPane() {

        $( this.thankYouPaneSelector ).removeClass('inactive').addClass('active');
        this.timeout = setTimeout( this.dismissThankYouPane.bind(this), this.thankYouPaneTimeout );

    }


    /**
     * This method dismisses the thankyou pane, either by being called after a
     * timeout, or after the user clicks the dismiss button `.close-button`.
     */
    dismissThankYouPane() {

        if ( this.timeout !== null ) {
            clearTimeout( this.timeout );
            this.timeout = null;
        }

        this.clearResponses();

        $( this.thankYouPaneSelector ).data('response-id', '');
        $( this.thankYouPaneSelector ).removeClass('active').addClass('inactive');
    }


    /**
     * This method clears any user-set values present in
     * the input fields, before displaying them again after
     * a successful submission.
     */
    clearResponses() {
        $( this.inputSelectors.inputTextareaId ).text('');
        $( this.inputSelectors.nameFieldId ).val('');
        $( this.inputSelectors.emailFieldId ).val('');
    }

}


export { SubmissionSuccess };
