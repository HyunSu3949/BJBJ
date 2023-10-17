import { rest } from 'msw';
import { db } from '../db';

export const authHandlers = [
  rest.get('/users', (req, res, ctx) => {
    const token = req.headers.get('Access_Token') || '0';
    const userProfile = { ...db.users.find(user => user.userId == token) };
    if (userProfile.id) delete userProfile.id;
    return res(
      ctx.json({
        code: 1,
        message: '',
        data: userProfile,
      }),
    );
  }),

  rest.post('/s3', async (req, res, ctx) => {
    const body = await req.json();
    const imageName = body.imageName;
    const url = `http://pre-singed-url/${imageName}`;
    return res(
      ctx.json({
        code: 1,
        message: '',
        data: { url },
      }),
    );
  }),
];
