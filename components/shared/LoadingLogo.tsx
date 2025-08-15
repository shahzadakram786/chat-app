// components/shared/LoadingLogo.tsx
import Image from "next/image";
import React from "react";

const LoadingLogo = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Image
        src="/logo.svg"
        alt="loading logo"
        width={120}
        height={120}
        className="animate-pulse duration-700"
        priority
        // Fix aspect ratio warning
        style={{ width: 'auto', height: 'auto' }}
      />
    </div>
  );
};

export default LoadingLogo;