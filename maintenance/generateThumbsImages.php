<?php
/**
 * Run pending jobs.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 * http://www.gnu.org/copyleft/gpl.html
 *
 * @file
 * @ingroup Maintenance
 */

require_once __DIR__ . '/../../../maintenance/Maintenance.php';

/**
 * Maintenance script that runs pending jobs.
 *
 * @ingroup Maintenance
 */
class GenerateThumbsImages extends Maintenance {

	protected $sizes = [];

	public function __construct() {
		parent::__construct();
		$this->addDescription( 'Run pending jobs' );
		$this->addOption( 'reallyRun', 'if not set, this will only show what it would have done', false, false );
		$this->addOption( 'maxThumbs', 'Maximum number of thumbs to generat', false, true );
		$this->addOption( 'maxTime', 'Maximum amount of wall-clock time', false, true );
		$this->addOption( 'startName', 'imageNameToStart', false, true );
	}

	public function execute() {
		global $wgCommandLineMode, $wgThumbLimits;

		$this->sizes = $wgThumbLimits;


		$reallyRun = $this->hasOption( 'reallyRun' );

		$maxThumbs = $this->getOption( 'maxThumbs', false );
		$maxTime = $this->getOption( 'maxTime', false );

		$this->output("Really run : $reallyRun \n");
		$this->output("Really maxThumbs : $maxThumbs \n");


		// look for all files :
		$titles =[];

		$this->mBatchSize = 20;
		$lastName = $this->getOption( 'startName', '' );

		$conds = [];

		$count = 0;
		$startTime = wfTimestampNow();

		$repo = RepoGroup::singleton()->getLocalRepo();
		//$repo->enumFiles( ['GenerateThumbsImages', 'generateThumbsImagesCallBack'] ) ;
		$dbw = $repo->getMasterDB ();

		$totalCount = $dbw->estimateRowCount('image', $vars = '*', $conds);
		$this->output( "Nb image to check : $totalCount \n" );

		do {
			$res = $dbw->select ( 'image',
				array ('img_name', 'img_sha1'),
				array_merge ( array ('img_name > ' . $dbw->addQuotes ( $lastName )), $conds ),
				__METHOD__,
				array (
					'LIMIT' => $this->mBatchSize,
					'ORDER BY' => 'img_name'
				)
			);
			foreach ( $res as $row ) {
				$lastName = $row->img_name;
				$sha1 = $row->img_sha1;
				if (! strlen ( $sha1 )) {
					$this->error ( "Image SHA-1 not set for {$row->img_name}." );
				} else {
					$file = $repo->newFile ( $row->img_name );
					$this->generateAllThumbs($file, $reallyRun);

				}
			}
			$count += $res->numRows ();
			if ($maxThumbs && $count >= $maxThumbs ) {
				break;
			}
			$this->output( "processing images $count/$totalCount \n" );
		} while ( $res->numRows () );
	}

	public function generateAllThumbs(File $file, $really) {

		foreach ($this->sizes as $size) {


			$thumbName = $file->thumbName( ['width' => $size] );
			$thumbPath = $file->getThumbPath( $thumbName );
			//echo '<br/>';
			$exist = $file->getRepo()->fileExists( $thumbPath );
			if ( !$exist ) {
				$transformParams = ["width" => $size ];
				$thumb = $file->transform( $transformParams,File::RENDER_NOW);

				if ( $thumb && !$thumb->isError()) {
					$result = True;
				} else {
					$result = 'fail';
				}
				$this->output("generate Thumb size ". $size  ." file :" . $file->getName() . " result : $result\n");
			} else {
				$this->output("existing Thumb size ". $size  ." file :" . $file->getName() . " \n");
			}
		}
	}

	protected function getRepo() {
		return RepoGroup::singleton()->getLocalRepo();
	}

	/**
	 * @param string $s
	 */
	public function debugInternal( $s ) {
		$this->output( $s );
	}
}

$maintClass = "GenerateThumbsImages";
require_once RUN_MAINTENANCE_IF_MAIN;
