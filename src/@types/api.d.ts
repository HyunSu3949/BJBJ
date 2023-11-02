declare module 'ApiTypes' {
  type ApiEndpointInfo<QP, PV, R> = {
    pathVariables?: PV;
    queryParameters?: QP;
    result: R;
  };

  export type ApiEndpoints = {
    mainClubList: ApiEndpointInfo<
      never,
      { sortBy: SortBy },
      { code: number; message: string; clubList: [] }
    >;
    likedClubList: ApiEndpointInfo<
      { userId: string },
      { page: number },
      { code: number; message: string; clubList: [] }
    >;
    clubDetails: ApiEndpointInfo<
      { id: string },
      never,
      { code: number; message: string; clubList: [] }
    >;
    appliedClubIdList: ApiEndpointInfo<
      { userId: string },
      { page: number },
      { code: number; message: string; clubList: [] }
    >;
    joinedClubList: ApiEndpointInfo<
      { userId: string },
      never,
      { code: number; message: string; clubList: [] }
    >;
    likedClubIdList: ApiEndpointInfo<
      { userId: string },
      never,
      { code: number; message: string; clubList: [] }
    >;
  };
}
type SortBy = 'likes' | 'createdAt';
