<?php

class WS_Artwork extends WS_Taxonomy {

    public static $slug = 'artworks';

    public static $singular_name = 'Artwork';

    public static $plural_name = 'Artworks';

    public static $registered_post_types = array( 'prompts' );

    public static function register() { parent::register( WS_Artwork::$slug, WS_Artwork::$singular_name, WS_Artwork::$plural_name, WS_Artwork::$registered_post_types ); }

}

?>
