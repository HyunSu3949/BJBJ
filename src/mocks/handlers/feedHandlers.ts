import { rest } from 'msw';
import { getFeedsSortedBylikes } from '../utils';

export const feedHandlers = [
  rest.get('feeds', (req, res, ctx) => {
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
    } else return res(ctx.status(400));
  }),
];
