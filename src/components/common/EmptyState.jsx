import React from 'react';
import Button from './Button';

export const EmptyState = ({
  icon: Icon,
  title = 'No results found',
  description = 'Try adjusting your search criteria or clear active filters.',
  actionLabel,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center rounded-xl border border-dashed border-border-dark bg-bg-card/20 my-6">
      {Icon && (
        <div className="w-14 h-14 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center mb-4 text-brand-blue">
          <Icon className="w-7 h-7" />
        </div>
      )}
      <h4 className="text-base font-semibold text-txt-main mb-1.5">{title}</h4>
      <p className="text-sm text-txt-secondary max-w-md mb-5 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
