import { rest } from 'msw';
import { getClubFeeds, getFeedsSortedBylikes } from '../utils';
// import { db, ids } from '../db';
import { db, ids } from '../empty_db';

export const feedHandlers = [
  rest.get('/main/feeds', (req, res, ctx) => {
    const sortBy = req.url.searchParams.get('sortBy');
    const page = +(req.url.searchParams.get('page') || 1);

    if (sortBy) {
      const feedList = getFeedsSortedBylikes();
      return res(
        ctx.json({
          code: 1,
          message: '',
          data: {
            totalCount: feedList.length,
            feedList: feedList.slice((page - 1) * 4, page * 4),
          },
        }),
      );
    } else {
      return res(ctx.status(400));
    }
  }),

  rest.get('/feeds/clubs/:clubId', (req, res, ctx) => {
    const clubId = req.params.clubId as string;
    const page = Number(req.url.searchParams.get('page') || 1);
    const sortBy = req.url.searchParams.get('sortBy') || 'likes';
    if (clubId != undefined) {
      const feedList = getClubFeeds(clubId, page);
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

  rest.get('/feeds/users/:userId', (req, res, ctx) => {
    const userId = req.params.userId as string;
    const page = req.url.searchParams.get('page') || 1;

    if (userId) {
      const myFeeds = db.feeds.filter(feed => feed.userId == userId);
      const userInfo = { ...db.users.find(user => user.userId == userId) };

      return res(
        ctx.json({
          code: 1,
          message: '',
          data: {
            totalCount: myFeeds.length,
            feedList: myFeeds
              .map(obj => {
                return { user: userInfo, ...obj };
              })
              .slice(0, 4 * +page),
          },
        }),
      );
    } else {
      return res(ctx.status(400));
    }
  }),

  rest.post('/feeds', async (req, res, ctx) => {
    const data = await req.json();
    db.feeds.push({
      feedId: String(ids.feeds++),
      likes: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data,
    });

    return res(
      ctx.json({
        code: 1,
        message: '피드 등록 완료',
      }),
    );
  }),

  rest.put('/feeds', async (req, res, ctx) => {
    const data = await req.json();
    const feed = db.feeds.find(feed => feed.feedId == data.feedId);
    if (feed) {
      feed.title = data.title;
      feed.contents = data.contents;
      feed.imgUrl = data.imgUrl;

      return res(
        ctx.json({
          code: 1,
          message: '피드 수정 완료',
        }),
      );
    }
  }),

  rest.delete('/feeds', async (req, res, ctx) => {
    const feedId = req.url.searchParams.get('feedId');
    db.feeds = db.feeds.filter(feed => feed.id != feedId);

    return res(
      ctx.json({
        code: 1,
        message: '피드 삭제 완료',
      }),
    );
  }),

  rest.get('/feeds/:feedId', (req, res, ctx) => {
    const feedId = req.params.feedId as string;

    const feed = db.feeds.find(feed => feed.feedId == feedId);
    const userInfo = db.users.find(user => user.userId == feed?.userId);

    return res(
      ctx.json({
        code: 1,
        message: '피드 삭제 완료',
        data: {
          user: { ...userInfo },
          ...feed,
        },
      }),
    );
  }),

  rest.get('/comments/feeds/:feedId', (req, res, ctx) => {
    const feedId = req.params.feedId;
    const page = req.url.searchParams.get('page') || 1;

    if (feedId != undefined) {
      const commentList = db.feedComment
        .filter(comment => comment.feedId == feedId)
        .map(comment => {
          const userInfo = {
            ...db.users.find(user => user.userId == comment.userId),
          };

          return {
            userId: userInfo.userId,
            userName: userInfo.userName,
            imgUrl: userInfo.imgUrl,
            contents: comment.contents,
            commentId: comment.commentId,
          };
        })
        .slice(0, 10 * +page);

      return res(
        ctx.json({
          code: 1,
          message: '',
          data: {
            totalCount: commentList.length,
            commentList,
          },
        }),
      );
    }
  }),

  rest.post('/comments', async (req, res, ctx) => {
    const data = await req.json();
    db.feedComment.push({ commentId: ids.feedComment, ...data });

    return res(
      ctx.json({
        code: 1,
        message: '댓글 등록 완료',
      }),
    );
  }),

  rest.delete('/comments', async (req, res, ctx) => {
    const commentId = req.url.searchParams.get('commentId');
    db.feedComment = db.feedComment.filter(
      comment => comment.commentId != commentId,
    );

    return res(
      ctx.json({
        code: 1,
        message: '피드 삭제 완료',
      }),
    );
  }),

  rest.post('/likedfeeds', async (req, res, ctx) => {
    const { feedId, userId } = await req.json();
    db.likedFeeds.push({ id: String(ids.likedFeeds++), feedId, userId });

    return res(
      ctx.json({
        code: 1,
        message: '좋아요 누름',
      }),
    );
  }),

  rest.delete('/likedfeeds', async (req, res, ctx) => {
    const feedId = req.url.searchParams.get('feedId');
    const userId = req.url.searchParams.get('userId');
    if (feedId && userId) {
      db.likedFeeds = db.likedFeeds.filter(
        like => !(like.feedId == feedId && like.userId == userId),
      );
      return res(
        ctx.json({
          code: 1,
          message: '좋아요 취소',
        }),
      );
    } else {
      return res(ctx.status(400));
    }
  }),

  rest.get('/likedfeeds/users/:userId', (req, res, ctx) => {
    const userId = req.params.userId;
    const page = req.url.searchParams.get('page') || 1;

    if (userId) {
      const feedList = db.likedFeeds
        .filter(like => like.userId == userId)
        .map(like => {
          const feed = { ...db.feeds.find(feed => feed.feedId == like.feedId) };
          const user = { ...db.users.find(user => user.userId == like.userId) };
          const commentCount = db.feedComment.filter(
            comment => comment.feedId == feed.feedId,
          );
          return {
            user,
            feedId: feed.feedId,
            contents: feed.contents,
            likes: feed.likes,
            commentCount,
          };
        })
        .slice(0, 10 * +page);

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
    }
  }),

  rest.get('/comments/users/:userId', (req, res, ctx) => {
    const userId = req.params.userId;

    const commentList = db.feedComment.filter(
      comment => comment.userId == userId,
    );

    return res(
      ctx.json({
        code: 1,
        message: '',
        data: {
          totalCount: commentList.length,
          commentList,
        },
      }),
    );
  }),

  rest.get('/likedfeeds/ids', (req, res, ctx) => {
    const userId = req.url.searchParams.get('userId');
    const feedList = db.likedFeeds.filter(liked => liked.userId == userId);

    return res(
      ctx.json({
        code: 1,
        message: '',
        data: {
          totalCount: feedList.length,
          feedList: feedList,
        },
      }),
    );
  }),
];
