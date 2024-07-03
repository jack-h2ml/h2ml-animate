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
		animateInThreshold,
		animateOutThreshold,
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
				animateInThreshold={animateInThreshold}
				animateOutThreshold={animateOutThreshold}
				animateDirection={animateDirection}
				setAttributes={setAttributes}
			/>
		)}
	</InspectorControls>);
}