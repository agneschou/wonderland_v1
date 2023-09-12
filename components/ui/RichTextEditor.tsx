'use client';
import { cn } from '@/lib/utils';
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
	createDeserializeHtmlPlugin,
	createPlateEditor,
	createPlugins,
	deserializeHtml,
	withProps,
} from '@udecode/plate-common';
import { createEmojiPlugin } from '@udecode/plate-emoji';
import { createFontBackgroundColorPlugin, createFontColorPlugin } from '@udecode/plate-font';
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, createHeadingPlugin } from '@udecode/plate-heading';
import { ELEMENT_LINK, createLinkPlugin } from '@udecode/plate-link';
import { ELEMENT_PARAGRAPH, createParagraphPlugin } from '@udecode/plate-paragraph';
import { useMemo } from 'react';
import { BlockquoteElement } from '../plate-ui/BlockquoteElement';
import { FixedToolbar } from '../plate-ui/FixedToolbar';
import { FixedToolbarButtons } from '../plate-ui/FixedToolbarButtons';
import { HeadingElement } from '../plate-ui/HeadingElement';
import { LinkElement } from '../plate-ui/LinkElement';
import { LinkFloatingToolbar } from '../plate-ui/LinkFloatingToolbar';
import { ParagraphElement } from '../plate-ui/ParagraphElement';
import { SerializeHtmlTool } from '../plate-ui/SerializeHtmlTool';

type Props = {
	initialContent?: string;
	onChange: (content: string) => void;
	name: string;
};

const pluginComponents = {
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
};
const createPluginFuncs = [
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
];

export function RichTextEditor({ initialContent = '', onChange, name }: Props) {
	const plugins = useMemo(() => createPlugins(createPluginFuncs, pluginComponents), []);

	return (
		<div className='relative w-full border border-input rounded-md'>
			<PlateProvider plugins={plugins} id={name}>
				<FixedToolbar>
					<FixedToolbarButtons />
				</FixedToolbar>
				<div className={cn('relative flex overflow-x-auto')}>
					<Plate
						editableProps={{
							className: cn(
								'relative max-w-full leading-[1.2] px-6 py-6 outline-none [&_strong]:font-bold',
								'!min-h-[200px] w-full'
							),
							autoFocus: false,
						}}
					>
						{/* <SerializeHtmlTool onChange={onChange} /> */}
					</Plate>
				</div>
			</PlateProvider>
		</div>
	);
}
