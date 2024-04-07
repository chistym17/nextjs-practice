
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        
        
        const newUser = await prisma.user.create({
            data: {
                firstname: body.firstname,
                password: body.password,
            },
        });

        return NextResponse.json({ user: newUser });
    } catch (error) {
        console.error("Error saving user data:", error);
        return NextResponse.error(new Error('Internal Server Error'));
    } finally {
        await prisma.$disconnect();
    }
}
