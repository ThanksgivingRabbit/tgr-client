import { useParams } from 'react-router-dom';

const SongpyeonPage = () => {
  const { id } = useParams();

  return <div>{id}</div>;
};

export default SongpyeonPage;