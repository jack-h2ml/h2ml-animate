/**
 * WordPress dependencies
 * WordPress dependencies
 */

import { registerBlockType } from '@wordpress/blocks';

import { grid as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */

import metadata from './block.json';
import Edit from './edit';
import Save from './save';

import './style.scss';

/**
 * Register the Block
 */

registerBlockType(metadata.name, {
	//
	icon,
	edit: Edit,
	save: Save
});
