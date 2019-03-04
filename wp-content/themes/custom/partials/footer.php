        </main>

        <?php //get_template_part('partials/footer_site' ); ?>

        <?php get_template_part('partials/modals');?>

        <?php //get_template_part('partials/viewport_label' ); ?>

        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-134514873-1"></script>
        <script>              
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'UA-134514873-1');
        </script>

        <?php wp_footer();?>

    </body>
</html>
