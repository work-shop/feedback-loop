<div class="modal off bg-white" id="modal-about">
	<div class="modal-container">
		<div class="row mb3">
			<div class="col">
				<h2 class="brand">This is Feedback Loop.</h2>
			</div>
		</div>
		<div class="row mb2">
			<div class="col-lg-10">
				<h3 class="brand">
					<?php the_field('feedback_loop_mission','option'); ?>
				</h3>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-12">
				<p class="brand">
					<?php the_field('feedback_loop_project_details','option'); ?>
				</p>
			</div>
		</div>
	</div>
</div>

<div class="modal off bg-white" id="modal-name">
	<div class="modal-container">
		<div class="row mb2">
			<div class="col-lg-10">
				<h4 class="bold mb1">Name Usage</h4>
				<h3 class="">
					<?php the_field('name_usage_message','option'); ?>
				</h3>
			</div>
		</div>
	</div>
</div>

<div class="modal off bg-white" id="modal-email">
	<div class="modal-container">
		<div class="row mb2">
			<div class="col-lg-10">
				<h4 class="bold mb1">Email Usage</h4>
				<h3 class="">
					<?php the_field('email_usage_message','option'); ?>
				</h3>
			</div>
		</div>
	</div>
</div>

<div id="modal-close">
	<a href="#" class="modal-close">
		<span class="icon" data-icon="ﬂ">
		</span>
	</a>
</div>
<div class="modal-close" id="blanket"></div>
</div>