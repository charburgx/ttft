import type {ObjectId} from 'mongodb'

type Post = {
    _id?: ObjectId;
    slug: string;
    title: string;
    image: string | null;
    content: string;
    draftContent: string;
    draft: boolean;
    published_at: string /* Date */ | null;
    featured: boolean;
    deleted_at: string /* Date */;
    created_at: string /* Date */ | null;
    updated_at: string /* Date */ | null;
    categories: string[];
    relatedPosts: Pick<Post, "slug" | "title">[]
};
