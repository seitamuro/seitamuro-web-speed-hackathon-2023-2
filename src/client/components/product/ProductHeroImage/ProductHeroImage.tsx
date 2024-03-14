import classNames from 'classnames';
import { isEqual } from "lodash-es";
import { memo } from 'react';
import type { FC } from 'react';

import type { ProductFragmentResponse } from '../../../graphql/fragments';
import { Anchor } from '../../foundation/Anchor';
import { AspectRatio } from '../../foundation/AspectRatio';
import { DeviceType, GetDeviceType } from '../../foundation/GetDeviceType';

import * as styles from './ProductHeroImage.styles';

type Props = {
  product?: ProductFragmentResponse;
  title: string;
};

export const ProductHeroImage: FC<Props> = memo(({ product, title }) => {
  return (
    <GetDeviceType>
      {({ deviceType }) => {
        return (
          <div style={{ width: "100%" }}>
            <div style={{ margin: "0 auto", maxWidth: "1024px", width: "100%" }}>
              <Anchor href={`/product/${product?.id}`}>
                <div className={styles.container()}>
                  <AspectRatio ratioHeight={9} ratioWidth={16}>
                    <img className={styles.image()} src={product?.media[0].file.filename} />
                  </AspectRatio>

                  <div className={styles.overlay()}>
                    <p
                      className={classNames(styles.title(), {
                        [styles.title__desktop()]: deviceType === DeviceType.DESKTOP,
                        [styles.title__mobile()]: deviceType === DeviceType.MOBILE,
                      })}
                    >
                      {title}
                    </p>
                    <p
                      className={classNames(styles.description(), {
                        [styles.description__desktop()]: deviceType === DeviceType.DESKTOP,
                        [styles.description__mobile()]: deviceType === DeviceType.MOBILE,
                      })}
                    >
                      {product?.name}
                    </p>
                  </div>
                </div>
              </Anchor>
            </div>
          </div>
        );
      }}
    </GetDeviceType>
  );
}, isEqual);

ProductHeroImage.displayName = 'ProductHeroImage';
