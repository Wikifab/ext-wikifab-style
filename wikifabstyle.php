<?php

$wgResourceModules['ext.Wikifab.js'] = array(
	'scripts' => 'wikifab-style.js',
	'styles' => array(),
	'messages' => array(
	),
	'dependencies' => array(
	),
	'position' => 'bottom',
	'localBasePath' => __DIR__ . '',
	'remoteExtPath' => 'WfExtensions/WikifabStyle',
);
