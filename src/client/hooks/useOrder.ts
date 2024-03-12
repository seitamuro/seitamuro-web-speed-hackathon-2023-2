import { webp_converter } from '../utils/webp_converter';

import { useAuthUser } from './useAuthUser';

export const useOrder = () => {
  const { authUser } = useAuthUser();
  const order = authUser?.orders.find((order) => order.isOrdered === false);

  order?.items.map((item) => {
    item.product.media.map((media) => {
      media.file.filename = webp_converter(media.file.filename);
    });
  });

  return { order };
};
