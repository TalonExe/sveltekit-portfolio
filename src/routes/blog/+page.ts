import type { PageLoad } from './$types';
import type { BlogListEntry, BlogMetadata } from '$lib';

const postModules = import.meta.glob('../../posts/*.svx', { eager: true });

const mapPathToSlug = (path: string) => path.split('/').pop()?.replace('.svx', '') ?? '';

export const load: PageLoad = async () => {
	const posts: BlogListEntry[] = Object.entries(postModules)
		.map(([path, resolver]) => {
			const module = resolver as { metadata: BlogMetadata };

			return {
				slug: mapPathToSlug(path),
				metadata: module.metadata
			};
		})
		.filter((post) => post.metadata?.published !== false)
		.sort((a, b) => {
			const timeA = new Date(a.metadata.date).getTime();
			const timeB = new Date(b.metadata.date).getTime();
			return timeB - timeA;
		});

	return { posts };
};
