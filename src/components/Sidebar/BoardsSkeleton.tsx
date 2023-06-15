import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

type BoardsSkeletonProps = {
  darkMode: boolean;
};

const BoardsSkeleton: React.FC<BoardsSkeletonProps> = ({ darkMode }) => {
  return (
    <SkeletonTheme
      baseColor={darkMode ? "hsl(205 12% 19%)" : "grey"}
      highlightColor={darkMode ? "#444" : "white"}
      borderRadius={0.5}
    >
      <div>
        <Skeleton height={23} width={200} className="mt-5" />
        <Skeleton
          height={43}
          width={240}
          count={3}
          className="mt-5"
          borderRadius={"0px 30px 30px 0px"}
        />
      </div>
    </SkeletonTheme>
  );
};
export default BoardsSkeleton;
