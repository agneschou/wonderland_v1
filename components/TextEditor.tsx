'use client';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { ClientProvider } from './ClientProvider';
const toolbarOptions = [
	['bold', 'italic', 'underline', 'strike'], // toggled buttons
	['blockquote', 'code-block'],

	[{ header: [1, 2, 3, 4, 5, 6, false] }], // custom button values
	[{ list: 'ordered' }, { list: 'bullet' }],
	[{ script: 'sub' }, { script: 'super' }], // superscript/subscript
	[{ indent: '-1' }, { indent: '+1' }], // outdent/indent
	[{ direction: 'rtl' }], // text direction

	[{ color: [] }, { background: [] }], // dropdown with defaults from theme
	[{ font: [] }],
	[{ align: [] }],

	['clean'],
];

interface ITextEditorProps {
	value: string;
	onChange: (content: string) => void;
	validateTextLength?: (length: number) => boolean;
	className?: string;
}

// export function TextEditor(props: ITextEditorProps) {
// 	console.log(!!document);

// 	if (typeof window === 'undefined' || typeof document === 'undefined') return null;
// 	return (
// 		<ClientProvider>
// 			<TextEditorCore {...props} />
// 		</ClientProvider>
// 	);
// }

export function TextEditor({ value, onChange, validateTextLength, className }: ITextEditorProps) {
	const editorRef = useRef<ReactQuill>(null);

	useEffect(() => {
		if (!editorRef.current || !validateTextLength) return;
		validateTextLength(editorRef.current.getEditor().getText().replaceAll('\n', '').length);
	}, [editorRef, validateTextLength]);
	return (
		<ReactQuill
			ref={editorRef}
			className={cn('flex flex-col h-[250px]', className)}
			value={value}
			onChange={(value) => onChange(value)}
			modules={{
				toolbar: toolbarOptions,
			}}
			theme='snow'
		/>
	);
}
