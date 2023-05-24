"use client" 
import Button from "../../../components/Button/index"
import { useForm } from "react-hook-form"
import Link from "next/link";
import axios from "axios"
import * as React from 'react'
import { useRouter } from "next/navigation";


export default function Post({params}) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [item, setItem] = React.useState({}) 
  const [ modal, setModal ] = React.useState(false)
  const { register, handleSubmit } = useForm()

  const router = useRouter()

  React.useEffect(() => {
    const getPost = async () => {
      setIsLoading(true)
    await axios.get('http://localhost:3000/api/post')
      .then((response) => {
          const getItem = response.data.find((p) => p.id === parseInt(params.id))
          setItem(getItem)
      })
      .catch(error => {
        console.error(error.response.data);
      }).finally(() => { setIsLoading(false) })
    }
    getPost()
  }, [params.id]); 


  const  handleDelete = async () => {
  await  axios.delete(`http://localhost:3000/api/post?params=${params.id}`)
    .then(function(response){
      router.push('/')
    })
  }

  const handleClick = () => {
    setModal(!modal)
  }

  const onSubmit = async (data) => {
    await axios.put(`http://localhost:3000/api/post?params=${params.id}`, data) 
    .then(function (response) {
      setItem(response.data)
      setModal(!modal)
    })
    .catch(function (error) {
    console.error('Error:', error);
    });
    }

  if (isLoading) {
      return (
        <div className='w-full flex items-center justify-center mt-60'>
          <div className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
          <span className="sr-only">Cargando...</span>
        </div>
        </div>
      )
    }


  return (
    <div className="w-full h-screen flex items-center justify-center">
      {
        modal ? 
          <div handleClick={handleClick} className="w-full h-full z-20 absolute bg-gray-950/60 flex items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className=" w-[40%] bg-white rounded-md" action="#" method="POST">
              <div className="w-full flex justify-end ">
                <button className="mr-5 mt-5 text-lg font-bold text-blue-800" onClick={() => {handleClick()} }>X</button>
              </div>
              <h2 className="font-bold text-xl text-center">Editar Post</h2>
              <div className="rounded-md shadow-sm -space-y-px flex justify-center items-center">
                <div className="w-[60%] my-10">
                  <div className="flex flex-col gap-3">
                    <input type="text" name="title" {...register('title')} className="border" defaultValue={item?.title} />
                    <input type="text" name="categories" {...register('categories')} className="border" defaultValue={item?.categories[0].title} />
                    <textarea type="text" name="content" {...register('content')} className="border" defaultValue={item?.content} />
                  </div>
                  <Button
                    type="submit"
                    className='mt-4'
                  >
                  Editar
                  </Button>
                </div>
              </div>
            </form>
          </div>
            : null
        }
      <div className="w-[90%] h-full  flex flex-col  justify-center ">
        <div className="!pt-0">
          <div className="mx-auto max-w-screen-md ">
            <h1 className="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
              {item?.title}
            </h1>
          </div>
        </div>
        
        <div>
          <article className="mx-auto max-w-screen-md ">
            <div className="prose mx-auto my-3 dark:prose-invert prose-a:text-blue-600">
              <p> {item?.content} </p>
            </div>
            <div className="mb-7 mt-7 flex justify-center">
              <Link href='/' className="bg-brand-secondary/20 rounded-full px-5 py-2 text-sm text-blue-600 dark:text-blue-500 ">
                ← Ver todos los posts
              </Link>
            </div>
            <div className="flex">
              <button onClick={handleClick} className=" inline-flex items-center px-3 py-2 mr-5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                Editar
              </button>
              <button onClick={handleDelete} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                Eliminar
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

