'use client';
import { useEditorState } from '@udecode/plate-common';
import { serializeHtml } from '@udecode/plate-serializer-html';
import { useEffect } from 'react';

export function SerializeHtmlTool({ onChange }: { onChange: (content: string) => void }) {
	const editor = useEditorState();

	useEffect(() => {
		if (!editor || !editor.children) return;
		const html = serializeHtml(editor, {
			nodes: editor.children,
		});
		console.log(html);

		onChange(html);
	}, [editor, editor.children, onChange]);

	return <></>;
}
