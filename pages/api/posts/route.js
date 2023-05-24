import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
const prisma = new PrismaClient()

export async function GET () {
  const posts = await prisma.post.findMany({
    include: {
      categories: true
    }
  })
  const data = JSON.stringify(posts)
  return new NextResponse(data)
}
