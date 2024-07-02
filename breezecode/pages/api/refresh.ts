import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

interface TokenResponse {
  accessToken: string;
}

interface ErrorResponse {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TokenResponse | ErrorResponse>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { refreshToken } = req.body;

  console.log("Refresh Token endpoint called");

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh Token is required' });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);

    if (typeof decoded !== 'object' || !('userId' in decoded)) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    // Check if the token is stored in the database and still valid
    const user = await prisma.user.findUnique({
      where: { refreshToken },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid or expired refresh token' });
    }

    // Generate a new access token
    const newAccessToken = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: '15m' }
    );

    res.status(200).json({
      accessToken: newAccessToken,
    });

  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(403).json({ message: 'Invalid or expired refresh token' });
  } finally {
    await prisma.$disconnect();
  }
}
