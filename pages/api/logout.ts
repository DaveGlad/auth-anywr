// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  success: boolean;
};

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.setHeader('Set-Cookie', [
    'user-token=deleted; path=/; samesite=lax; httponly; Max-Age=0',
  ]);
  res.status(200).json({ success: true });
}
