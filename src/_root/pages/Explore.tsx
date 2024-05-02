import { Loader } from '@/components/shared';
import GridPostList from '@/components/shared/GridPostList';
import PostStats from '@/components/shared/PostStats';
import SearchResults from '@/components/shared/SearchResults';
import { Input } from '@/components/ui/input';
import useDebounce from '@/hooks/useDebounce';
import { useGetPosts, userSearchPosts } from '@/lib/react-query/queriesandMutations';
import  { useState } from 'react';

const Explore = () => {
  const {data:posts, fetchNextPage, hasNextPage } = useGetPosts();


  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce(searchValue, 500);
  const {data: searchPosts, isFetching: isSearchFetching } = userSearchPosts(debouncedValue);

  if(!posts){
    return (
      <div className='flex-center w-full h-full'>
        <Loader/>
      </div>
    )
  }
   
  const shouldShowSearchResults = searchValue !=='';
  const shouldShowPosts = !shouldShowSearchResults && posts.pages.every(
    (item) => {item.documents.length ===0}  )
  
  return (
    <div className='explore-contianer'>
    <div className='explore-inner_container'>
      <h2 className="h3-bold md:h2-bold w-full">
        Search Posts
      </h2>
      <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
        <img src="/assets/icons/search.svg" width={24} height={24} alt="search" />
        <Input 
        type='text'
        placeholder='Search'
        className='explorer-search'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}  />
      </div> 
      </div>
        <div className='flex-between w-full max-w5xl mt-16 mb-7'>
          <h3 className='body-bold md:h3-bold'>Popular Today</h3>
          <div className='flex-center gap-3 b-dark-3 rounded-xl px-4 py-2 cursor-pointer'>
              <p className='small-medium md:base-medium text-light'>
                All
              </p>
              <img 
              src="/assets/icons/filter.svg"
              width={20}
              height={20}
              alt="filter"
              />
          </div>
        </div>
        <div className='flex flex-wrap gap-9 w-full max-w-5xl'>
              {shouldShowSearchResults ? (
                <SearchResults
                    isSearchFetching = {isSearchFetching}
                    searchPosts = {searchPosts}
                />
              ) : shouldShowPosts ? (
                <p className='text-light-4 mt-10 text-center w-full'>End of Posts</p>
              ) : posts.pages.map((item, index) => (
                <GridPostList key={`page-${index}`} posts={item.documents} />
              ))}
        </div>
    </div>
  )
}

export default Explore