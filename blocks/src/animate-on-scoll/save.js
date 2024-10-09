/**
 * Wordpress Dependencies
 */

import { 
	useBlockProps, 
	useInnerBlocksProps 
} from '@wordpress/block-editor';

import {
	__
} from '@wordpress/i18n';



/**
 * Internal Dependencies
 */



/**
 * 
 */

export default function Save({attributes}) {

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
	const innerBlocksProps = useInnerBlocksProps.save(useBlockProps.save());

	console.log(animateCustomClasses);

	//
	return (
		<div 
			{ ...innerBlocksProps } 
			data-animate={true}
			data-animate-in={animateIn}
			data-animate-out={animateOut}
			data-animate-custom-classes={animateCustomClasses}
			data-animate-in-duration={animateInDuration}
			data-animate-out-duration={animateOutDuration}
			data-animate-threshold={animateThreshold}
			data-animate-direction={animateDirection}
		/>
	);
}