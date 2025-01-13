import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  name: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {items[items.length - 1].name}
      </h2>
      <nav>
        <ol className="flex items-center gap-2">
          {items.map((item, index) => (
            <li key={index}>
              {item.path ? (
                <Link className="font-medium" to={item.path}>
                  {item.name} {index < items.length - 1 && '/'}
                </Link>
              ) : (
                <span className={`font-medium ${index < items.length - 1 ? '' : 'text-primary'}`}>
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;