<?php
define( 'WP_CACHE', true );

/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'u485132360_sqq4b' );

/** Database username */
define( 'DB_USER', 'u485132360_gDB0J' );

/** Database password */
define( 'DB_PASSWORD', 'qxIoAzpMtp' );

/** Database hostname */
define( 'DB_HOST', '127.0.0.1' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          '-gp52k=9N:;PB1LSqd!-TJ60oSd lP-ST-C sOc4Li@#g| qnnB+t[s$U_t8B,8Q' );
define( 'SECURE_AUTH_KEY',   '~:v iF?O(e;r|A,-+vyc#(Wcakc#UhP*fTJW+4U8c#*NI}*Lzll#^%aVVC^MlK4}' );
define( 'LOGGED_IN_KEY',     'p2-q9udy/x(fcGe*~=J,r(S-97H!-)G8E])v@KaBFb,QHIPi9VoYhnmyZ;9Wl0nL' );
define( 'NONCE_KEY',         '_8aMNO;%fwU}]DbSwNK >goWHKTLe~49j#cuH.m==U*36Dn&m-ZIn4*MCD8mhke<' );
define( 'AUTH_SALT',         'ePfR!~9pL~IB;KhC?f?2zX,JAS~&E!eJf~PDnAQV6@lLB}NNDHhmow:qW#hEBP}W' );
define( 'SECURE_AUTH_SALT',  'YNv~n5cOp|7SGA!uba{[fm>yApx]=kF2|}}P5y7MGRMy<E}a`A1SH4d6XDYQ~]PP' );
define( 'LOGGED_IN_SALT',    'oi*03YM$Udb)=gK<CsuSB$8clDXI9Hm[xY8<}78cxUe`>JB%&Uy*a]{}VGmQz$y^' );
define( 'NONCE_SALT',        'FhFvQax)X?iYUqp={s:x7fO6@s]:DQLmfxnC}PV}rIZ@HwPQN~pcQwIK!_K*rsLO' );
define( 'WP_CACHE_KEY_SALT', 'KF17?u i,g`Hk[qsUdGk(]J8_6>=$wPv4yl[vR9O)qH*_@?Mfm,T2<.((Kq%pB[.' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

define( 'FS_METHOD', 'direct' );
define( 'COOKIEHASH', '6b5746bebfc5e1e94424e9c2e6044a28' );
define( 'WP_AUTO_UPDATE_CORE', 'minor' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
