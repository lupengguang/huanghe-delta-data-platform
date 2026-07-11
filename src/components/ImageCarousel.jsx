import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { withBase } from '../utils/pathUtils';

const imageCatalogMap = {
  '黄河三角洲土地利用数据': '黄河三角洲土地利用数据',
  '黄河三角洲NDVI': '黄河三角洲NDVI',
  '黄河三角洲NPP': '黄河三角洲NPP',
  '黄河三角洲DEM数据': '黄河三角洲DEM数据',
  '黄河三角洲年均气温': '黄河三角洲年均气温',
  '黄河三角洲年降水量': '黄河三角洲年降水量',
  '黄河三角洲平均土壤湿度': '黄河三角洲平均土壤湿度',
  '黄河三角洲植被类型数据': '黄河三角洲植被类型数据',
  '黄河三角洲水系分布图': '黄河三角洲水系分布图',
  '黄河三角洲行政区划边界': '黄河三角洲行政区划边界',
  '黄河三角洲夜间灯光数据': '夜间灯光数据',
  '黄河三角洲坡度数据': '黄河三角洲坡度数据',
  '黄河三角洲坡向数据': '黄河三角洲坡向数据',
  '黄河三角洲地形起伏度数据': '黄河三角洲地形起伏度数据',
  '黄河三角洲EVI': '黄河三角洲EVI',
  '黄河三角洲MODIS地表蒸散发': '黄河三角洲MODIS地表蒸散发',
  '黄河三角洲产水量': '黄河三角洲产水量',
  '黄河三角洲土壤保持': '黄河三角洲土壤保持',
  '黄河三角洲土壤侵蚀类型和程度空间分布数据': '黄河三角洲土壤侵蚀类型和程度空间分布数据',
  '黄河三角洲水蚀数据': '黄河三角洲水蚀数据',
  '黄河三角洲风蚀数据': '黄河三角洲风蚀数据',
  'Landsat中分辨率遥感影像': 'Landsat中分辨率遥感影像',
  'sunLST': '白天LST',
  'nightLST': '夜间LST',
  '中国多年度省级行政区划': '中国多年度省级行政区划',
  '中国多年度市级行政区划': '中国多年度市级行政区划',
  '中国多年度县级行政区划': '中国多年度县级行政区划',
  '中国CIMP6未来气候情景气温数据': '中国CIMP6未来气候情景气温数据',
  '中国CIMP6未来气候情景降水数据': '中国CIMP6未来气候情景降水数据',
  '中国CIMP6未来气候情景土壤湿度数据': '中国CIMP6未来气候情景土壤湿度数据',
  '土壤质地(砂土)': '土壤质地(砂土)',
  '土壤质地(粉砂土)': '土壤质地(粉砂土)',
  '土壤质地(黏土)': '土壤质地(黏土)',
  '东营市自然保护区': '东营市自然保护区',
  '滨州市自然保护区': '滨州市自然保护区',
  '面状水系缩略图': '面状水系缩略图',
  '线状水系缩略图': '线状水系缩略图',
  '道路数据缩略图': '道路数据缩略图',
  '铁路缩略图': '铁路缩略图',
  '居民点缩略图': '居民点缩略图',
};

const images = [
  { src: withBase('/images/黄河三角洲土地利用数据.png'), alt: '黄河三角洲土地利用数据' },
  { src: withBase('/images/黄河三角洲NDVI.png'), alt: '黄河三角洲NDVI' },
  { src: withBase('/images/黄河三角洲NPP.png'), alt: '黄河三角洲NPP' },
  { src: withBase('/images/黄河三角洲DEM数据.png'), alt: '黄河三角洲DEM数据' },
  { src: withBase('/images/黄河三角洲年均气温.png'), alt: '黄河三角洲年均气温' },
  { src: withBase('/images/黄河三角洲年降水量.png'), alt: '黄河三角洲年降水量' },
  { src: withBase('/images/黄河三角洲平均土壤湿度.png'), alt: '黄河三角洲平均土壤湿度' },
  { src: withBase('/images/黄河三角洲植被类型数据.png'), alt: '黄河三角洲植被类型数据' },
  { src: withBase('/images/黄河三角洲水系分布图.png'), alt: '黄河三角洲水系分布图' },
  { src: withBase('/images/黄河三角洲行政区划边界.png'), alt: '黄河三角洲行政区划边界' },
  { src: withBase('/images/黄河三角洲夜间灯光数据.png'), alt: '黄河三角洲夜间灯光数据' },
  { src: withBase('/images/黄河三角洲坡度数据.png'), alt: '黄河三角洲坡度数据' },
  { src: withBase('/images/黄河三角洲坡向数据.png'), alt: '黄河三角洲坡向数据' },
  { src: withBase('/images/黄河三角洲地形起伏度数据.png'), alt: '黄河三角洲地形起伏度数据' },
  { src: withBase('/images/黄河三角洲EVI.png'), alt: '黄河三角洲EVI' },
  { src: withBase('/images/黄河三角洲MODIS地表蒸散发.png'), alt: '黄河三角洲MODIS地表蒸散发' },
  { src: withBase('/images/黄河三角洲产水量.png'), alt: '黄河三角洲产水量' },
  { src: withBase('/images/黄河三角洲土壤保持.png'), alt: '黄河三角洲土壤保持' },
  { src: withBase('/images/黄河三角洲土壤侵蚀类型和程度空间分布数据.png'), alt: '黄河三角洲土壤侵蚀类型和程度空间分布数据' },
  { src: withBase('/images/黄河三角洲水蚀数据.png'), alt: '黄河三角洲水蚀数据' },
  { src: withBase('/images/黄河三角洲风蚀数据.png'), alt: '黄河三角洲风蚀数据' },
  { src: withBase('/images/Landsat中分辨率遥感影像.png'), alt: 'Landsat中分辨率遥感影像' },
  { src: withBase('/images/sunLST.png'), alt: 'sunLST' },
  { src: withBase('/images/nightLST.png'), alt: 'nightLST' },
  { src: withBase('/images/中国多年度省级行政区划.png'), alt: '中国多年度省级行政区划' },
  { src: withBase('/images/中国多年度市级行政区划.png'), alt: '中国多年度市级行政区划' },
  { src: withBase('/images/中国多年度县级行政区划.png'), alt: '中国多年度县级行政区划' },
  { src: withBase('/images/中国CIMP6未来气候情景气温数据.png'), alt: '中国CIMP6未来气候情景气温数据' },
  { src: withBase('/images/中国CIMP6未来气候情景降水数据.png'), alt: '中国CIMP6未来气候情景降水数据' },
  { src: withBase('/images/中国CIMP6未来气候情景土壤湿度数据.png'), alt: '中国CIMP6未来气候情景土壤湿度数据' },
  { src: withBase('/images/土壤质地(砂土).png'), alt: '土壤质地(砂土)' },
  { src: withBase('/images/土壤质地(粉砂土).png'), alt: '土壤质地(粉砂土)' },
  { src: withBase('/images/土壤质地(黏土).png'), alt: '土壤质地(黏土)' },
  { src: withBase('/images/东营市自然保护区.png'), alt: '东营市自然保护区' },
  { src: withBase('/images/滨州市自然保护区.png'), alt: '滨州市自然保护区' },
  { src: withBase('/images/面状水系缩略图.png'), alt: '面状水系缩略图' },
  { src: withBase('/images/线状水系缩略图.png'), alt: '线状水系缩略图' },
  { src: withBase('/images/道路数据缩略图.png'), alt: '道路数据缩略图' },
  { src: withBase('/images/铁路缩略图.png'), alt: '铁路缩略图' },
  { src: withBase('/images/居民点缩略图.png'), alt: '居民点缩略图' },
];

function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [catalogName, setCatalogName] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const currentAlt = images[currentIndex].alt;
    const mappedCatalog = imageCatalogMap[currentAlt];
    setCatalogName(mappedCatalog || null);
  }, [currentIndex]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const hasCatalogLink = !!catalogName;

  const getCatalogUrl = () => {
    if (catalogName) {
      return `/database-catalog?catalog=${encodeURIComponent(catalogName)}`;
    }
    return null;
  };

  return (
    <div className="relative w-full">
      <div className="glass-card rounded-lg overflow-hidden">
        {hasCatalogLink ? (
          <Link to={getCatalogUrl()}>
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="w-full h-[400px] object-contain bg-slate-900/50 cursor-pointer hover:opacity-90 transition-opacity"
            />
          </Link>
        ) : (
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="w-full h-[400px] object-contain bg-slate-900/50"
          />
        )}
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <p className="text-white font-medium text-lg">{images[currentIndex].alt}</p>
          {hasCatalogLink && (
            <p className="text-white/80 text-sm mt-1">点击查看: {catalogName}</p>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-colors z-10"
          title={isPlaying ? '暂停' : '播放'}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {hasCatalogLink && (
          <div className="absolute top-4 left-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full transition-colors z-10">
            <span className="text-sm text-white">点击跳转 →</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          onClick={goToPrevious}
          className="px-4 py-2 glass-card hover:bg-white/20 transition-colors flex items-center gap-2 text-gray-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          上一张
        </button>

        <div className="flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-blue-500 w-6' : 'bg-gray-500 hover:bg-gray-400'
              }`}
              title={`${index + 1}/${images.length}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="px-4 py-2 glass-card hover:bg-white/20 transition-colors flex items-center gap-2 text-gray-300"
        >
          下一张
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="text-center text-sm text-gray-400 mt-2">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}

export default ImageCarousel;