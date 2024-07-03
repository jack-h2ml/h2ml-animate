/**
 * Wordpress Dependencies
 */

import {
	__experimentalHeading as Heading,
	FormTokenField,
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

export default function({animateIn, animateOut, animateCustomClasses, animationClassNames, setAttributes}) {

	//
	const title = __('Animation Settings', 'h2ml');

	//
	const animateInMessages = {
		label: __("Set the 'Animate In' style", 'h2ml')
	}

	//
	const animateOutMessages = {
		label: __("Set the 'Animate Out' style", 'h2ml')
	}

	//
	const animateCustomClassesMessages = {
		label: __("Custom classnames", 'h2ml')
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
				<SelectControl
					onChange={(newAnimation) => {
						setAttributes({
							animateIn: newAnimation
						});
					}}
					value={animateIn}
					options={animationClassNames.animateIn}
					label={animateInMessages.label}
				/>
				<SelectControl
					onChange={(newAnimation) => {
						setAttributes({
							animateOut: newAnimation
						});
					}}
					value={animateOut}
					options={animationClassNames.animateOut}
					label={animateOutMessages.label}
				/>
				<FormTokenField
					value={animateCustomClasses}
					onChange={(newCustomClasses) => {
						setAttributes({
							animateCustomClasses: newCustomClasses
						});
					}}
					label={animateCustomClassesMessages.label}
					__experimentalValidateInput={(token) => {
						return /[-_a-zA-Z]+[-_a-zA-Z0-9]*?/.test(token);
					}}
				/>
			</CustomPanel>
		</SpacerWithBorder>
	)
}