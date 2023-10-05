import { useState, useEffect } from 'react';
import { GetClub } from './mocks/types';

export function App() {
  const [data, setData] = useState<GetClub[]>([]);
  const [club, setClub] = useState({
    userId: '',
    title: '',
    imgUrl: '',
    contents: '',
    maxPersonnel: 0,
    description: '',
    tags: '',
    bookTitle: '',
    author: '',
    publisher: '',
  });

  const fetchData = () => {
    fetch('/clubs', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setData(data.data.clubList);
        console.log(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch('/clubs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(club),
    }).then(() => {
      fetchData();
    });
  };
  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setClub(prevClub => ({ ...prevClub, [name]: value }));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={club.title}
          onChange={handleInputChange}
          placeholder="Title"
        />
        <input
          name="userId"
          value={club.userId}
          onChange={handleInputChange}
          placeholder="User ID"
        />
        <input
          name="imgUrl"
          value={club.imgUrl}
          onChange={handleInputChange}
          placeholder="Image URL"
        />
        <textarea
          name="contents"
          value={club.contents}
          onChange={handleInputChange}
          placeholder="Contents"
        />
        <input
          type="number"
          name="maxPersonnel"
          value={club.maxPersonnel}
          onChange={handleInputChange}
          placeholder="Max Personnel"
        />
        <textarea
          name="description"
          value={club.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <input
          type="text"
          name="tags"
          value={club.tags}
          onChange={handleInputChange}
          placeholder="Tags"
        />
        <input
          name="bookTitle"
          value={club.bookTitle}
          onChange={handleInputChange}
          placeholder="Book Title"
        />
        <input
          name="author"
          value={club.author}
          onChange={handleInputChange}
          placeholder="Author"
        />
        <input
          name="publisher"
          value={club.publisher}
          onChange={handleInputChange}
          placeholder="Publisher"
        />
        <button type="submit">Add Data</button>
      </form>
      <ul>
        {data.map(data => (
          <li key={data.id}>{data.title}</li>
        ))}
      </ul>
    </div>
  );
}
