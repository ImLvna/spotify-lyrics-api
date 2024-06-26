import { SongLinkRegex } from '$lib/regex';
import { trackNotFound } from '$lib/server/responses';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	if (!params.songLink) {
		return trackNotFound('not given');
	}
	console.log(params.service);
	const match = params.songLink.match(SongLinkRegex);
	if (!match) {
		return trackNotFound(params.songLink);
	}
	const trackId = match[1];
	return redirect(301, `/lyrics/${trackId}/${params.service || 'spotify'}`);
};
