import { useSuspenseQuery_experimental as useSuspenseQuery } from '@apollo/client';

import type { GetFeatureSectionsQueryResponse } from '../graphql/queries';
import { GetFeatureSectionsQuery } from '../graphql/queries';
import { webp_converter } from '../utils/webp_converter';

export const useFeatures = () => {
  const featuresResult = useSuspenseQuery<GetFeatureSectionsQueryResponse>(GetFeatureSectionsQuery);

  const features = featuresResult.data?.features;

  features.map((featureSection) => {
    featureSection.items.map((item) => {
      item.product.media.map((media) => {
        // jpg to webp
        media.file.filename = webp_converter(media.file.filename);
      });
    });
  });

  return { features };
};
