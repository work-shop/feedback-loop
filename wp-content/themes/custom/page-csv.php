<?php

// 1. Redirect the user if the are not logged in.
if ( !is_user_logged_in() ) { auth_redirect(); }

// 2. die if there's no prompt specified, or if the prompt parameter is non-sensical.
if ( !isset( $_GET['id'] ) ) { echo 'No Prompt ID was passed to the csv!'; die(); }
if ( !is_numeric( $_GET['id'] ) ) { echo 'A non-integer Prompt ID was passed to the csv.!'; die(); }

// 3. Parse the prompt id and get the raw approved comments.
$ID = intval( $_GET['id'] );
$name = sanitize_title( get_the_title( $ID ) );
$args = array( 'post_id' => $ID );
$comments = get_approved_comments( $ID, $args );


// 4. Map the comments into the form we want for the csv.
$headers = array('id', 'author', 'email', 'instagram', 'date', 'comment');

$comments = array_map( function( $comment ) {

    $author = empty($comment->comment_author) ? 'Anonymous' : $comment->comment_author;
    $instagram = ( $inst = get_field('instagram', $comment ) ) ? '@' . $inst : '';

    return array(
        'id' => $comment->comment_ID,
        'author' => $author,
        'email' => $comment->comment_author_email,
        'instagram' => $instagram,
        'date' => (new DateTime($comment->comment_date))->format('F j, Y'),
        'comment' => $comment->comment_content
    );
}, $comments );


// 5. Set content headers.
//    This lets us download the file, rather than render it to the browser
$output = fopen('php://output', 'w');
header('Content-Type:application/csv');
header('Content-Disposition:attachment;filename=' . $name . '.csv');


// 6. Render the CSV file.
fputcsv( $output, $headers ); // headers
foreach ( $comments as $comment ) { fputcsv( $output, $comment ); } // content
fclose($output); // done.
