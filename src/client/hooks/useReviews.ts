import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';

import type { GetProductReviewsQueryResponse } from '../graphql/queries';
import { GetProductReviewsQuery } from '../graphql/queries';
import { webp_converter } from '../utils/webp_converter';

export const useReviews = (productId: number | undefined) => {
  const handleError = useErrorHandler();

  const [loadReviews, reviewsResult] = useLazyQuery<GetProductReviewsQueryResponse>(GetProductReviewsQuery, {
    onError: handleError,
    variables: {
      productId,
    },
  });

  useEffect(() => {
    // サーバー負荷が懸念されそうなので、リクエストを少し待つ
    // サーバー負荷がなくなれば、すぐ読み込んでもよい
    const timer = setTimeout(() => {
      loadReviews();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [loadReviews, productId]);

  const reviews = reviewsResult.data?.product.reviews;
  reviews?.map((review) => {
    review.user.profile.avatar.filename = webp_converter(review.user.profile.avatar.filename);
  });

  return { reviews };
};
