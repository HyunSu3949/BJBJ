import { rest } from 'msw';
// import { db } from '../db';
import { db } from '../empty_db';

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
    const url = `http://localhost:3000/pre-singed-url/${imageName}`;
    return res(
      ctx.json({
        code: 1,
        message: '',
        data: { url },
      }),
    );
  }),
  rest.put('/pre-singed-url/:imgName', (req, res, ctx) => {
    return res(
      ctx.json({
        code: 1,
        message: '이미지 등록 완료',
      }),
    );
  }),
];
