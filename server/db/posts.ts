import type MongoClient from "mongodb"

export async function getPosts(db: MongoClient.Db, options?: { includeDrafts: boolean }) {
    const drafts = (options?.includeDrafts ?? false) ? { } : { draft: false }

    const posts = await db.collection('posts')
        .find({...drafts})
        .project({ _id: 0, image: 1, slug: 1, featured: 1, updated_at: 1, categories: 1, title: 1, draft: 1 })
        .sort({ age: -1, created_at: -1 })
        .toArray()

    return posts
}

export async function getPost(db: MongoClient.Db, slug: string) {
    const posts = await db.collection('posts')
        .find({slug})
        .limit(1)
        .project({ _id: 0, slug: 1, title: 1, image: 1, content: 1, published_at: 1, created_at: 1, uploaded_at: 1, categories: 1, relatedPosts: 1, draft: 1 })
        .toArray()

    const post = posts[0]

    if(!post) return undefined

    post.relatedPosts = await db.collection('posts')
        .find({_id: { "$in": post.relatedPosts }})
        .limit(5)
        .project({ _id: 0, title: 1, slug: 1 })
        .toArray()

    return post
}