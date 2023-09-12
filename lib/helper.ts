import { ALL } from '@/config';
import { IOption } from '@/model/IOption';

export function compareIgnoreCase(fieldValue: string | number, value: string | number) {
	return fieldValue.toString().toLowerCase() === value.toString().toLocaleLowerCase();
}

export const addAllOption = (options: IOption[]) => [{ label: ALL, value: ALL }, ...options];

export const convertAll = (value: string) => (value === ALL ? '' : value);

export function getFileName(header: Headers, fallback: string | undefined = '') {
	return header.get('content-disposition')?.split('filename=')[1]?.split(';')[0] || fallback;
}

export const downloadBlob = (file: Blob, filename: string) => {
	const url = window.URL.createObjectURL(file);
	downloadLink(url, filename);
	window.URL.revokeObjectURL(url);
};

export const downloadLink = (url: string, filename: string) => {
	const a = document.createElement('a');
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
};
