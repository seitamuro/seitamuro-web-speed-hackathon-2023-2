import type { FC, ReactNode } from 'react';

type Props = {
  ratioWidth: number;
  ratioHeight: number;
  children: ReactNode;
};

export const AspectRatio: FC<Props> = ({ children, ratioHeight, ratioWidth }) => {
  return (
    <div style={{ aspectRatio: `${ratioWidth} / ${ratioHeight}`, height: "100%", width: "100%" }}>
      {children}
    </div>
  );
};
