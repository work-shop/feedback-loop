<div id="feedback" data-prompt-id="<?php echo get_the_ID(); ?>">
	<section id="feedback-prompt">
		<div id="feedback-about-button">
			<a href="#" class="modal-toggle" data-modal-target="modal-about">
				About Feedback Loop
			</a>
		</div>
        <?php get_template_part('partials/prompts/error_pane'); ?>
		<div id="feedback-prompt-top">
			<?php
			$term_list = wp_get_post_terms($post->ID, 'artworks');
			$term = $term_list[0];
			$id = 'artworks_' . $term->term_taxonomy_id;
			$artist = get_field('artist',$id);
			$year = get_field('year',$id);
			?>
			<h2 class="white feedback-prompt-artwork-title">
				<?php echo $term->name; ?>
			</h2>
			<h4 class="italic white feedback-prompt-artwork-artist">
				<?php echo $artist; ?><?php if($year): ?>, <?php echo $year; ?><?php endif; ?>
			</h4>
		</div>
		<div id="feedback-prompt-bottom">
			<h3 class="white feedback-prompt-text">
				<?php the_field('prompt_text'); ?>
			</h3>
		</div>
	</section>
	<section id="feedback-input">
		<div id="feedback-input-top">
			<textarea id="feedback-input-textarea" class="feedback-input" placeholder="Tap here to write your response"></textarea>
		</div>
		<div id="feedback-input-bottom">
			<div class="row">
				<div id="feedback-input-name-container" class="feedback-input-bottom-col col">
					<input id="feedback-input-name" class="feedback-input" type="text" placeholder="Your Name" />
					<a href="#" id="feedback-input-name-helper" class="modal-toggle feedback-input-helper" data-modal-target="modal-name">?</a>
				</div>
				<div id="feedback-input-email-container" class="feedback-input-bottom-col col">
					<input id="feedback-input-email" class="feedback-input" type="email" placeholder="Your Email" />
					<a href="#" id="feedback-input-email-helper" class="modal-toggle feedback-input-helper" data-modal-target="modal-email">?</a>
				</div>
				<div id="feedback-input-submit-container" class="feedback-input-bottom-col col">
					<div id="feedback-input-submit">
						Submit
					</div>
				</div>
			</div>
		</div>

        <?php get_template_part('partials/prompts/thankyou_pane'); ?>

	</section>
	<section id="feedback-responses" class="closed">
		<div class="feedback-responses-mask feedback-responses-mask-top">
		</div>
		<div class="feedback-responses-arrow feedback-responses-previous">
		</div>
		<div id="feedback-responses-inner">
			<div id="feedback-responses-list">
				<?php
				$ID = get_the_ID();
				$args = array(
					'post_id' => $ID,
				);
				$comments = get_comments( $args );
				foreach($comments as $comment) : ?>
					<div class="response-slide">
						<p class="response-slide-content">
							<span class="response-slide-content-quotation-mark">"</span><?php echo($comment->comment_content); ?>
						</p>
						<h4 class="response-slide-author italic">
							— <?php echo($comment->comment_author); ?>
						</h4>
					</div>
				<?php endforeach; ?>
				<div id="feedback-responses-list-end">
				</div>
			</div>
		</div>
		<div class="feedback-responses-mask feedback-responses-mask-bottom">
		</div>
		<div class="feedback-responses-arrow feedback-responses-next">
		</div>
		<div id="feedback-responses-label">
			<a href="#" class="feedback-responses-toggle">View Responses</a>
		</div>
	</section>
</div>
