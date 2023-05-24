import Button from "../Button"
import { useForm } from "react-hook-form"
import axios from "axios"

export default function NewPostForm({handleClick}) {

  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    console.log(data)
    await axios.post('/api/post', data) 
    .then(function (response) {
    handleClick()
  })
  .catch(function (error) {
    console.error('Error:', error);
  });
  console.log(data)
  }

  
  return (
    <div className="w-full h-full z-20 absolute bg-gray-950/60 flex items-center justify-center">
    <form onSubmit={handleSubmit(onSubmit)} className=" w-[40%] bg-white rounded-md" action="#" method="POST">
      <div className="w-full flex justify-end ">
      <button className="mr-5 mt-5 text-lg font-bold text-blue-800" onClick={() => {handleClick()} }>X</button>
      </div>
      <h2 className="font-bold text-xl text-center">Nuevo Post</h2>
      <div className="rounded-md shadow-sm -space-y-px flex justify-center items-center">
        <div className="w-[60%] my-10">
          <div className="flex flex-col gap-3">
          <input type="text" name="title" {...register('title')} className="border" placeholder=" titulo"/>
          <input type="text" name="categories" {...register('categories')} className="border" placeholder=" categoria"/>
          <textarea type="text" name="content" {...register('content')} className="border" placeholder=" contenido"/>
          </div>
          <Button
            type="submit"
            className='mt-4'
          >
            Crear
          </Button>
        </div>
      </div>
    </form>
    </div>
  )
}