import { rest } from 'msw';
import {
  deleteLike,
  getClubsSortedByLikes,
  likesClub,
  postClubs,
  getLikesClubList,
  getJoinedClub,
  getClubDetails,
  joinClub,
  cancleJoinClub,
  getAppliedClub,
} from '../utils';
import { db } from '../db';
import { Club } from '../types';

export const clubHandlers = [
  rest.post('/clubs', async (req, res, ctx) => {
    const data = await req.json();
    postClubs(data);
    return res(
      ctx.json({
        code: 1,
        message: '등록 완료',
      }),
    );
  }),

  rest.get('main/clubs', (req, res, ctx) => {
    const sortBy = req.url.searchParams.get('sortby');
    const page = req.url.searchParams.get('page');
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

  rest.post('/likedclubs', async (req, res, ctx) => {
    const { clubId, userId } = await req.json();
    likesClub({ clubId, userId });
    return res(
      ctx.json({
        code: 1,
        message: '좋아요 누름',
      }),
    );
  }),

  rest.delete('/likedclubs', async (req, res, ctx) => {
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
    const likedClubList = userId != null ? getLikesClubList({ userId }) : [];
    return res(
      ctx.json({
        code: 1,
        message: '',
        data: {
          totalCount: likedClubList.length,
          likedClubList,
        },
      }),
    );
  }),

  rest.get('/members/ids', (req, res, ctx) => {
    const userId = req.url.searchParams.get('userId');
    if (userId) {
      const appliedClubList = getAppliedClub(userId);
      return res(
        ctx.json({
          code: 1,
          message: '',
          data: {
            totalCount: appliedClubList.length,
            memberList: appliedClubList,
          },
        }),
      );
    }
  }),

  rest.get('/clubs/:clubId', (req, res, ctx) => {
    const clubId = req.params.clubId as string;
    const clubDetails = getClubDetails(clubId);

    return res(
      ctx.json({
        code: 1,
        message: '',
        data: clubDetails,
      }),
    );
  }),

  rest.post('/members', async (req, res, ctx) => {
    const { clubId, userId } = await req.json();

    joinClub({ clubId, userId });
    return res(
      ctx.json({
        code: 1,
        message: '가입 신청 완료',
      }),
    );
  }),

  rest.delete('/members', async (req, res, ctx) => {
    const clubId = req.url.searchParams.get('clubId') as string;
    const userId = req.url.searchParams.get('userId') as string;
    cancleJoinClub({ clubId, userId });
    return res(
      ctx.json({
        code: 1,
        message: '신청 취소 완료',
      }),
    );
  }),

  rest.get('/members/users/:userId', (req, res, ctx) => {
    const userId = req.params.userId as string;
    const page = req.url.searchParams.get('page') || 1;

    const clubList = getJoinedClub(userId, +page);

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

  rest.get('/clubs/users/:userId', (req, res, ctx) => {
    const userId = req.params.userId as string;
    const userClubInfo = { ...db.clubs.find(club => club.userId == userId) };

    const data = {
      title: userClubInfo.title,
      imgUrl: userClubInfo.imgUrl,
      author: userClubInfo.author,
      contents: userClubInfo.contents,
      maxPersonnel: userClubInfo.maxPersonnel,
      description: userClubInfo.description,
      tags: userClubInfo.tags,
      bookTitle: userClubInfo.bookTitle,
      publisher: userClubInfo.publisher,
    };

    return res(
      ctx.json({
        code: 1,
        message: '',
        data,
      }),
    );
  }),

  rest.put('/clubs/users/:userId', async (req, res, ctx) => {
    const userId = req.params.userId as string;
    const editData = await req.json();

    const userClubInfo = db.clubs.find(club => club.userId == userId) as Club;

    userClubInfo.title = editData.title;
    userClubInfo.author = editData.author;
    userClubInfo.imgUrl = editData.imgUrl;
    userClubInfo.contents = editData.contents;
    userClubInfo.maxPersonnel = editData.maxPersonnel;
    userClubInfo.description = editData.description;
    userClubInfo.tags = editData.tags;
    userClubInfo.bookTitle = editData.bookTitle;
    userClubInfo.publisher = editData.publisher;

    return res(
      ctx.json({
        code: 1,
        message: '수정 완료',
      }),
    );
  }),

  rest.get('/clubs', (req, res, ctx) => {
    const sortBy = req.url.searchParams.get('sortBy');
    const keyword = req.url.searchParams.get('keyword') || '';
    const tags = req.url.searchParams.get('tags') || '';
    const page = req.url.searchParams.get('page') || 1;

    let clubList = [...db.clubs];

    if (sortBy == 'likes') {
      clubList.sort((a, b) => b.likes - a.likes);
    }
    if (keyword != '') {
      clubList = clubList.filter(club => club.title.includes(keyword));
    }
    if (tags != '') {
      const compareTags = (arr1: string[], arr2: string[]) => {
        for (let i = 0; i < arr1.length; i++) {
          if (!arr2.includes(arr1[i])) return false;
        }
        return true;
      };
      const tagsArr = tags.split(',');
      clubList = clubList.filter(club => {
        const clubTagsArr = club.tags.split(',');

        return compareTags(tagsArr, clubTagsArr);
      });
    }
    clubList = clubList.slice(0, 8 * +page);
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

  rest.get('/likedclubs/users/:userId', (req, res, ctx) => {
    const userId = req.params.userId;
    const clubList = db.likedClubs
      .filter(like => like.userId == userId)
      .map(like => {
        const clubId = like.clubId;
        const club = db.clubs.find(club => club.clubId == clubId);

        return club;
      });

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
  rest.get('/members', (req, res, ctx) => {
    const userId = req.url.searchParams.get('userId');
    const approvalStatus = req.url.searchParams.get('approvalStatus');
    const page = req.url.searchParams.get('page') || 1;
    const memberList = db.members
      .filter(member => member.clubId == '0' && member.status == approvalStatus)
      .map(member => {
        const userInfo = {
          ...db.users.find(user => user.userId == member.userId),
        };

        return {
          memberId: member.memberId,
          clubId: member.clubId,
          status: member.status,
          user: userInfo,
        };
      })
      .slice(0, 4 * +page);

    return res(
      ctx.json({
        code: 1,
        message: '',
        data: {
          totalCount: memberList.length,
          memberList,
        },
      }),
    );
  }),

  rest.put('/members', async (req, res, ctx) => {
    const { memberId } = await req.json();

    const member = db.members.find(member => member.memberId == memberId);

    if (member) {
      member.status = '승인됨';
    }

    return res(
      ctx.json({
        code: 1,
        message: '승인 완료',
      }),
    );
  }),

  rest.delete('/clubs/users', (req, res, ctx) => {
    const userId = req.url.searchParams.get('userId');
    db.clubs = db.clubs.filter(club => club.userId != userId);

    return res(
      ctx.json({
        code: 1,
        message: '삭제 완료',
      }),
    );
  }),
];
