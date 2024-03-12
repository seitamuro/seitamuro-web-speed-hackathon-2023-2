import { useSuspenseQuery_experimental as useSuspenseQuery } from '@apollo/client';

import type { GetRecommendationsQueryResponse } from '../graphql/queries';
import { GetRecommendationsQuery } from '../graphql/queries';
import { webp_converter } from '../utils/webp_converter';

export const useRecommendation = () => {
  const recommendationsResult = useSuspenseQuery<GetRecommendationsQueryResponse>(GetRecommendationsQuery);

  const hour = window.Temporal.Now.plainTimeISO().hour;
  const recommendations = recommendationsResult?.data?.recommendations;

  if (recommendations == null) {
    return { recommendation: undefined };
  }

  const recommendation = recommendations[hour % recommendations.length];
  recommendation.product.media.map((media) => {
    media.file.filename = webp_converter(media.file.filename);
  });
  return { recommendation };
};
