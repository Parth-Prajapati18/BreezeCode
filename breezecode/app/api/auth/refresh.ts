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
  if (req.method === 'POST') {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh Token is required' });
    }

    try {
      // Verify the refresh token
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);

      // Check if the token is stored in the database and still valid
      const storedToken = await prisma.user.findUnique({
        where: { refreshToken },
      });

      if (!storedToken || !decoded) {
        return res.status(401).json({ message: 'Invalid OR Expired refresh token' });
      }

      // Generate a new access token
      const newAccessToken = jwt.sign(
        { userId: storedToken.id, role: storedToken.role },
        process.env.JWT_ACCESS_SECRET!,
        { expiresIn: '15m' }
      );

      res.status(200).json({
        accessToken: newAccessToken,
      });

    } catch (error) {

      res.status(403).json({ message: 'Invalid or Expired refresh token' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
