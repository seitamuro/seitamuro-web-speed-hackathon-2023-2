import type { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import * as styles from './Anchor.styles';

type Props = {
  children: ReactNode;
  href: string;
  dataTestId?: string;
};

export const Anchor: FC<Props> = ({ children, href, ...rest }) => (
  <Link className={styles.container()} to={href} {...rest}>
    {children}
  </Link>
);
