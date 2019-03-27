<?php

class WS_Prompt extends WS_Custom_Post_Type {

    public static $slug = 'prompts';

    public static $singular_name = 'Prompt';

    public static $plural_name = 'Prompts';

    public static $csv_generator_page_slug = 'csv';

    public static $post_options = array(
        'menu_icon'                 => 'dashicons-clipboard',
        'hierarchical'              => false,
        'has_archive'               => false,
        'menu_position'             => 4,
        'supports'                  => array(
                                        'title',
                                        'revisions',
                                        'comments',
                                        'custom-fields'
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
     * Adds a meta-box to the sidebar to allow
     * for easy comment download for a specific prompt.
     */
    public static function add_comment_download_box() {
        add_meta_box(
            'prompt_csv_download',
            'Download Comments',
            array( 'WS_Prompt', 'render_download_button' ),
            static::$slug,
            'normal',
            'default'
        );
    }

    /**
     *
     *
     */
    public static function render_download_button() {
        global $post;

        echo '<a class="button" href="' . get_permalink( get_page_by_path( static::$csv_generator_page_slug ) ) . '?id=' . $post->ID . '">Download Comments CSV <span class="screen-reader-text">(downloads a csv of comments for this prompt)</span></a>';
    }


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
