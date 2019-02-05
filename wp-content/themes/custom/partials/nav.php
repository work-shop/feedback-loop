<nav id="nav" class="fixed before">
	<div id="logo" class="logo">
		<a href="/" title="Home">
			<?php get_template_part('partials/logo'); ?>
		</a>
	</div>
	<div id="nav-menus">
		<ul class="nav-menus-list">
			<li class="has-sub-menu closed nav-menu-primary-item">
				<a href="/about" class="dropdown-link closed mobile-closed <?php if( Helpers::is_tree(161) ): echo ' nav-current '; endif; ?>" id="nav-link-about" data-dropdown-target="about">
					About
					<span class="icon" data-icon="ﬁ"></span>
				</a>
				<ul class="sub-menu" id="sub-menu-about">
					<li>
						<a href="/about" class=""> 
							About
						</a>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</nav>
<div class="hamburger menu-toggle">
	<span class="hamburger-line hl-1"></span>
	<span class="hamburger-line hl-2"></span>
	<span class="hamburger-line hl-3"></span>
</div>

