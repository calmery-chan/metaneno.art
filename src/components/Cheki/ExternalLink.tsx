import React from "react";

export const ExternalLink: React.FC<{ href: string }> = ({
  children,
  href,
}) => (
  <a href={href} rel="noopener noreferrer" target="_blank">
    {children}
  </a>
);
