import React from 'react';
import { getStatusBadgeConfig } from '../../utils/formatters';

export const Badge = ({ status, customLabel, variant, size = 'sm', className = '' }) => {
  const config = getStatusBadgeConfig(status || variant);
  const label = customLabel || config.label;

  const sizeStyles = {
    xs: 'text-[10px] px-2 py-0.5',
    sm: 'text-xs px-2.5 py-1',
    md: 'text-sm px-3 py-1.5'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeStyles[size]} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`} />
      <span>{label}</span>
    </span>
  );
};

export default Badge;
