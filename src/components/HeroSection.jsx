import React from 'react';

function HeroSection() {
  return (
    <section className="relative">
      <div className="relative h-[500px] overflow-hidden">
        <img 
          src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Yellow%20River%20Delta%20wetland%20landscape%2C%20many%20crane%20birds%2C%20sunset%2C%20golden%20light%2C%20professional%20photography&image_size=landscape_16_9" 
          alt="黄河三角洲湿地" 
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center glass-card px-8 py-8 mx-4 backdrop-blur-md bg-slate-900/60 border-blue-500/30">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              黄河三角洲资源环境科学数据平台
            </h1>
            <p className="text-lg md:text-xl font-light text-gray-300">
              Yellow River Delta Resource and Environmental Science Data Platform
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;