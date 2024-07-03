/**
 * Wordpress Dependencies
 */

import {
	__experimentalHeading as Heading,
	TextControl,
	__experimentalNumberControl as NumberControl,
	SelectControl
} from '@wordpress/components';

import {
	__
} from '@wordpress/i18n';

/**
 * Internal Dependencies
 */

import { CustomPanel, SpacerWithBorder } from './styledComponents'

/**
 * Main
 */

export default function({animateInDuration, animateOutDuration, animateThreshold, animateDirection, setAttributes}) {

	//
	const title = __('Additional Animation Settings', 'h2ml');

	//
	const animateInDurationMessages = {
		label: __("Animate in duration", 'h2ml')
	}

	//
	const animateOutDurationMessages = {
		label: __("Animate out duration", 'h2ml')
	}

	//
	const animateThresholdMessages = {
		label: __("Animate threshold", 'h2ml')
	}

	//
	const animateDirectionMessages = {
		label: __("Animation Direction", 'h2ml'),
		optionsLabels: {
			forward: __("Forwards (Default)", 'h2ml'),
			backward: __("Backwards", 'h2ml'),
			both: __("Both (Expertimental)", 'h2ml')
		}
	}

	//
	return (
		<SpacerWithBorder 
			padding={4}
		>
			<CustomPanel
				spacing={4}
			>
				<Heading>{title}</Heading>
				<TextControl
					value={animateInDuration}
					onChange={(newDuration) => {
						setAttributes({
							animateInDuration: newDuration
						});
					}}
					label={animateInDurationMessages.label}
				/>
				<TextControl
					value={animateOutDuration}
					onChange={(newDuration) => {
						setAttributes({
							animateOutDuration: newDuration
						});
					}}
					label={animateOutDurationMessages.label}
				/>
				<NumberControl
					onChange={(newThreshold) => {
						setAttributes({
							animateThreshold: newThreshold
						});
					}}
					value={animateThreshold}
					min={0.1}
					max={1}
					step={0.1}
					label={animateThresholdMessages.label}
				/>
				<SelectControl
					onChange={(newDirection) => {
						setAttributes({
							animateDirection: newDirection
						});
					}}
					value={animateDirection}
					options={[{
						value: 'forwards',
						label: animateDirectionMessages.optionsLabels.forward
					}, {
						value: 'backwards',
						label: animateDirectionMessages.optionsLabels.backward
					}, {
						value: 'both',
						label: animateDirectionMessages.optionsLabels.both
					}]}
					label={animateDirectionMessages.label}
				/>
			</CustomPanel>
		</SpacerWithBorder>
	)
}