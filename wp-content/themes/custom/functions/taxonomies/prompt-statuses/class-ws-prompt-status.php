<?php

class WS_Prompt_Status extends WS_Taxonomy {

    public static $slug = 'prompt-status';

    public static $singular_name = 'Prompt Status';

    public static $plural_name = 'Prompt Statuses';

    public static $registered_post_types = array( 'prompts' );

    public static function register() { parent::register( WS_Prompt_Status::$slug, WS_Prompt_Status::$singular_name, WS_Prompt_Status::$plural_name, WS_Prompt_Status::$registered_post_types ); }

}

?>
