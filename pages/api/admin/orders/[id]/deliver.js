import { getSession } from 'next-auth/react';
import Order from '../../../../../models/Order';
import db from '../../../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('Error: signin required');
  }
  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    order.Delivered = true;
    order.DeliveredAt = Date.now();
    const deliveredOrder = await order.save();
    await db.disconnect();
    res.send({
      message: 'Order Delivered Successfully',
      order: deliveredOrder,
    });
  } else {
    await db.disconnect();
    res.status(400).send({ message: 'Error: Order not found' });
  }
};

export default handler;
