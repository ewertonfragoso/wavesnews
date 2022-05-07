
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import Head from 'next/head'
import Layout from '../../components/Layout'
import { getPost, Post } from '../../services/content'

const renderOptions = {
    renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node, children) => (
            <img className="mt-10 mb-10" src={node.data.target.fields.file.url} height={node.data.target.fields.file.details.height} width={node.data.target.fields.file.details.width} alt="content image"/>
        ),
        [BLOCKS.PARAGRAPH]: (node, children) => (
            <p className="mt-2 mb-4">{children}</p>
        )
    }
}

type Props = {
    post: Post
}

export default function PostPage({ post }: Props) {
    return (
        <Layout title="">
            <div>
                <Head>
                    <title> {post.fields.title} | Wave News </title>
                    <meta name="description" content="Surf Blog" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className="w-full m-auto min-h-[21.5rem] mt-[-5rem] relative overflow-hidden">
                    <div className="w-full">
                        <img alt="Post thumbnail" src={post.fields.bigThumbnail.fields.file.url} className="w-full h-[26rem] object-cover bg-[#e5eef2]"/>
                        <div className="absolute w-full py-2.5 bottom-0 inset-x-0 text-white  xs:text-[2rem] sm:text-[3rem] md:text-[4rem] text-center drop-shadow-lg">{post.fields.title}</div>
                    </div>
                </div>
                <div className="w-4/5 min-h-[21.5rem] mt-[2rem] m-auto whitespace-pre-wrap">
                    {documentToReactComponents(post.fields.content, renderOptions )}
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ query }) {
    const post = await getPost(query.id);
  
    return {
      props: {
        post
      }
    }
  }

