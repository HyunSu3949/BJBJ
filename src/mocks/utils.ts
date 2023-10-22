import { db, ids } from './db';
import { GetClub, PostClub } from './types';

export function getClubsSortedByLikes(): GetClub[] {
  return db.clubs
    .map(club => ({
      clubId: club.clubId,
      title: club.title,
      contents: club.contents,
      imgUrl: club.imgUrl,
      tags: club.tags,
      likes: club.likes,
    }))
    .sort((a, b) => b.likes - a.likes);
}

export function postClubs(data: PostClub) {
  const {
    userId,
    title,
    imgUrl,
    contents,
    maxPersonnel,
    description,
    tags,
    bookTitle,
    author,
    publisher,
  } = data;
  const nextId = ids.clubs++;

  db.clubs.push({
    id: String(nextId),
    clubId: String(nextId),
    userId,
    title,
    imgUrl,
    contents,
    maxPersonnel,
    description,
    likes: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: '모집중',
    tags,
    bookTitle,
    author,
    publisher,
  });
}

export function likesClub({
  userId,
  clubId,
}: {
  userId: string;
  clubId: string;
}) {
  const nextId = ids.likedClubs++;
  db.likedClubs.push({
    id: String(nextId),
    userId,
    clubId,
  });
  db.clubs.forEach(obj => {
    if (obj.id == clubId) obj.likes++;
  });
}

export function deleteLike({
  userId,
  clubId,
}: {
  userId: string;
  clubId: string;
}) {
  db.likedClubs = db.likedClubs.filter(
    obj => !(obj.clubId == clubId && obj.userId == userId),
  );
}

export function getLikesClubList({ userId }: { userId: string }) {
  return db.likedClubs.filter(obj => obj.userId == userId);
}

export function getFeedsSortedBylikes() {
  const feedList = db.feeds
    .map(obj => ({
      id: obj.id,
      userId: obj.userId,
      contents: obj.contents,
      likes: obj.likes,
      commentCount: 1,
    }))
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 4)
    .map(obj => {
      const userInfo: {
        userId: string;
        userName: string;
        imgUrl: string;
      } = { userId: '', userName: '', imgUrl: '' };

      db.users.forEach(user => {
        if (user.userId == obj.userId) {
          userInfo.userId = user.userId;
          userInfo.userName = user.userName;
          userInfo.imgUrl = user.imgUrl;
        }
      });

      return {
        user: userInfo,
        id: obj.id,
        contents: obj.contents,
        likes: obj.likes,
        commentCount: obj.commentCount,
      };
    });

  return feedList;
}

export function getAppliedClub(userId: string) {
  return db.members.filter(member => member.userId == userId);
}

export function getJoinedClub(userId: string, page: string) {
  return db.members
    .filter(member => member.userId == userId && member.status == '승인됨')
    .map(member => {
      const clubId = member.clubId;
      const clubInfo = { ...db.clubs.find(club => club.clubId == clubId) };

      return {
        clubId: clubInfo.clubId,
        title: clubInfo.title,
        contents: clubInfo.contents,
        imgUrl: clubInfo.imgUrl,
        likes: clubInfo.likes,
      };
    })
    .slice(0, 4 * +page);
}

export function getClubDetails(clubId: string) {
  return db.clubs.find(club => club.id == clubId);
}

export function joinClub({
  clubId,
  userId,
}: {
  clubId: string;
  userId: string;
}) {
  const id = ids.members++;

  db.members.push({
    id: String(id),
    userId,
    clubId,
    status: '대기중',
  });
}

export function cancleJoinClub({
  clubId,
  userId,
}: {
  clubId: string;
  userId: string;
}) {
  db.members = db.members.filter(
    member => !(member.clubId == clubId && member.userId == userId),
  );
}

export function getClubFeeds(clubId: string) {
  const clubFeeds = db.feeds
    .filter(feed => feed.clubId == clubId)
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 4)
    .map(obj => {
      const userInfo: {
        userId: string;
        userName: string;
        imgUrl: string;
      } = { userId: '', userName: '', imgUrl: '' };

      db.users.forEach(user => {
        if (user.userId == obj.userId) {
          userInfo.userId = user.userId;
          userInfo.userName = user.userName;
          userInfo.imgUrl = user.imgUrl;
        }
      });

      return {
        user: userInfo,
        id: obj.id,
        feedId: obj.feedId,
        contents: obj.contents,
        likes: obj.likes,
        commentCount: 1,
      };
    });

  return clubFeeds;
}
