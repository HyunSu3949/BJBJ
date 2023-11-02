import axiosInstance, { axiosPublic } from './instance';
import type { ApiEndpoints } from 'ApiTypes';

const apiEndPointsForGet = {
  mainClubList: '/main/clubs',
  likedClubList: '/likedclubs/users/:userId',
  clubDetails: '/clubs/:id',
  joinedClubList: '/members/users/:userId',
  appliedClubIdList: '/members/ids',
  likedClubIdList: '/likedclubs/ids',
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

export const createGetApiFunction = (() => {
  const apiFunction = <K extends keyof ApiEndpoints>(
    key: K,
    noNeedToken = false,
  ) => {
    return async ({
      pathVariables,
      queryParameters,
    }: {
      pathVariables?: ApiEndpoints[K]['pathVariables'];
      queryParameters?: ApiEndpoints[K]['queryParameters'];
    }): Promise<ApiEndpoints[K]['result']> => {
      let path = apiEndPointsForGet[key];

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
      return result.data;
    };
  };
  return apiFunction;
})();

export const getMainClubList = createGetApiFunction('mainClubList', true);
export const getClubDetails = createGetApiFunction('clubDetails');
export const getJoinedClubList = createGetApiFunction('joinedClubList');
export const getAppliedClubIdList = createGetApiFunction('appliedClubIdList');
export const getLikedClubIdList = createGetApiFunction('likedClubIdList');
