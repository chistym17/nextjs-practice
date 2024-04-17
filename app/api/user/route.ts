import { hash } from 'bcrypt';//the user api to create new users in db
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  try {
    const user = await prisma.user.findUnique({

      where: {
        email: email,
      }

    })
    if (user) return NextResponse.json({ message: 'user already exits' })

    const hashedpass = await hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        firstname:'jh',
        lastname:'aaa',
        email: email,
        password: hashedpass,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ message: 'Internal Server Error' });
  }

}








// export async function post(req, res) {
//   const { email, password } = req.body;

//   try {
//     const existingUser = await prisma.user.findUnique({
//       where: {
//         email: email,
//       },
//     });

//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await hash(password, 10);

//     const newUser = await prisma.user.create({
//       data: {
//         email: email,
//         password: hashedPassword,
//       },
//     });

//     return res.status(201).json(newUser);
//   } catch (error) {
//     console.error('Error registering user:', error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// }
