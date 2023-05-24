import axios from 'axios'
import Button from '../Button'
import NewPostForm from '../NewPostForm'
import PostSmall from '../PostSmall'
import { useState, useEffect } from 'react'

export default function Home() {
  const [ isLoading, setIsLoading] = useState(false)
  const [ modal, setModal ] = useState(false)
  const [category, setCategory] = useState([])
  const [ posts, setPosts ] = useState([])
  const [ postsFiltered, setPostsFiltered] = useState([])

  const getCategories = async () => {
  await axios.get('http://localhost:3000/api/categories')
    .then(function (response) {
        setCategory(response.data)
    })
    .catch(error => {
      console.error(error.message);
    })
  }

  const getposts = async () => {
    setIsLoading(true)
  await axios.get('http://localhost:3000/api/post')
    .then(function (response) {
        setPosts(response.data)
        setPostsFiltered(response.data)
    })
    .catch(error => {
      console.error(error.message);
    }).finally(() => {setIsLoading(false)})
  }

  useEffect(() => {
    getposts()
    getCategories()
  }, []); 

  const handleCategories = (e) => {
    const categoryId = e.target.value
    if(categoryId === ''){
      setPostsFiltered(posts)
      return
    }
    setPostsFiltered(() => {
      return(
        posts.filter(p => {
          return(
            p.categories.some(c => c.id == categoryId)
          )
        })
      )
    })

  }

  const handleClick = () => {
    setModal(!modal)
  }

  return (
    <>
      <div >
          {
            modal ? <NewPostForm handleClick={handleClick} /> : null
          }
        <div className=' w-[90%] max-w-2xl mx-auto'>
          <div className='pt-10'>
            <Button onClick={handleClick}>
              Nuevo Post 
            </Button>
          </div>
          <div>
            <form className='mt-5'>
                <div className="flex">
                    <select onChange={handleCategories} className="flex-1 z-10 items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100">
                      <option value="">Ver Todos</option>
                      {category.map ((c) => {
                        return (
                          <option key={c.id} value={c.id}> {c.title} </option>
                        )
                      }) }
                    </select>
                </div>
            </form>
          </div>
        </div>
        <PostSmall posts={postsFiltered} isLoading={isLoading} />
      </div>
    </>
  )
}

