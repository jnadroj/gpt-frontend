import clsx from 'clsx';

interface RecommendationProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Recommendation: React.FC<RecommendationProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={clsx(
        'border border-gray-200 p-4 rounded-md w-fit bg-white shadow-xs hover:shadow-md transition-shadow hover:scale-105 duration-200 ease-in-out hover:bg-gray-50',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Recommendation;
