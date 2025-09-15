<?php
if (!defined('ABSPATH')) { exit; }

add_action('wp_enqueue_scripts', function() {
  // Ensure parent theme styles load if needed
  $parent = 'twentytwentyfour-style';
  if (wp_style_is($parent, 'registered')) {
    wp_enqueue_style($parent);
  }
  wp_enqueue_style('panas-child-style', get_stylesheet_uri(), [], '0.1.0');
  // Optionally enqueue animate.css or GSAP in the future
});

// Minimal cleanup: remove emojis for performance
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
