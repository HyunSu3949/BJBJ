import axiosInstance, { axiosPublic } from './instance';
import type { GetApi } from 'GetApiTypes';

const getApiEndPoints = {
  getUserProfile: '/users',
  //클럽----------------------------------
  getMainClubList: '/main/clubs',
  getLikedClubList: '/likedclubs/users/:userId',
  getJoinedClubList: '/members/users/:userId',
  getAppliedClubIdList: '/members/ids',
  getLikedClubIdList: '/likedclubs/ids',
  getClubList: '/clubs',
  getClubDetails: '/clubs/:id',
  getPendingApprovalMemberList: '/members',
  getApprovedMemberList: '/members',
  getClubInfo: '/clubs/users/:userId',
  //피드----------------------------------
  getMainFeedList: '/main/feeds',
  getClubFeedList: '/feeds/clubs/:clubId',
  getFeedDetails: '/feeds/:feedId',
  getCommentList: '/comments/feeds/:feedId',
  getUserCommentList: '/comments/users/:userId',
  getUserFeedList: '/feeds/users/:userId',
  getLikedFeedList: '/likedfeeds/users/:userId',
  getLikedFeedIdList: '/likedfeeds/ids',
};

const getQueryString = <QP extends { [key: string]: string | number }>(
  object: QP,
) => {
  const keyValueArr = Object.entries(object);
  let queryString = '';
  for (const [key, value] of keyValueArr) {
    if (queryString === '') {
      queryString += `?${key}=${value}`;
    } else {
      queryString += `&${key}=${value}`;
    }
  }
  return queryString;
};

const getPathWhitPathVariable = <PV extends { [key: string]: string | number }>(
  template: string,
  variables: PV,
) => {
  let path = template;
  for (const [key, value] of Object.entries(variables)) {
    path = path.replace(`:${key}`, value.toString());
  }
  return path;
};

const createGetApiFunction = (() => {
  const apiFunction = <K extends keyof GetApi>(key: K, noNeedToken = false) => {
    return async ({
      pathVariables,
      queryParameters,
    }: {
      pathVariables?: GetApi[K]['pathVariables'];
      queryParameters?: GetApi[K]['queryParameters'];
    }): Promise<GetApi[K]['result']> => {
      let path = getApiEndPoints[key];

      if (pathVariables) {
        path = getPathWhitPathVariable(path, pathVariables);
      }
      if (queryParameters) {
        path += getQueryString(queryParameters);
      }

      let result;
      if (noNeedToken) {
        result = await axiosPublic.get(path);
      } else {
        result = await axiosInstance.get(path);
      }
      return result.data.data;
    };
  };
  return apiFunction;
})();

export const getUserProfile = createGetApiFunction('getUserProfile');
//독서--------------------------------------
export const getMainClubList = createGetApiFunction('getMainClubList', true);
export const getAppliedClubIdList = createGetApiFunction(
  'getAppliedClubIdList',
);
export const getLikedClubIdList = createGetApiFunction('getLikedClubIdList');
export const getClubList = createGetApiFunction('getClubList');
export const getLikedClubList = createGetApiFunction('getLikedClubList');
export const getClubDetails = createGetApiFunction('getClubDetails');
export const getJoinedClubList = createGetApiFunction('getJoinedClubList');
export const getPendingApprovalMemberList = createGetApiFunction(
  'getPendingApprovalMemberList',
);
export const getApprovedMemberList = createGetApiFunction(
  'getApprovedMemberList',
);
export const getClubInfo = createGetApiFunction('getClubInfo');

//피드--------------------------------------
export const getMainFeedList = createGetApiFunction('getMainFeedList', true);
export const getClubFeedList = createGetApiFunction('getClubFeedList');
export const getFeedDetails = createGetApiFunction('getFeedDetails');
export const getCommentList = createGetApiFunction('getCommentList');
export const getUserCommentList = createGetApiFunction('getUserCommentList');
export const getUserFeedList = createGetApiFunction('getUserFeedList');
export const getLikedFeedList = createGetApiFunction('getLikedFeedList');
export const getLikedFeedIdList = createGetApiFunction('getLikedFeedIdList');
