import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

type ColumnsSkeletonProps = { darkMode: boolean };

const ColumnsSkeleton: React.FC<ColumnsSkeletonProps> = ({ darkMode }) => {
  const skeleton = [0, 1, 2].map((item) => {
    return (
      <SkeletonTheme
        key={item}
        baseColor={darkMode ? "hsl(235 12% 19%)" : "grey"}
        highlightColor={darkMode ? "#444" : "white"}
        borderRadius="8px"
      >
        <div className="flex flex-col mr-3">
          <div>
            <Skeleton
              height={20}
              width={20}
              circle={true}
              className="mx-3"
              inline={true}
            />
            <Skeleton height={10} width={90} />
          </div>
          <div className=" p-1">
            <Skeleton
              height={80}
              width={280}
              count={item * 2 + 3}
              className="mt-5 pt-5"
            />
          </div>
        </div>
      </SkeletonTheme>
    );
  });
  return <>{skeleton}</>;
};
export default ColumnsSkeleton;
