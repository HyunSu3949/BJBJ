import { useState, useEffect } from 'react';
type ApiResponse = {
  code: number;
  message: string;
  data: {
    totalCount: number;
    clubList: Club[];
  };
};

type Club = {
  id: string;
  title: string;
  contents: string;
  imgUrl: string;
  tags: string;
  likes: number;
};

export function App() {
  const [data, setData] = useState<ApiResponse>();
  useEffect(() => {
    fetch('/clubs/likes', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.data);
      });
  }, []);
  return <div>Hi</div>;
}
