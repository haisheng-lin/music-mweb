import React from 'react';

import LazyLoad from '@shared/components/LazyLoad';

interface ImageLazyLoadProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  loading?: string;
}

const ImageLazyLoad: React.FC<ImageLazyLoadProps> = props => {
  const { loading, src } = props;

  return (
    <LazyLoad loading={<img {...props} src={loading} alt={props.alt} />}>
      <img {...props} src={src} alt={props.alt} />
    </LazyLoad>
  );
};

export default ImageLazyLoad;
