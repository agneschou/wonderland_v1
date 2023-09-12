import { KEY_MAP } from '@/config';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);

	const url = searchParams.get(KEY_MAP.url);

	if (!url) {
		return new Response('Not found', { status: 404 });
	}
	const response = await fetch(url);

	return new Response(response.body, {
		headers: {
			...response.headers,
		},
	});
}
