import React from 'react';
import { Link } from 'react-router-dom';

export default function MoreButton({ route }: { route: string }) {
  return (
    <Link to={route} role="button">
      더 알아보기
    </Link>
  );
}
