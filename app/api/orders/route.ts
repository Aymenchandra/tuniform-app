import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const orders = await prisma.order.findMany();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch orders' });
    }
  } else if (req.method === 'POST') {
    try {
      const { customer_name, email } = req.body;
      if (!customer_name || !email) {
        return res.status(400).json({ message: 'Customer_name and email are required' });
      }

      const order = await prisma.order.create({
        data: { customer_name, email },
      });
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create order' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}