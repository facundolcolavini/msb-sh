import type { JSX, PropsWithChildren } from 'preact/compat';
import ListResultsSkeleton from './Skeletons/ListResultsSkeleton';
import Spinner from './Spinner';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

interface Props {
  children: JSX.Element;
  loaderConent: string;
  isLoading: boolean;
  addStyles?: string;
}

function LoadingContent({ children, loaderConent, isLoading, addStyles }: PropsWithChildren<Props>) {
  const styles = twMerge(clsx(" lg:col-start-4 lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-4 w-full animate-pulse", addStyles));


  const renderLoader = () => {
    switch (loaderConent) {
      case 'Spinner':
        return <Spinner />;
      case 'ListResultsSkeleton':
        return <ListResultsSkeleton />;
      default:
        return null;
    }
  };

  return (
    <div>
      {isLoading ? (
        <div id="loader" className={styles}>
          {renderLoader()}
        </div>
      ) : (
        <div id="content" className="animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
}

export default LoadingContent;
