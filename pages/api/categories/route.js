import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
const prisma = new PrismaClient()

export async function GET () {
  const categories = await prisma.category.findMany({
    include: {posts: true}
  })
  const data = JSON.stringify(posts)
  return new NextResponse(data)
}
