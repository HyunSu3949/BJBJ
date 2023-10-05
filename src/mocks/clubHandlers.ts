import { rest } from 'msw';
import {
  deleteLike,
  getClubsSortedByLikes,
  likesClub,
  postClubs,
  getLikesClubList,
} from './utils';

export const clubHandlers = [
  rest.post('/clubs', async (req, res, ctx) => {
    const data = await req.json();
    postClubs(data);
    return res(ctx.status(201));
  }),

  rest.get('/clubs', (req, res, ctx) => {
    const sortBy = req.url.searchParams.get('sortby');

    const clubList =
      sortBy === 'likes' ? getClubsSortedByLikes() : getClubsSortedByLikes();
    return res(
      ctx.json({
        code: 1,
        message: '',
        data: {
          totalCount: clubList.length,
          clubList,
        },
      }),
    );
  }),

  rest.post('/likeclubs', async (req, res, ctx) => {
    const { clubId, userId } = await req.json();
    likesClub({ clubId, userId });
  }),

  rest.delete('/likesclubs', async (req, res, ctx) => {
    const clubId = req.url.searchParams.get('clubId');
    const userId = req.url.searchParams.get('userId');
    if (clubId && userId) {
      deleteLike({ clubId, userId });
      return res(
        ctx.json({
          code: 1,
          message: '삭제 완료',
        }),
      );
    } else {
      return res(ctx.status(400));
    }
  }),

  rest.get('/likedClubs/ids', (req, res, ctx) => {
    const userId = req.url.searchParams.get('userId');
    const likesClubList = userId != null ? getLikesClubList({ userId }) : [];
    return res(
      ctx.json({
        code: 1,
        message: '',
        data: {
          totalCount: likesClubList.length,
          likesClubList,
        },
      }),
    );
  }),

  rest.get('/members/ids', (req, res, ctx) => {
    const userId = req.url.searchParams.get('userId');
  }),
];
