<?php
/**
 * Plugin Name: PANAS Webhooks
 * Description: Webhooks de WordPress (save_post) hacia CS/Twilio/HF. Configura claves en wp-config.php.
 * Version: 0.1.0
 */
if (!defined('ABSPATH')) { exit; }

function panas_wh_sanitize_string($str){ return is_string($str) ? wp_strip_all_tags($str) : ''; }

add_action('save_post', function ($post_id, $post, $update) {
  if (wp_is_post_autosave($post_id) || wp_is_post_revision($post_id)) return;
  $status = get_post_status($post_id);
  if (!in_array($status, ['publish','future','private'], true)) return;

  $author = get_user_by('id', $post->post_author);
  $categories = wp_get_post_categories($post_id, ['fields'=>'names']);

  $payload = [
    'event' => 'save_post',
    'update' => (bool)$update,
    'post' => [
      'id' => (int)$post_id,
      'type' => panas_wh_sanitize_string($post->post_type),
      'status' => panas_wh_sanitize_string($status),
      'title' => panas_wh_sanitize_string(get_the_title($post_id)),
      'permalink' => get_permalink($post_id),
      'categories' => is_wp_error($categories) ? [] : array_map('wp_strip_all_tags', (array)$categories),
    ],
    'site' => [ 'name' => panas_wh_sanitize_string(get_bloginfo('name')), 'url' => home_url('/') ],
    'timestamp' => current_time('mysql', true),
  ];

  $payload = apply_filters('panas_webhooks_payload', $payload, $post_id, $post, $update);

  if (defined('PANAS_CS_WEBHOOK_URL') && PANAS_CS_WEBHOOK_URL) {
    wp_remote_post(PANAS_CS_WEBHOOK_URL, [
      'timeout' => 15,
      'headers' => ['Content-Type' => 'application/json'],
      'body' => wp_json_encode($payload),
    ]);
  }

  if (defined('PANAS_TWILIO_SID') && defined('PANAS_TWILIO_TOKEN') && defined('PANAS_TWILIO_FROM') && defined('PANAS_TWILIO_TO')) {
    $sid = PANAS_TWILIO_SID; $token = PANAS_TWILIO_TOKEN; $from = PANAS_TWILIO_FROM; $to = PANAS_TWILIO_TO;
    $msg = sprintf('Post %s: %s', $payload['update']?'actualizado':'publicado', $payload['post']['title']);
    $url = "https://api.twilio.com/2010-04-01/Accounts/{$sid}/Messages.json";
    wp_remote_post($url, [
      'timeout'=>15,
      'headers'=>['Authorization'=>'Basic '.base64_encode($sid.':'.$token)],
      'body'=>['From'=>$from,'To'=>$to,'Body'=>$msg],
    ]);
  }
}, 10, 3);
