import React, { useCallback, useEffect, useState } from 'react';
import { getClubList } from '../../apis/clubApis';
import { Tag, Tags } from '../../mocks/types';
import ClubCard from '../common/clubCard/ClubCard';
import { Club } from '../types';
import * as S from './styles';

type TagType = {
  [key in Tag]: boolean;
};
type SearchFormValues = {
  keyword: string;
  tags: TagType;
  sortBy: 'createdAt' | 'likes';
  page: number;
};

export default function SearchForm() {
  const [clubList, setClublist] = useState<Club[]>([]);
  const [searchValues, setSearchValues] = useState<SearchFormValues>({
    keyword: '',
    tags: {
      소모임: false,
      오프라인: false,
      온라인: false,
      수도권: false,
      지방: false,
    },
    sortBy: 'createdAt',
    page: 1,
  });

  const getTagString = (obj: TagType) => {
    return Object.entries(obj)
      .filter(([_, val]) => val)
      .map(([key, _]) => key)
      .join(',') as Tags;
  };

  const fetchClubList = useCallback(async () => {
    const { sortBy, keyword, tags, page } = searchValues;

    const data = await getClubList({
      sortBy,
      keyword,
      tags: getTagString(tags),
      page,
    });
    setClublist(data.clubList);
  }, [searchValues]);

  useEffect(() => {
    fetchClubList();
  }, [searchValues.tags, searchValues.sortBy, fetchClubList]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setSearchValues(prev => ({ ...prev, [name]: value }));
  };
  const [tagsState, setTagsState] = useState<TagType>({
    소모임: false,
    오프라인: false,
    온라인: false,
    수도권: false,
    지방: false,
  });

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSearchValues(prev => ({
      ...prev,
      tags: {
        ...prev.tags,
        [value as Tag]: checked,
      },
    }));
    setTagsState(prev => ({ ...prev, [value]: checked }));
  };

  return (
    <S.SearchFormWrapper>
      <S.Form
        onSubmit={e => {
          e.preventDefault();
          fetchClubList();
        }}
      >
        <div>
          <label>독서 모임 검색하기</label>
          <div>
            <S.Input
              type="text"
              name="keyword"
              value={searchValues.keyword}
              onChange={handleInputChange}
              placeholder="키워드 입력"
            />
            <S.Button>검색</S.Button>
          </div>
        </div>
        <div>
          <label>태그</label>
          <S.TagBox>
            {(['소모임', '오프라인', '온라인', '수도권', '지방'] as Tag[]).map(
              tag => (
                <S.Label key={tag} isSelected={tagsState[tag]}>
                  <S.Checkbox
                    type="checkbox"
                    value={tag}
                    onChange={handleTagChange}
                  />
                  {tag}
                </S.Label>
              ),
            )}
          </S.TagBox>
        </div>
        <div>
          <S.Select
            name="sortBy"
            value={searchValues.sortBy}
            onChange={handleInputChange}
          >
            <option value="createdAt">최신순</option>
            <option value="likes">좋아요순</option>
          </S.Select>
        </div>
      </S.Form>
      <S.ResultContainer>
        <S.SearchResultTitle>검색 결과</S.SearchResultTitle>
        <S.ListContainer>
          {clubList.map(club => (
            <li key={club.clubId}>
              <ClubCard {...club} />
            </li>
          ))}
        </S.ListContainer>
      </S.ResultContainer>
    </S.SearchFormWrapper>
  );
}
