import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handlerhandler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {

        const { email, firstName, lastName, password } = req.body;

        if (!email || !firstName || !lastName || !password) {
            return res.status(400).send('All fields are required');
        }

        try {

            const existingUser = await prisma.user.findUnique({
                where: { email: email },
            });

            if (existingUser) {
                return res.status(409).json({ message: 'User already exists' });
            }

            // Hash the password
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            const user = await prisma.user.create({
                data: {
                    email: email,
                    password: hashedPassword,
                    firstName: firstName,
                    lastName: lastName,
                    role: 'USER',
                },
            });

            res.status(201).json({
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