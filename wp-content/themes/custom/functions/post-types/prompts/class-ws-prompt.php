<?php

class WS_Prompt extends WS_Custom_Post_Type {

    public static $slug = 'prompts';

    public static $singular_name = 'Prompt';

    public static $plural_name = 'Prompts';

    public static $post_options = array(
        'menu_icon'                 => 'dashicons-clipboard',
        'hierarchical'              => false,
        'has_archive'               => false,
        'menu_position'             => 4,
        'supports'                  => array(
                                        'title',
                                        'revisions',
                                        'comments'
                                    ),
        'rewrite'                   => array(
                                        'slug' => 'prompts',
                                        'with_front' => false,
                                        'feeds' => true,
                                        'pages' => true
                                    ),
        'taxonomies'                => array( '' )

    );

    public static $query_options = array(

    );


    /**
     * ==== Instance Members and Methods ====
     */

    public function __construct( $id ) {

        $this->id = $id;

    }

    public function validate() {

    }

    public function create() {

    }

}

?>
