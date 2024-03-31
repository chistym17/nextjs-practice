// api/user.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        
        // Create a new user in the database
        const newUser = await prisma.user.create({
            data: {
                firstname: body.username,
                password: body.password,
            },
        });

        return NextResponse.json({ user: newUser });
    } catch (error) {
        console.error("Error saving user data:", error);
        return NextResponse.error(new Error('Internal Server Error'));
    } finally {
        // Close Prisma client to release resources
        await prisma.$disconnect();
    }
}
