import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: {
        email: string;
        role: string;
    };
}

interface ErrorResponse {
    message: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<LoginResponse | ErrorResponse>
) {

    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {

            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });

            if (!user || !bcrypt.compareSync(password, user.password)) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Create JWT tokens
            const accessToken = jwt.sign(
                { userId: user.id, role: user.role },
                process.env.JWT_ACCESS_SECRET!,
                { expiresIn: '4h' }
            );

            const refreshToken = jwt.sign(
                { userId: user.id, role: user.role },
                process.env.JWT_REFRESH_SECRET!,
                { expiresIn: '7d' }
            );

            await prisma.user.update({
                where: { id: user.id },
                data: { refreshToken },
            });
            res.status(200).json({
                accessToken,
                refreshToken,
                user: {
                    email: user.email,
                    role: user.role,
                },
            });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong' });
        }
        
    } else {

        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}