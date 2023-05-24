import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler (req, res) {

    const { method } = req
    /* const {title, content, categories} = req.body */

    switch (method) {
        case 'GET':
            const category = await prisma.category.findMany()
            res.status(201).json(category)
            break 
        /* case 'POST':
            const post = await prisma.post.create({
                data:{
                    title: title,
                    content: content,
                    categories: {
                        create:{
                            title:categories,
                        }
                    }
                }
            })
            res.status(201).json(post)
            break
        case 'PUT':
            const putData = await prisma.post.put({
                data:{
                    title: title,
                    content: content,
                    categories: {
                        create:{
                            title:categories,
                        }
                    }
            }})
            break    
        case 'DELETE':
            const {params} = req.query
            const deleteData = await prisma.post.delete ({
                where: {
                    id: Number(params)
                }
            })
            break     */
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
            
    }
}