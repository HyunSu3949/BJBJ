import { rest } from 'msw';

export const handlers = [
  rest.get('/users', (req, res, ctx) => {
    return res(
      ctx.json({
        code: 1,
        message: '',
        data: {
          user_id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
          user_name: 'ahs',
          user_email: 'ahs112@naver.com',
          img_url: '',
        },
      }),
    );
  }),

  rest.get('/clubs/likes', (req, res, ctx) =>
    res(
      ctx.json({
        code: 1,
        message: '',
        data: {
          totalCount: 3,
          clubList: [
            {
              id: '1',
              title: '오만과편견 독서모임1',
              contents: '11111',
              imgUrl: '1.png',
              tags: '소모임 오프라인',
              likes: 30,
            },
            {
              id: '2',
              title: '오만과편견 독서모임2',
              contents: '2',
              imgUrl: '2.png',
              tags: '소모임 오프라인',
              likes: 20,
            },
            {
              id: '3',
              title: '오만과편견 독서모임3',
              contents: '3',
              imgUrl: '3.png',
              tags: '소모임 오프라인',
              likes: 10,
            },
          ],
        },
      }),
    ),
  ),

  rest.get('/feeds/likes', (req, res, ctx) =>
    res(
      ctx.json({
        code: 1,
        message: '',
        data: {
          totalCount: 3,
          feedList: [
            {
              id: '1',
              contents: '11111',
              likes: 30,
              commentCount: 3,
            },
            {
              id: '2',
              contents: '22222',
              likes: 20,
              commentCount: 3,
            },
            {
              id: '3',
              contents: '33333',
              likes: 10,
              commentCount: 3,
            },
          ],
        },
      }),
    ),
  ),
];
