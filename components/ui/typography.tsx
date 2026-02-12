import React from 'react';

// 디자인 시스템에서 허용하는 토큰들 정의
type Variant = 'h1' | 'h2' | 'h3' | 'body' | 'caption';
type Color = 'whiten' | 'bodytext' | 'primary' | 'success';

interface TypographyProps {
  variant: Variant;
  color?: Color;
  children: React.ReactNode;
  className?: string; // 추가적인 커스텀 여백 등을 위해 허dd용
}

const variantStyles: Record<Variant, string> = {
  h1: "text-[28px] font-bold leading-[34px] tracking-tight",
  h2: "text-[24px] font-semibold leading-[30px]",
  h3: "text-[20px] font-medium",
  body: "text-[14px] leading-relaxed",
  caption: "text-[12px] uppercase tracking-wider font-medium"
};

const colorStyles: Record<Color, string> = {
  whiten: "text-white",
  bodytext: "text-[#8a99af]",
  primary: "text-[#3c50e0]",
  success: "text-[#10b981]"
};

export const Typography: React.FC<TypographyProps> = ({ 
  variant, 
  color = 'whiten', 
  children, 
  className = "" 
}) => {
  const Tag = variant.startsWith('h') ? variant : 'p';

  return (
    <Tag className={`${variantStyles[variant]} ${colorStyles[color]} ${className}`}>
      {children}
    </Tag>
  );
};