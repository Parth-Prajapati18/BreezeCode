import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse ) {

    if (req.method !== 'GET'){
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { slug, chapNumber } = req.query;

    try {

      const course = await prisma.course.findFirst({
        where: { 
          title: String(slug) 
        },
      });

      const chapter = await prisma.chapter.findMany({
        where: {
          courseId: course?.id
        }
      });

      const pagination = {
        totalPages: chapter.length,
        currentPage: chapNumber,
        previousPage: Number(chapNumber) - 1,
      }

      if (!course){
        return res.status(404).json({ error: 'Course not found' });
      }

      res.status(200).json({chapter: chapter[Number(chapNumber)], pagination});

    } catch (err){
    
      res.status(500).json({ error: 'An error occurred while fetching the course' });
    
    }
  }