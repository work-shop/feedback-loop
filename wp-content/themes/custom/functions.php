<?php

define( '__ROOT__', dirname( __FILE__ ) );

require_once( __ROOT__ . '/functions/library/class-ws-cdn-url.php');
require_once( __ROOT__ . '/functions/class-ws-abstract-custom-post-type.php' );
require_once( __ROOT__ . '/functions/class-ws-abstract-taxonomy.php' );

require_once( __ROOT__ . '/functions/post-types/prompts/class-ws-prompt.php' );
require_once( __ROOT__ . '/functions/taxonomies/artworks/class-ws-artwork.php' );
require_once( __ROOT__ . '/functions/taxonomies/prompt-statuses/class-ws-prompt-status.php' );

require_once( __ROOT__ . '/functions/class-ws-site-admin.php' );
require_once( __ROOT__ . '/functions/class-ws-site-init.php' );

require_once( __ROOT__ . '/functions/library/class-ws-flexible-content.php' );
require_once( __ROOT__ . '/functions/library/class-helpers.php' );

new WS_Site();
new WS_Site_Admin();

?>
