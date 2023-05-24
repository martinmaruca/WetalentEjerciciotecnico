import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler (req, res) {

    const { method } = req
    const {title, content, categories} = req.body
    const {params} = req.query

    
    switch (method) {
        case 'GET':
            const posts = await prisma.post.findMany({include:{categories:true}})
            res.status(201).json(posts)
            break 
            case 'POST':
                const category = await prisma.category.findUnique({where:{title:categories}})
                const post = await prisma.post.create({
                data:{
                    title: title,
                    content: content,
                    categories: {
                        connectOrCreate:{
                            where: {
                                id:category?.id || -1,
                            }, create:{title:categories}, 
                        }
                    }
                }
            })
            res.status(201).json(post)
            break
        case 'PUT':
            const categoryPut = await prisma.category.findUnique({where:{title:categories}})
            const putData = await prisma.post.update({
                where: {
                    id: Number(params)
                },
                data:{
                    title: title,
                    content: content,
                    categories: {
                        connectOrCreate:{
                            where: {
                                id:categoryPut?.id || -1,
                            }, create:{title:categories}
                        }
                    }
            }})
            res.status(201).json(putData)
            break    
        case 'DELETE':
            const deleteData = await prisma.post.delete({
                where: {
                    id: Number(params)
                }
            })
            res.status(200).json({success:'post deleted'})
            break    
        default:
            res.setHeader('Allow', ['GET','POST', 'PUT' ,'DELETE'])
            res.status(405).end(`Method ${method} Not Allowed`)
            
    }
}
