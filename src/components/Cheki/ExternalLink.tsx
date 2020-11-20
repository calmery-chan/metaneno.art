import React from "react";

export const ExternalLink: React.FC<{ className?: string; href: string }> = ({
  className,
  children,
  href,
}) => (
  <a
    className={className}
    href={href}
    rel="noopener noreferrer"
    target="_blank"
  >
    {children}
  </a>
);
