import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { NavigationProps } from '@/types';
import '../styles/globals.css';

const Navigation: React.FC<NavigationProps> = ({
  items,
  activeItem,
  onItemClick,
  orientation = 'vertical',
}) => {
  const handleItemClick = (item: any) => {
    onItemClick?.(item);
  };

  const renderNavigationItem = (item: any, depth = 0) => {
    const isActive = activeItem === item.id;
    const hasChildren = item.children && item.children.length > 0;
    const isHorizontal = orientation === 'horizontal';

    const itemClasses = `
      nav-item
      ${isActive ? 'nav-item-active' : ''}
      ${isHorizontal ? '' : depth > 0 ? 'ml-4' : ''}
      flex items-center justify-between
      ${hasChildren ? 'cursor-pointer' : ''}
    `;

    const iconClasses = `
      w-4 h-4
      ${isActive ? 'text-neon-blue' : 'text-gray-400'}
      ${item.icon ? '' : 'invisible'}
    `;

    return (
      <div key={item.id} className={!isHorizontal && depth === 0 ? 'mb-1' : ''}>
        <div
          className={itemClasses}
          onClick={() => hasChildren ? handleItemClick(item) : handleItemClick(item)}
        >
          <div className="flex items-center gap-3">
            {item.icon && <item.icon className={iconClasses} />}
            <span className="truncate">{item.label}</span>
            {item.badge && (
              <span className={`
                px-2 py-0.5 text-xs rounded-full
                ${isActive
                  ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
                  : 'bg-gray-700/50 text-gray-300 border border-gray-600/50'
                }
              `}>
                {item.badge}
              </span>
            )}
          </div>

          {hasChildren && (
            <div className="ml-2">
              {item.expanded ? (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
            </div>
          )}
        </div>

        {hasChildren && item.expanded && (
          <div className="mt-1">
            {item.children.map((child: any) => renderNavigationItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const containerClasses = `
    ${orientation === 'horizontal' ? 'nav-horizontal' : 'nav-vertical'}
  `;

  return (
    <nav className={containerClasses}>
      {items.map((item) => renderNavigationItem(item))}
    </nav>
  );
};

export default Navigation;