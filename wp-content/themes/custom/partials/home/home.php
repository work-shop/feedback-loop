<section id="home" class="block vhmin100 bg-light pt4 pb4">
	<div class="container-fluid" id="home-prompts">
		<div class="row">
			<?php 
			$args = array(
				'posts_per_page'        => -1,
				'post_type'             => 'prompts'
			);
			$prompts_query = new WP_Query( $args );
			while ( $prompts_query->have_posts() ) : $prompts_query->the_post(); ?>
				<div class="col-12 col-md-6 col-lg-4 home-prompt-col">
					<a href="<?php the_permalink(); ?>" class="display-block">
						<div class="home-prompt-col-inner">
							<?php 
							$term_list = wp_get_post_terms($post->ID, 'artworks');
							foreach ($term_list as &$term) : ?>
								<h5 class="italic home-prompt-artwork">
									<?php echo $term->name; ?>
								</h5>							
							<?php endforeach; ?>	
							<h4 class="bold home-prompt-title">
								<?php the_field('prompt_text'); ?>
							</h4>
						</div>
					</a>
				</div>
			<?php endwhile; ?>
			<?php wp_reset_postdata(); ?>
		</div>
	</div>
</section>