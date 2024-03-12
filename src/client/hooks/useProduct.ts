import { useQuery } from '@apollo/client';
import { useErrorHandler } from 'react-error-boundary';

import type { GetProductDetailsQueryResponse } from '../graphql/queries';
import { GetProductDetailsQuery } from '../graphql/queries';
import { webp_converter } from '../utils/webp_converter';

export const useProduct = (productId: number) => {
  const handleError = useErrorHandler();
  const productResult = useQuery<GetProductDetailsQueryResponse>(GetProductDetailsQuery, {
    onError: handleError,
    variables: {
      productId,
    },
  });

  const product = productResult.data?.product;
  product?.media.map((media) => {
    media.file.filename = webp_converter(media.file.filename);
  });
  console.log('after:', product);

  return { product };
};
