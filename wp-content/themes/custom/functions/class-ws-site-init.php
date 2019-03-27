<?php

class WS_Site {

	public function __construct() {

		add_action('init', array($this, 'register_image_sizing'));
		add_action('init', array($this, 'register_theme_support'));
		add_action('init', array($this, 'register_post_types_and_taxonomies'));

		add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts_and_styles'));

		// NOTE: This filter enables anonymous comments via the REST API.
		add_filter('rest_allow_anonymous_comments', '__return_true');

		add_filter('show_admin_bar', '__return_false');
		add_filter('comment_flood_filter', '__return_false');

        add_action('rest_api_init', array( $this, 'register_instagram_handler'));

		new WS_CDN_Url();

	}



    public function register_instagram_handler( $data ) {
        register_rest_route( 'feedback/v1', '/instagram/(?P<id>\d+)/(?P<handle>[\w]+)', array(
            'methods' => 'POST',
            'callback' => array( $this, 'handle_instagram_route'),
            'args' => array(
                'id' => array(
                    'validate_callback' => function( $param, $request, $key ) {
                        return is_numeric( $param );
                    }
                )
            )

        ));
    }

    public function handle_instagram_route( $request ) {
        $comment_id = $request->get_param('id');
        $instagram_handle = $request->get_param('handle');
        $comment = get_comment( $comment_id );

        if ( count( $instagram_handle ) > 30 || !preg_match('/([A-Za-z._])\w+/', $instagram_handle ) ) {
            return array( 'success' => FALSE, 'id' => (int) $comment_id, 'handle' => $instagram_handle, 'message' => 'Invalid parameter: Malformed instagram handle.' );
        }

        // NOTE: review other failure cases?
        // NOTE: This allows for random people to update te instagram fields on comments, assuming they know the comment id.

        update_field( 'instagram', $instagram_handle, $comment );

        return array( 'success' => TRUE, 'id' => (int) $comment_id, 'handle' => $instagram_handle );
    }


	public function register_post_types_and_taxonomies() {

		WS_Prompt::register();
		WS_Artwork::register();
		WS_Prompt_Status::register();

	}

	public function register_image_sizing() {
		if (function_exists('add_image_size')) {
			add_image_size('xs', 300, 187, false); //1.6:1
			add_image_size('xs_cropped', 300, 187, true); //1.6:1
			add_image_size('xs_square', 300, 300, true);
			add_image_size('sm', 768, 480, false); //1.6:1
			add_image_size('sm_cropped', 768, 480, true); //1.6:1
			add_image_size('sm_square', 768, 768, true);
			add_image_size('md', 1024, 640, false); //1.6:1
			add_image_size('md_cropped', 1024, 640, true); //1.6:1
			add_image_size('md_square', 1024, 1024, true);
			add_image_size('lg', 1440, 900, false); //1.6:1
			add_image_size('lg_cropped', 1440, 900, true); //1.6:1
			add_image_size('lg_square', 1440, 1440, true);
			add_image_size('xl', 1920, 1200, false); //1.6:1
			add_image_size('xl_cropped', 1920, 1200, true); //1.6:1
			add_image_size('xl_square', 1920, 1920, true);
			add_image_size('acf_preview', 300, 300, false);
			add_image_size('fb', 1200, 630, true);
			add_image_size('page_hero', 1680, 770, true);
		}
	}

	public function register_theme_support() {
		if (function_exists('add_theme_support')) {
			add_theme_support('post-thumbnails');
			add_theme_support('menus');
		}
	}

	public function enqueue_scripts_and_styles() {
		if (function_exists('get_template_directory_uri') && function_exists('wp_enqueue_style') && function_exists('wp_enqueue_script')) {

			$main_css = '/bundles/bundle.css';
			$main_js = '/bundles/bundle.js';

			$compiled_resources_dir = get_template_directory();
			$compiled_resources_uri = get_template_directory_uri();

			$main_css_ver = filemtime($compiled_resources_dir . $main_css); // version suffixes for cache-busting.
			$main_js_ver = filemtime($compiled_resources_dir . $main_css); // version suffixes for cache-busting.

			wp_register_style('fonts', get_template_directory_uri() . '/fonts/fonts.css');
			wp_enqueue_style('fonts');
			wp_enqueue_style('main-css', $compiled_resources_uri . $main_css, array(), null);
			wp_enqueue_script('main-js', $compiled_resources_uri . $main_js, $main_js_ver);

		}
	}

}

?>
