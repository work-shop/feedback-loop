<?php

class WS_Site_Admin {

    public function __construct() {

        add_action('acf/init', array($this, 'add_options_pages'));
        add_action( 'admin_head', array( $this, 'admin_css'));

        add_filter('manage_edit-artworks_columns', array($this, 'remove_post_tag_columns') );
        add_action('admin_menu', array( $this, 'manage_admin_menu_options' ) );
        add_action('wp_dashboard_setup', array($this, 'remove_dashboard_widgets') );
        add_action('wp_before_admin_bar_render', array($this, 'remove_admin_bar_items'));

        add_action('artworks_edit_form', array( $this, 'hide_artworks_description_box' ), 10, 1 );
        add_action('artworks_add_form', array( $this, 'hide_artworks_description_box' ), 10, 1 );
        add_action('add_meta_boxes', array('WS_Prompt', 'add_comment_download_box'));

        add_filter( 'get_user_metadata', array( $this, 'pages_per_page_wpse_23503'), 10, 4 );

    }

    /**
     * Callback function to render the CDN URL field in the options.
     *
     * @action 'admin_init'
     * @param $args array the array of value arguments
     *
     */
    public function render_settings_field( $args ) {
        echo "<input aria-describedby='cdn-description' name='cdn_url' class='regular-text code' type='text' id='" . $args[0] . "' value='" . $args[1] . "'/>";
        echo "<p id='cdn-description' class='description'>Input the url of the CDN, starting with https://, to use with this site or leave this field blank to bypass the CDN.";
    }


    public function hide_artworks_description_box( $tag ) {
        echo '<style>.term-description-wrap, .term-parent-wrap {display:none;}</style>';
    }

    /**
     * This function removes the description box from the post
     * columns.
     */
    public function remove_post_tag_columns( $columns ) {
        if ( isset( $columns['description']) ) {
            unset( $columns['description'] );
        }

        return $columns;
    }

    /**
     * This function manages visibility of different parts of the Admin view.
     */
    public function manage_admin_menu_options() {

        global $submenu;

        remove_meta_box("dashboard_primary", "dashboard", "side");   // WordPress.com blog
        remove_meta_box("dashboard_secondary", "dashboard", "side"); // Other WordPress news
        add_post_type_support('prompts', 'comments');
        remove_menu_page('index.php');  // Remove the dashboard link from the Wordpress sidebar.
        remove_menu_page('edit.php'); // remove default post type.
        remove_menu_page('edit.php?post_type=page'); // remove default page type.
        remove_menu_page('upload.php'); // remove default post type.

        add_menu_page('artworks', 'Artworks', 'manage_options', 'edit-tags.php?taxonomy=artworks&post_type=prompts', '', 'dashicons-format-image', 5);

        if ( !current_user_can( 'administrator' ) ) {

            if ( isset( $submenu['themes.php']) ) {
                foreach ($submenu['themes.php'] as $key => $menu_item ) {
                    if ( in_array('Customize', $menu_item ) ) {
                        unset( $submenu['themes.php'][$key] );
                    }
                    if ( in_array('Themes', $menu_item ) ) {
                        unset( $submenu['themes.php'][$key] );
                    }
                }
            }

        }

    }

    /**
     * Additional ACF options pages can be registered here.
     */
    public function add_options_pages() {
        if ( function_exists('acf_add_options_page') ) {
            acf_add_options_page(array(
                "page_title" => "Explanatory Text",
                "capability" => "edit_posts",
                "position" => 50,
                "icon_url" => "dashicons-format-aside"
            ));
        }
    }

    public function pages_per_page_wpse_23503( $check, $object_id, $meta_key, $single ) {
        if( 'edit_page_per_page' == $meta_key )
            return 100;
        return $check;
    }

    public function admin_css( ) {
        wp_enqueue_style( 'admin_css', get_template_directory_uri() . '/bundles/admin-bundle.css' );
    }


    /**
     * Removes comments icon from the admin bar.
     */
    public function remove_admin_bar_items() {
        global $wp_admin_bar;
        $wp_admin_bar->remove_menu("comments");
    }

    /**
     * remove admin menu home page widgets
     */
    public function remove_dashboard_widgets() {
        remove_meta_box("dashboard_primary", "dashboard", "side");   // WordPress.com blog
        remove_meta_box("dashboard_secondary", "dashboard", "side"); // Other WordPress news

        global $wp_meta_boxes;

        unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_quick_press']);
        unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_incoming_links']);
        unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_right_now']);
        unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_plugins']);
        unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_recent_drafts']);
        unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_recent_comments']);
        unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_primary']);
        unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_secondary']);
    }

}

?>
