export function createPostRequest(authToken: string, body: object, isCache: boolean = false) {
	return {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			...(authToken && { Authorization: `Bearer ${authToken}` }),
		},
		body: JSON.stringify(body),
		cache: isCache ? 'force-cache' : 'no-store',
	} as RequestInit;
}
export function createPostFormDataRequest(authToken: string, body: FormData, isCache: boolean = false) {
	return {
		method: 'POST',
		headers: {
			...(authToken && { Authorization: `Bearer ${authToken}` }),
		},
		body: body,
		cache: isCache ? 'force-cache' : 'no-store',
	} as RequestInit;
}

export function createGetRequest(authToken: string) {
	return {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			...(authToken && { Authorization: `Bearer ${authToken}` }),
		},
	};
}
