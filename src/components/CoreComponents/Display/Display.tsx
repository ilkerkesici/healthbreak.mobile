import React, {memo} from 'react';
interface DisplayProps {
  children: React.ReactNode;
  show: boolean | unknown;
}

const Display = ({children, show}: DisplayProps) => {
  if (!show) {
    return null;
  }

  return <>{children}</>;
};

export default memo(Display);
