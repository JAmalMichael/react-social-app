import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { useGetRecentPosts } from "@/lib/react-query/queriesandMutations";
import { Models } from "appwrite";


function Home() {

const {data: posts, isPending: isPostLoading} = useGetRecentPosts();

  return (
    <div className="home-container">
    <div className="home-posts">
      <h2 className="h3-bold md:h2-bold text-left w-ful">
        Home Feed
        {isPostLoading && !posts ? (
          <Loader />
        ) : (
          <ul className='flex flex-col flex-1 gap-9 w-full'>
            {posts?.documents.map((post: Models.Document) => (
              <li key={post.$id} className="flex justify-center w-full">
                <PostCard post={post} key={post.caption} />
                </li>
            ))}
          </ul>
        )}
      </h2>
    </div>
    </div>


  )
}

export default Home