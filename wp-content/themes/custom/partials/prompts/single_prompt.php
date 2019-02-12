<div id="feedback" data-prompt-id="<?php echo get_the_ID(); ?>">
	<section id="feedback-prompt">

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
			<textarea id="feedback-input-textarea" placeholder="Tap here to write your response">a</textarea>
		</div>
		<div id="feedback-input-bottom">
			<div class="row">
				<div id="feedback-input-name-container" class="feedback-input-bottom-col col">
					<input id="feedback-input-name" type="text" placeholder="Your Name" value='a'/>
					<a href="#" id="feedback-input-name-helper" class="modal-trigger feedback-input-helper">?</a>
				</div>
				<div id="feedback-input-email-container" class="feedback-input-bottom-col col">
					<input id="feedback-input-email" type="email" placeholder="Your Email" value='a'/>
					<a href="#" id="feedback-input-email-helper" class="modal-trigger feedback-input-helper">?</a>
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
				$comments = get_comments();
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
