<?php

$wgMessagesDirs['WfExtStyle'] = __DIR__ . "/i18n";

$wgResourceModules['ext.Wikifab.js'] = array(
	'scripts' => 'wikifab-style.js',
	'styles' => array(),
	'messages' => array(
	),
	'dependencies' => array(
	),
	'position' => 'bottom',
	'localBasePath' => __DIR__ . '',
	'remoteExtPath' => 'WfextStyle',
);

// Specify the function that will change the user menu.
$wgHooks['PersonalUrls'][] = 'PersonalUrlsWikifabCustom';
function PersonalUrlsWikifabCustom( &$personal_urls, &$title, $this  ) {
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
	//var_dump($personal_urls);
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