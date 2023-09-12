'use client';

import { cn } from '@/lib/utils';
import { serializeHtml } from '@udecode/plate-serializer-html';
import {
	MARK_BOLD,
	MARK_ITALIC,
	MARK_STRIKETHROUGH,
	MARK_SUBSCRIPT,
	MARK_SUPERSCRIPT,
	MARK_UNDERLINE,
	createBoldPlugin,
	createItalicPlugin,
	createStrikethroughPlugin,
	createSubscriptPlugin,
	createSuperscriptPlugin,
	createUnderlinePlugin,
} from '@udecode/plate-basic-marks';
import { ELEMENT_BLOCKQUOTE, createBlockquotePlugin } from '@udecode/plate-block-quote';
import { createComboboxPlugin } from '@udecode/plate-combobox';
import {
	Plate,
	PlateLeaf,
	PlateProvider,
	RenderAfterEditable,
	TEditableProps,
	createPluginFactory,
	createPlugins,
	withProps,
} from '@udecode/plate-common';
import { createEmojiPlugin } from '@udecode/plate-emoji';
import { createFontBackgroundColorPlugin, createFontColorPlugin } from '@udecode/plate-font';
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, createHeadingPlugin } from '@udecode/plate-heading';
import { ELEMENT_LINK, createLinkPlugin } from '@udecode/plate-link';
import { ELEMENT_PARAGRAPH, createParagraphPlugin } from '@udecode/plate-paragraph';
import React, { useRef } from 'react';

import { FixedToolbar } from './plate-ui/FixedToolbar';
import { FixedToolbarButtons } from './plate-ui/FixedToolbarButtons';
import { BlockquoteElement } from './plate-ui/BlockquoteElement';
import { HeadingElement } from './plate-ui/HeadingElement';
import { LinkElement } from './plate-ui/LinkElement';
import { LinkFloatingToolbar } from './plate-ui/LinkFloatingToolbar';
import { ParagraphElement } from './plate-ui/ParagraphElement';

type Props = {
	setContent: (content: string) => void;
	name: string;
};

export default function HtmlTextEditor({ setContent, name }: Props) {
	const containerRef = useRef(null);

	const createSerializeHtmlPlugin = createPluginFactory({
		key: 'SerializeHtml',
		handlers: {
			onChange: (editor) => (_value) => {
				const a = serializeHtml(editor, { nodes: editor.children });
				setContent(a);
			},
		},
	});
	const plugins = createPlugins(
		[
			createParagraphPlugin(),
			createHeadingPlugin(),
			createBlockquotePlugin(),
			createBoldPlugin(),
			createItalicPlugin(),
			createUnderlinePlugin(),
			createStrikethroughPlugin(),
			createSubscriptPlugin(),
			createSuperscriptPlugin(),
			createComboboxPlugin(),
			createEmojiPlugin(),
			createFontColorPlugin(),
			createFontBackgroundColorPlugin(),
			createLinkPlugin({
				renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable,
			}),
			createSerializeHtmlPlugin(),
		],
		{
			components: {
				[ELEMENT_PARAGRAPH]: ParagraphElement,
				[ELEMENT_H1]: withProps(HeadingElement, { variant: 'h1' }),
				[ELEMENT_H2]: withProps(HeadingElement, { variant: 'h2' }),
				[ELEMENT_H3]: withProps(HeadingElement, { variant: 'h3' }),
				[ELEMENT_BLOCKQUOTE]: BlockquoteElement,
				[MARK_BOLD]: withProps(PlateLeaf, { as: 'strong' }),
				[MARK_ITALIC]: withProps(PlateLeaf, { as: 'em' }),
				[MARK_UNDERLINE]: withProps(PlateLeaf, { as: 'u' }),
				[MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: 's' }),
				[MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: 'sub' }),
				[MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: 'sup' }),
				[ELEMENT_LINK]: LinkElement,
			},
		}
	);

	const initialValue = [
		{
			type: ELEMENT_PARAGRAPH,
			children: [{ text: '' }],
		},
	];

	return (
		<div className='relative max-w-[900px] border-double'>
			<PlateProvider plugins={plugins} initialValue={initialValue} id={name}>
				<FixedToolbar>
					<FixedToolbarButtons />
				</FixedToolbar>

				<div ref={containerRef} className={cn('relative flex overflow-x-auto')}>
					<Plate
						editableProps={
							{
								autoFocus: false,
								className: cn(
									'relative max-w-full leading-[1.2] px-6 py-6 outline-none [&_strong]:font-bold',
									'!min-h-[200px] w-[900px]'
								),
							} as TEditableProps
						}
					/>
				</div>
			</PlateProvider>
		</div>
	);
}
