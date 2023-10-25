import React, { useEffect, useState } from 'react';
import { getClubList } from '../../apis/clubApis';
import { Tag, Tags } from '../../mocks/types';
import ClubCard from '../common/clubCard/ClubCard';
import { Club } from '../types';

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

  const fetchClubList = async () => {
    const { sortBy, keyword, tags, page } = searchValues;

    const data = await getClubList({
      sortBy,
      keyword,
      tags: getTagString(tags),
      page,
    });
    setClublist(data.clubList);
  };

  useEffect(() => {
    fetchClubList();
  }, [searchValues.tags, searchValues.sortBy]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setSearchValues(prev => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSearchValues(prev => ({
      ...prev,
      tags: {
        ...prev.tags,
        [value as Tag]: checked,
      },
    }));
  };
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          fetchClubList();
        }}
      >
        <input
          type="text"
          name="keyword"
          value={searchValues.keyword}
          onChange={handleInputChange}
          placeholder="키워드 입력"
        />
        <button>검색</button>
        <div>
          {(['소모임', '오프라인', '온라인', '수도권', '지방'] as Tag[]).map(
            tag => (
              <label key={tag}>
                <input
                  type="checkbox"
                  name="tags"
                  value={tag}
                  checked={searchValues.tags[tag]}
                  onChange={handleTagChange}
                />
                {tag}
              </label>
            ),
          )}
        </div>

        <select
          name="sortBy"
          value={searchValues.sortBy}
          onChange={handleInputChange}
        >
          <option value="createdAt">최신순</option>
          <option value="likes">좋아요순</option>
        </select>
      </form>

      <div>
        <h2>검색 결과</h2>
        <ul style={{ display: 'flex' }}>
          {clubList.map(club => (
            <li key={club.clubId}>
              <ClubCard {...club} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
