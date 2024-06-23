'use server'

import { z } from 'zod'
import { insertReviewSchema } from '../validator'
import { auth } from '@/auth'
import db from '@/db/drizzle'
import { and, count, desc, eq, sql } from 'drizzle-orm'
import { products, reviews } from '@/db/schema'
import { revalidatePath } from 'next/cache'
import { formatError } from '../utils'
import { PAGE_SIZE } from '../constants'

export async function createUpdateReview(
  data: z.infer<typeof insertReviewSchema>
) {
  try {
    const session = await auth()
    if (!session) throw new Error('User is not authenticated')

    const review = insertReviewSchema.parse({
      ...data,
      userId: session?.user.id,
    })
    const product = await db.query.products.findFirst({
      where: eq(products.id, review.productId),
    })
    if (!product) throw new Error('Product not found')

    const reviewExists = await db.query.reviews.findFirst({
      where: and(
        eq(reviews.productId, review.productId),
        eq(reviews.userId, review.userId)
      ),
    })
    await db.transaction(async (tx) => {
      if (reviewExists) {
        await tx
          .update(reviews)
          .set({
            description: review.description,
            title: review.title,
            rating: review.rating,
          })
          .where(eq(reviews.id, reviewExists.id))
      } else {
        await tx.insert(reviews).values(review)
      }
      const averageRating = db.$with('average_rating').as(
        db
          .select({ value: sql`avg(${reviews.rating})`.as('value') })
          .from(reviews)
          .where(eq(reviews.productId, review.productId))
      )
      const numReviews = db.$with('num_reviews').as(
        db
          .select({ value: sql`count(*)`.as('value') })
          .from(reviews)
          .where(eq(reviews.productId, review.productId))
      )
      await tx
        .with(averageRating, numReviews)
        .update(products)
        .set({
          rating: sql`(select * from ${averageRating})`,
          numReviews: sql`(select * from ${numReviews})`,
        })
        .where(eq(products.id, review.productId))
    })

    revalidatePath(`/product/${product.slug}`)
    return {
      success: true,
      message: 'Review updated successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    }
  }
}

export async function getReviews({
  productId,
  limit = PAGE_SIZE,
  page,
}: {
  productId: string
  limit?: number
  page: number
}) {
  const data = await db.query.reviews.findMany({
    where: eq(reviews.productId, productId),
    with: { user: { columns: { name: true } } },
    orderBy: [desc(reviews.createdAt)],
    limit,
    offset: (page - 1) * limit,
  })
  const dataCount = await db
    .select({ count: count() })
    .from(reviews)
    .where(eq(reviews.productId, productId))
  return {
    data,
    totalPages: Math.ceil(dataCount[0].count / limit),
  }
}

export const getUserReviewByProductId = async ({
  productId,
}: {
  productId: string
}) => {
  const session = await auth()
  if (!session) throw new Error('User is not authenticated')

  return await db.query.reviews.findFirst({
    where: and(
      eq(reviews.productId, productId),
      eq(reviews.userId, session?.user.id!)
    ),
  })
}
