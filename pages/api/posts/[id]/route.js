import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
const prisma = new PrismaClient()
export async function GET (request, { params }) {
  const { id } = params
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id)
    },
    include: {
      categories: true
    }
  })
  const data = JSON.stringify(post)
  return new NextResponse(data)
}
