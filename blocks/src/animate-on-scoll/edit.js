/**
 * Wordpress Dependencies
 */

import { 
	InnerBlocks,
	useBlockProps, 
	useInnerBlocksProps
} from '@wordpress/block-editor';

import {
	getBlockTypes
} from '@wordpress/blocks';

import {
	select,
	useSelect,
	dispatch,
	useDispatch,
} from '@wordpress/data';

import {
	useMemo,
	useRef,
	useState,
	useEffect
} from '@wordpress/element';

import {
	__
} from '@wordpress/i18n';

/**
 * Internal Dependencies
 */

import './edit.scss';

import 'animate.css/animate.min.css';

import parseAnimateCssDefinitions from './editorDependencies/parseCssDefinitions';

import InspectorControls from './editorDependencies/inspector';

/**
 * Main
 */

export default function Edit({attributes, setAttributes, clientId}) {
	
	/**
	 * Check for any innerblocks.
	 */

	//
	const { hasInnerBlocks } = useSelect((select) => {
		const { getBlock } = select('core/block-editor');
		const block = getBlock(clientId);
		return {
			hasInnerBlocks: !!(block && block.innerBlocks.length),
		};
	}, [clientId]);

	/**
	 * Retrieve list of Animate.css class names.
	 */

	const animationClassNames = useMemo(() => parseAnimateCssDefinitions(), []);

	/**
	 * Rendering
	 */

	//
	const allowedBlocks = getBlockTypes().map(({name}) => name).filter((name) => name !== 'h2ml/animate-on-scroll');
	
	//
	const renderAppender = hasInnerBlocks ? () => null : InnerBlocks.ButtonBlockAppender;

	//
	const innerBlocksProps = useInnerBlocksProps(useBlockProps(), {
		allowedBlocks,
		renderAppender
	});

	// The JSX
	return (<>
		<InspectorControls 
			attributes={attributes}
			setAttributes={setAttributes}
			animationClassNames={animationClassNames}
		/>
		<div { ...innerBlocksProps }/>
	</>);
}