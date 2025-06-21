import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const orders = await prisma.order.findMany();
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer_name, email } = body;

    if (!customer_name || !email) {
      return NextResponse.json(
        { message: 'customer_name and email are required' },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: { customer_name, email },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create order' }, { status: 500 });
  }
}

