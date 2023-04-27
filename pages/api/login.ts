// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  success: boolean;
};

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let cookie: string = 'user-token=user; path=/; samesite=lax; httponly;';
  res.setHeader('set-cookie', cookie);
  res.status(200).json({ success: true });
}
