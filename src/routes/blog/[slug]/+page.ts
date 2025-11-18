import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { BlogMetadata } from '$lib';

const postModules = import.meta.glob('../../../posts/*.svx', { eager: true });

export const load: PageLoad = async ({ params }) => {
	const { slug } = params;
	const match = Object.entries(postModules).find(([path]) => path.endsWith(`${slug}.svx`));

	if (!match) {
		throw error(404, `Post "${slug}" not found.`);
	}

	const module = match[1] as { metadata: BlogMetadata };

	return {
		slug,
		metadata: module.metadata
	};
};
