/**
 * Wordpress Dependencies
 */

import { 
	InspectorControls
} from '@wordpress/block-editor';

import {
	__
} from '@wordpress/i18n';

/**
 * Internal Dependencies
 */

import BasicConfig from './basicConfig';
import AdvancedConfig from './advancedConfig';

/**
 * Main
 */

export default function({animationClassNames, attributes, setAttributes}) {

	//
	const {
		animateIn,
		animateOut,
		animateCustomClasses,
		animateInDuration,
		animateOutDuration,
		animateThreshold,
		animateDirection
	} = attributes;

	//
	return (<InspectorControls key="setting">
		<BasicConfig
			animateIn={animateIn}
			animateOut={animateOut}
			animateCustomClasses={animateCustomClasses}
			animationClassNames={animationClassNames}
			setAttributes={setAttributes}
		/>
		{(animateIn || animateOut || animateCustomClasses) && (
			<AdvancedConfig 
				animateInDuration={animateInDuration}
				animateOutDuration={animateOutDuration}
				animateThreshold={animateThreshold}
				animateDirection={animateDirection}
				setAttributes={setAttributes}
			/>
		)}
	</InspectorControls>);
}