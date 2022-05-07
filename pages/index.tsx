import Head from 'next/head'
import Router from 'next/router';
import { useCallback } from 'react';
import Layout from '../components/Layout'
import PostCard from '../components/PostCard'
import { getPosts, Post } from '../services/content'

type Props = {
  posts: Post[]
}

export default function Home( {posts: listOfPosts }: Props ) {

  const [firstPost, ...posts] = listOfPosts;

  const handleJumbotronPost = useCallback(() => {
    Router.push(`/post/${firstPost.sys.id}`)
  }, [])
  
  return (
    <div>
      <Head>
        <title>Wave News | Home</title>
        <meta name="description" content="Surf Blog " />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-4/5 m-auto bg-white mt-[-42px] min-h-[21.5rem] p-6 md:p-14 flex flex-wrap-reverse justify-around cursor-pointer rounded-[3rem]" onClick={handleJumbotronPost}>
        <div className="w-[38.75rem] max-h-80">
          <h2 className="font-bold text-[#232323] text-4xl mb-[0.625rem]">{firstPost.fields.title}</h2>
          <p className="text-lg">{firstPost.fields.description}</p>
        </div>
        <div className="w-[35.625rem] max-h-80">
          <img alt="thumbnail" className="drop-shadow-md hover:opacity-80 w-full h-full object-cover rounded-[1.25rem]" src={firstPost.fields.thumbnail.fields.file.url}/>
        </div>
      </div>

      <div className="max-w-[80%] m-auto flex gap-16 flex-wrap justify-center">
        {posts.map((post) => (
          <PostCard key={`post-${post.sys.id}`} post={post}/>
        ))}
      </div>
    </div>
  )
}

Home.getLayout = function getLayout(page) {
  return <Layout title="Home">{page}</Layout>
}

export async function getServerSideProps() {
  const posts = await getPosts();

  return {
    props: {
      posts
    }
  }
}