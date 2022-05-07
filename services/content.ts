import { Document } from "@contentful/rich-text-types";
import Contentful, { createClient, Entry } from "contentful";

export type Post = Entry<{
    title: Contentful.EntryFields.Text,
    description: Contentful.EntryFields.Text,
    thumbnail: Contentful.Asset,
    bigThumbnail: Contentful.Asset,
    content: Document,
    fromSite: Contentful.EntryFields.Text,
}>;

const client = createClient({
    accessToken: process.env.CONTENTFUL_TOKEN,
    space: process.env.CONTENTFUL_SPACE,
});

export async function getPosts(): Promise<Contentful.Entry<Post>[]> {
    const { items } = await client.getEntries<Post>({
        content_type: 'post',
    });
    return items;
}

export async function getPost(postId): Promise<Contentful.Entry<Post>> {
    const post = await client.getEntry<Post>(postId);
    return post;
}