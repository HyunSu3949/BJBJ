declare module 'GetApiTypes' {
  export type GetApi = {
    getUserProfile: ApiEndpointInfo<
      never,
      never,
      { code: number; message: string; data: GetUserProfileData }
    >;
    //클럽------------------------------------------------------
    getMainClubList: ApiEndpointInfo<
      never,
      { sortBy: SortBy },
      { code: number; message: string; data: GetMainClubListData }
    >;

    getLikedClubList: ApiEndpointInfo<
      { page: number },
      { userId: string },
      { code: number; message: string; data: GetLikedClubListData }
    >;

    getAppliedClubIdList: ApiEndpointInfo<
      { userId: string },
      { page: number },
      { code: number; message: string; data: GetAppliedClubIdListData }
    >;

    getLikedClubIdList: ApiEndpointInfo<
      { userId: string },
      never,
      { code: number; message: string; data: GetLikedClubIdListData }
    >;

    getClubList: ApiEndpointInfo<
      {
        sortBy?: SortBy;
        tags?: Tags;
        keyword?: string;
        page: number;
      },
      never,
      { code: number; message: string; data: GetClubListData }
    >;

    getClubDetails: ApiEndpointInfo<
      never,
      { clubId: string },
      { code: number; message: string; data: GetClubDetailsData }
    >;

    getJoinedClubList: ApiEndpointInfo<
      { page: number },
      { userId: string },
      { code: number; message: string; data: GetJoinedClubListData }
    >;

    getPendingApprovalMemberList: ApiEndpointInfo<
      { userId: string; approvalStatus: string; page: number },
      never,
      { code: number; message: string; data: GetPendingApprovalMemberListData }
    >;

    getApprovedMemberList: ApiEndpointInfo<
      { userId: string; approvalStatus: string; page: number },
      never,
      { code: number; message: string; data: GetApprovedMemberListData }
    >;

    getClubInfo: ApiEndpointInfo<
      never,
      { userId: string },
      { code: number; message: string; data: GetClubInfoData }
    >;
    //피드--------------------------------------------------
    getMainFeedList: ApiEndpointInfo<
      never,
      { sortBy: SortBy },
      { code: number; message: string; data: GetMainFeedListData }
    >;

    getClubFeedList: ApiEndpointInfo<
      {
        sortBy: SortBy;
        page: number;
      },
      { clubId: string },
      { code: number; message: string; data: GetClubFeedListData }
    >;

    getFeedDetails: ApiEndpointInfo<
      never,
      { feedId: string },
      { code: number; message: string; data: GetFeedDetailsData }
    >;

    getCommentList: ApiEndpointInfo<
      { page: number },
      { feedId: string },
      { code: number; message: string; data: GetCommentListData }
    >;

    getUserCommentList: ApiEndpointInfo<
      { page: number },
      { userId: string },
      { code: number; message: string; data: GetUserCommentListData }
    >;

    getUserFeedList: ApiEndpointInfo<
      { page: number },
      { userId: string },
      { code: number; message: string; data: GetUserFeedListData }
    >;

    getLikedFeedList: ApiEndpointInfo<
      { page: number },
      { userId: string },
      { code: number; message: string; data: GetLikedFeedListData }
    >;

    getLikedFeedIdList: ApiEndpointInfo<
      { userId: string },
      never,
      { code: number; message: string; data: GetLikedFeedIdListData }
    >;
  };
}

type ApiEndpointInfo<QP, PV, R> = {
  pathVariables?: PV;
  queryParameters?: QP;
  result: R;
};

type SortBy = 'likes' | 'createdAt';
type ApplyStatus = '대기중' | '승인됨' | '클럽장';
type Tag = '소모임' | '오프라인' | '온라인' | '수도권' | '지방';
type Tags =
  | `${Tag}`
  | `${Tag},${Tag}`
  | `${Tag},${Tag},${Tag}`
  | `${Tag},${Tag},${Tag},${Tag}`;
type ClubStatus = '모집중' | '마감됨';

//auth--------------------------------------
type GetUserProfileData = {
  userId: string;
  userName: string;
  userEmail: string;
  imgUrl: string;
};

//클럽--------------------------------------
type GetLikedClubIdListData = {
  totalCount: number;
  likedClubList: {
    clubId: string;
  }[];
};

type GetAppliedClubIdListData = {
  totalCount: number;
  memberList: {
    userId: string;
    clubId: string;
    status: ApplyStatus;
  }[];
};

type GetMainClubListData = {
  totalCount: number;
  clubList: {
    clubId: string;
    title: string;
    contents: string;
    imgUrl: string;
    endDate: string;
    tags: Tags;
    likes: number;
  };
  [];
};

type GetClubListData = {
  totalCount: number;
  clubList: {
    clubId: string;
    title: string;
    contents: string;
    imgUrl: string;
    endDate: string;
    tags: Tags;
    likes: likes;
  }[];
};

type GetClubDetailsData = {
  userId: string;
  title: string;
  imgUrl: string;
  contents: string;
  maxPersonnel: number;
  description: string;
  tags: Tags;
  likes: number;
  status: ClubStatus;
  bookTitle: string;
  author: string;
  publisher: string;
};

type GetLikedClubListData = {
  totalCount: number;
  clubList: {
    clubId: string;
    title: string;
    contents: string;
    imgUrl: string;
    likes: number;
  }[];
};

type GetJoinedClubListData = {
  totalCount: number;
  clubList: {
    clubId: string;
    title: string;
    contents: string;
    imgUrl: string;
    likes: number;
  }[];
};

type GetPendingApprovalMemberListData = {
  totalCount: number;
  memberList: {
    memberId: string;
    clubId: string;
    user: {
      userId: string;
      userName: string;
      imgUrl: string;
    };
    status: string;
  }[];
};

type GetApprovedMemberListData = {
  totalCount: number;
  memberList: {
    memberId: string;
    clubId: string;
    user: {
      userId: string;
      userName: string;
      imgUrl: string;
    };
    status: string;
  }[];
};

type GetClubInfoData = {
  title: string;
  imgUrl: string;
  author: string;
  contents: string;
  maxPersonnel: number;
  description: string;
  tags: Tags;
  bookTitle: string;
  publisher: string;
};
//피드--------------------------------------
type GetMainFeedListData = {
  totalCount: number;
  feedList: {
    user: {
      userId: string;
      userName: string;
      imgUrl: string;
    };
    feedId: string;
    contents: string;
    likes: number;
    comentCount: string;
  }[];
};

type GetClubFeedListData = {
  totalCount: number;
  feedList: {
    user: {
      userId: string;
      userName: string;
      imgUrl: string;
    };
    feedId: string;
    contents: string;
    likes: number;
    commentCount: number;
  }[];
};

type GetFeedDetailsData = {
  clubId: string;
  user: {
    userId: string;
    userName: string;
    imgUrl: string;
  };
  title: string;
  contents: string;
  imgUrl: string;
  likes: number;
  created_at: string;
  updated_at: string;
};

type GetCommentListData = {
  totalCount: number;
  commentList: {
    userId: string;
    userName: string;
    imgUrl: string;
    commentId: string;
    contents: string;
  }[];
};

type GetUserFeedListData = {
  totalCount: number;
  feedList: {
    user: {
      userId: string;
      userName: string;
      imgUrl: string;
    };
    feedId: string;
    contents: string;
    likes: number;
    comentCount: number;
  }[];
};

type GetUserCommentListData = {
  totalCount: number;
  commentList: {
    feedId: string;
    contents: string;
  }[];
};

type GetLikedFeedListData = {
  totalCount: number;
  feedList: {
    user: {
      userId: string;
      userName: string;
      imgUrl: string;
    };
    feedId: string;
    contents: string;
    likes: number;
    commentCount: number;
  }[];
};

type GetLikedFeedIdListData = {
  totalCount: number;
  feedList: {
    feedId: string;
  }[];
};
