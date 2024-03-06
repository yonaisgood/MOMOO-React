import { useEffect, useState } from 'react';

interface ImgRatio {
  width: number | null;
  height: number | null;
}

export default function useSetFeedItemLayout() {
  const [imgRatio, setImgRatio] = useState<ImgRatio>({
    width: null,
    height: null,
  });

  const [clientWitch, setClientWitch] = useState(
    document.documentElement.clientWidth,
  );

  useEffect(() => {
    window.addEventListener('resize', () => {
      setClientWitch(document.documentElement.clientWidth);
    });
  }, []);

  const setRatio = async (imgUrl: string) => {
    const img = new Image();
    img.src = imgUrl;
    img.onload = () => {
      setImgRatio({ width: img.width, height: img.height });
    };
  };

  const setGridRowEnd = async (node: HTMLLIElement) => {
    if (!imgRatio?.height || !imgRatio?.width) {
      return;
    }

    const height = node.clientWidth * (imgRatio.height / imgRatio.width);

    if (clientWitch > 430) {
      node.style.gridRowEnd = `span ${Math.round(height + 16)}`;
    } else {
      node.style.gridRowEnd = `span ${Math.round(height + 12)}`;
    }
  };

  return { imgRatio, setRatio, setGridRowEnd };
}
