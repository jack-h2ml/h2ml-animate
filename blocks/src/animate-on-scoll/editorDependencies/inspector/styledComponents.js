/**
 * Wordpress Dependencies
 */

import {
	PanelBody,
	__experimentalVStack as VStack,
    __experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalSpacer as Spacer
} from '@wordpress/components';

/**
 *  External Dependencies
 */

import styled from '@emotion/styled';

/**
 * Panel Description
 */

export const PanelDescription = styled.div`
	grid-column: span 2;
`;

/**
 * 
 */

export const ToolsPanelBody = styled(PanelBody)`
	display: flex !important;
	flex-direction: column !important;
	border-top: none !important; 

	.components-panel__body-title:hover {
		background: unset;
	}

	.components-panel__body-toggle.components-button {

		display: flex;
		flex-direction: row-reverse;
		justify-content: space-between;
		align-items: center;

		padding: 0px;
		padding-left: 4px;
	}

	.components-panel__body-toggle.components-button .components-panel__arrow {
		position: unset;
    	right: unset;
    	top: unset;
    	transform: unset;
	}
`;

/**
 * Single Column ToolsPanelItem
 */

export const SingleColumnItem = styled(ToolsPanelItem)`
	display: block !important;
	grid-column: span 1 !important;
`;

/**
 * Double Column ToolsPanelItem
 */

export const DoubleColumnItem = styled(ToolsPanelItem)`
	display: block !important;
    grid-column: span 2 !important;
`;

/**
 * 
 */

export const SpacerWithBorder = styled(Spacer)`
	border-top: 1px solid rgb(221, 221, 221);
	margin-top: -1px;
`

/**
 * 
 */

export const CustomPanel = styled(VStack)`
	*:is(.components-heading, .components-base-control, .components-base-control__field, .components-form-token-field p) {
		margin-bottom: 0px !important;
	}
`;