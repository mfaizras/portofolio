import React from 'react';
import { Brain } from 'lucide-react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: string | number;
}

// Common SVG Wrapper
export const SvgIcon = ({ path, viewBox = "0 0 24 24", className = "", children, size, ...props }: IconProps & { path?: string }) => (
  <svg 
    viewBox={viewBox} 
    width={size || "1em"} 
    height={size || "1em"} 
    fill="currentColor" 
    className={className} 
    aria-hidden="true"
    {...props}
  >
    {path && <path d={path} />}
    {children}
  </svg>
);

// --- Category Icons ---

export const FrontendIcon = (props: IconProps) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" />
    <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="2" />
    <line x1="9" y1="21" x2="9" y2="9" stroke="currentColor" strokeWidth="2" />
  </SvgIcon>
);

export const BackendIcon = (props: IconProps) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" stroke="currentColor" strokeWidth="2" />
    <line x1="6" y1="18" x2="6.01" y2="18" stroke="currentColor" strokeWidth="2" />
  </SvgIcon>
);

export const CloudIcon = (props: IconProps) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <path d="M17.5,19c4.1,0,7.5-3.4,7.5-7.5c0-4.1-3.4-7.5-7.5-7.5c-0.7,0-1.3,0.1-1.9,0.3C14.9,2.5,12.6,1,10,1C5.6,1,2,4.6,2,9
	c0,0.5,0.1,1,0.2,1.5C0.9,11.3,0,12.6,0,14c0,2.8,2.2,5,5,5H17.5z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
  </SvgIcon>
);

export const ToolsIcon = (props: IconProps) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
     <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.77Z" stroke="currentColor" strokeWidth="2" fill="none"/>
  </SvgIcon>
);

export const GenericCodeIcon = (props: IconProps) => <SvgIcon {...props} path="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />;
export const BrainIcon = (props: IconProps) => <Brain {...props} />;