import { TrackUriRegex } from '$lib/regex';
import { trackNotFound } from '$lib/server/responses';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, url }) => {
	if (!params.trackUri) {
		return trackNotFound('not given');
	}
	const match = params.trackUri.match(TrackUriRegex);
	if (!match) {
		return trackNotFound(params.trackUri);
	}
	const trackId = match[1];
	url.pathname = `/lyrics/${trackId}`;
	return redirect(301, url);
};
