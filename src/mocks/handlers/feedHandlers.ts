import { rest } from 'msw';
import { getClubFeeds, getFeedsSortedBylikes } from '../utils';

export const feedHandlers = [
  rest.get('/main/feeds', (req, res, ctx) => {
    const sortBy = req.url.searchParams.get('sortby');
    const page = req.url.searchParams.get('page');

    if (sortBy) {
      const feedList = getFeedsSortedBylikes();
      return res(
        ctx.json({
          code: 1,
          message: '',
          data: {
            totalCount: feedList.length,
            feedList,
          },
        }),
      );
    } else {
      return res(ctx.status(400));
    }
  }),

  rest.get('/feeds/clubs/:clubId', (req, res, ctx) => {
    const clubId = req.params.clubId as string;
    const sortBy = req.url.searchParams.get('sortby');
    if (clubId) {
      const feedList = getClubFeeds(clubId);
      return res(
        ctx.json({
          code: 1,
          message: '',
          data: {
            totalCount: feedList.length,
            feedList,
          },
        }),
      );
    } else {
      return res(ctx.status(400));
    }
  }),
];
