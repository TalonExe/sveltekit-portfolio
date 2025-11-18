export interface BlogMetadata {
	title: string;
	date: string;
	description: string;
	tags?: string[];
	hero?: string;
	published?: boolean;
	minutesToRead?: number;
}

export interface BlogListEntry {
	slug: string;
	metadata: BlogMetadata;
}
