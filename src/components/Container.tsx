import React from 'react';
import { ContainerProps, GridContainerProps } from '@/types';
import '../styles/globals.css';

/**
 * Basic container component for consistent spacing and layout
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  fluid = false,
  padding = 'md',
}) => {
  const getPaddingClasses = () => {
    switch (padding) {
      case 'none':
        return '';
      case 'sm':
        return 'p-2 sm:p-4';
      case 'lg':
        return 'p-4 sm:p-6 lg:p-8';
      case 'md':
      default:
        return 'p-4 sm:p-6';
    }
  };

  const containerClasses = `
    ${fluid ? 'w-full' : 'max-w-7xl mx-auto'}
    ${getPaddingClasses()}
    ${className}
  `;

  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
};

/**
 * Grid container component for responsive layouts
 */
export const GridContainer: React.FC<GridContainerProps> = ({
  children,
  cols = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = 4,
  className = '',
}) => {
  const getGridClasses = () => {
    if (typeof cols === 'number') {
      return `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${Math.min(cols, 3)} lg:grid-cols-${Math.min(cols, 4)}`;
    }

    const { xs = 1, sm = 2, md = 3, lg = 4, xl = 4 } = cols;
    return `
      grid
      grid-cols-${xs}
      sm:grid-cols-${sm}
      md:grid-cols-${md}
      lg:grid-cols-${lg}
      xl:grid-cols-${xl}
    `;
  };

  const getGapClasses = () => {
    if (typeof gap === 'string') {
      return `gap-${gap}`;
    }
    return `gap-${gap}`;
  };

  const gridClasses = `
    ${getGridClasses()}
    ${getGapClasses()}
    ${className}
  `;

  return (
    <div className={gridClasses}>
      {children}
    </div>
  );
};

/**
 * Flex container component for simple layouts
 */
export const FlexContainer: React.FC<{
  children: React.ReactNode;
  direction?: 'row' | 'col';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  wrap?: boolean;
  gap?: number | string;
  className?: string;
}> = ({
  children,
  direction = 'row',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  gap = 0,
  className = '',
}) => {
  const getDirectionClasses = () => {
    switch (direction) {
      case 'col':
        return 'flex-col';
      case 'row':
      default:
        return 'flex-row';
    }
  };

  const getAlignClasses = () => {
    switch (align) {
      case 'start':
        return 'items-start';
      case 'center':
        return 'items-center';
      case 'end':
        return 'items-end';
      case 'stretch':
      default:
        return 'items-stretch';
    }
  };

  const getJustifyClasses = () => {
    switch (justify) {
      case 'center':
        return 'justify-center';
      case 'end':
        return 'justify-end';
      case 'between':
        return 'justify-between';
      case 'around':
        return 'justify-around';
      case 'start':
      default:
        return 'justify-start';
    }
  };

  const getGapClasses = () => {
    if (typeof gap === 'string') {
      return `gap-${gap}`;
    }
    return gap > 0 ? `gap-${gap}` : '';
  };

  const flexClasses = `
    flex
    ${getDirectionClasses()}
    ${getAlignClasses()}
    ${getJustifyClasses()}
    ${wrap ? 'flex-wrap' : 'flex-nowrap'}
    ${getGapClasses()}
    ${className}
  `;

  return (
    <div className={flexClasses}>
      {children}
    </div>
  );
};

/**
 * Card container component with consistent styling
 */
export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  neon?: boolean;
}> = ({
  children,
  className = '',
  padding = 'md',
  hover = true,
  neon = false,
}) => {
  const getPaddingClasses = () => {
    switch (padding) {
      case 'none':
        return '';
      case 'sm':
        return 'p-4';
      case 'lg':
        return 'p-8';
      case 'md':
      default:
        return 'p-6';
    }
  };

  const cardClasses = `
    ${neon ? 'card-neon' : 'card'}
    ${getPaddingClasses()}
    ${hover ? 'hover:transform hover:scale-[1.02]' : ''}
    ${className}
  `;

  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
};

export default Container;