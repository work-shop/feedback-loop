'use strict';


/**
 * This function generates an appropriate label
 * recording the type of success that we obtained.
 */
function getSuccessLabel( content ) {

    const hasName = typeof content.maybeName !== 'undefined' && content.maybeName.length !== 0;
    const hasEmail = typeof content.maybeEmail !== 'undefined' && content.maybeEmail.length !== 0;

    if ( hasName && hasEmail ) {

        return 'success_with_name_and_email';

    } else if ( hasName ) {

        return 'success_with_name_only';

    } else if ( hasEmail ) {

        return 'success_with_email_only';

    } else {

        return 'success_anonymous';

    }

}

/**
 * This function generates an appropriate label
 * recording the type of informational content
 * that was requested. 
 */
function getInfoLabel( content ) {

    switch( content ) {

        case 'modal-name':
            return 'info_name_policy';

        case 'modal-email':
            return 'info_email_policy';

        case 'modal-about':
            return 'info_about_project';

        default:
            return 'info_unrecognized';

    }

}



class SubmissionAnalytics {

    /**
     * NOTE: This class requires google GTAG manager to be placed 
     * in the site.
     */
    constructor( gtag ) { 
        this.local = window.location.hostname.indexOf( 'localhost' ) !== -1;
        this.gtag = gtag; 
    }


    /**
     * This routine records a successful submission of the 
     * form on the page, resulting in a new comment being 
     * added to the database.
     */
    reportFormSubmissionSuccess( content ) {

        const action = 'response_submitted';
        const category = 'submission';
        const label = getSuccessLabel( content );
        const method = 'Google';

        this.submitAnalyticsUpdate( action, category, label );

        return this;      

    }

    /**
     * This routine records an unsuccessful submission, 
     * including any ui or api errors.
     */
    reportFormSubmissionError( error ) {

        const action = 'response_submitted';
        const category = 'submission';
        const label = error.label;
        
        this.submitAnalyticsUpdate( action, category, label );

        return this;

    }

    /**
     * This routine reports when the thankyou pane times out 
     * and is automatically hidden by the application.
     */
    reportThankYouPageTimeout() {

        const action = 'confirmation_timed_out';
        const category = 'confirmation';
        const label = 'success';
            
        this.submitAnalyticsUpdate( action, category, label, true );

        return this;

    }

    /**
     * This routine reports when the thankyou page is 
     * manually closed by the user.
     */
    reportThankYouPageClosure() {

        const action = 'confirmation_closed';
        const category = 'confirmation';
        const label = 'success';
        
        this.submitAnalyticsUpdate( action, category, label );

        return this;

    }

    /**
     * This routine records when the info buttons 
     * are clicked.
     *
     * @param label string what type of info box was opened.
     */
    reportInfoButtonClicked( label ) {

        const action = 'info_button_clicked';
        const category = 'information';

        this.submitAnalyticsUpdate( action, category, getInfoLabel( label ) );

        return this;

    }

    /**
     * This routine records when the responses pane was opened or closed.
     * is opened.
     * 
     * @param label string whether
     */
    reportResponsesPaneClicked( label ) {

        const action = 'responses_pane_clicked';
        const category = 'information';

        this.submitAnalyticsUpdate( action, category, label );

        return this;

    }

    /**
     * This internal method handles submitting analytics to google, or 
     * simply loggin it to the console in the case of local development.
     */
    submitAnalyticsUpdate( action, category, label, non_interaction = false ) {

        if ( this.local ) {
           
            console.log( 'event:', action, category, label );

        } else {

            console.log( 'event:', action, category, label );
            this.gtag( 'event', action, { event_category: category, event_label: label, method: 'Google', non_interaction: non_interaction });

        }

    }


}

export { SubmissionAnalytics };