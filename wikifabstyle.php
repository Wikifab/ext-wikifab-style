<?php

$wgMessagesDirs['WfExtStyle'] = __DIR__ . "/i18n";

$wgResourceModules['ext.Wikifab.js'] = array(
	'scripts' => 'wikifab-style.js',
	'styles' => array(),
	'messages' => array(
	),
	'dependencies' => array(
			'jquery.ui.core'
	),
	'position' => 'bottom',
	'localBasePath' => __DIR__ . '',
	'remoteExtPath' => 'WfextStyle',
);

$wgResourceModules['ext.Wikifab.css'] = array(
	'styles' => array(
		'wikifab-style.css',
	),
	'localBasePath' => __DIR__,
	'remoteExtPath' => 'WfextStyle',
);

// Specify the function that will change the user menu.
$wgHooks['PersonalUrls'][] = 'PersonalUrlsWikifabCustom';
function PersonalUrlsWikifabCustom( &$personal_urls, &$title, $that  ) {
	unset($personal_urls['mytalk']);
	if(isset($personal_urls['userpage']['text'])) {
		$personal_urls['userpage']['text'] = wfMessage( 'wfextstyle-my_profil');
	}
	if(isset($personal_urls['anonuserpage'])) {
		unset($personal_urls['anonuserpage']);
	}
	if(isset($personal_urls['anontalk'])) {
		unset($personal_urls['anontalk']);
	}
	if(isset($personal_urls['watchlist'])) {
		unset($personal_urls['watchlist']);
	}
	if(isset($personal_urls['mycontris'])) {
		unset($personal_urls['mycontris']);
	}
}

$wgWikifabStyleForceUpdate = true;

// hook to launch synchronous update properties of new pages
// this has been added because if not, after create new page,
// the page has not instantly his properties, and so the forms links (action=formedit) are not setted
$wgHooks['ArticleEditUpdates'][] = 'wfExtStyleArticleEditUpdates';
function wfExtStyleArticleEditUpdates( WikiPage $wikipage, $editInfo, $changed  ) {
	global $wgWikifabStyleForceUpdate;
	if ($wgWikifabStyleForceUpdate) {
		$title = $wikipage->getTitle();
		$output = $editInfo->output;

		if( ! $editInfo->oldContent ) {
			$linksUpdate = new LinksUpdate( $title, $output, $recursive = false );
			$linksUpdate->doUpdate();
		}
	}
}


$wgHooks['ParserMakeImageParams'][] = 'onParserMakeImageParams';
function onParserMakeImageParams( $title, $file, &$params, $parser ) {
	if(method_exists($file, 'getMimeType')){
		if($file->getMimeType() == 'application/sla'){
			$params['frame']['class'] = 'file-3D';
		}
	}
	return true;
}

$wgHooks['BeforePageDisplay'][] = 'onBeforePageDisplay';
function onBeforePageDisplay( OutputPage &$out, Skin &$skin ) {
		$out->addModuleStyles('ext.Wikifab.css');
}
