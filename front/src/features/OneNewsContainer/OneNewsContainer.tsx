import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks.ts';

const OneNewsContainer = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const fetchOneNews = async () => {};

  useEffect(() => {
    void fetchOneNews();
  }, [fetchOneNews, dispatch]);
  return <></>;
};

export default OneNewsContainer;
