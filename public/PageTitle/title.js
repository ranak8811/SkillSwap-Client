import { useEffect } from "react";

function useTitle(path) {
  useEffect(() => {
    document.title = `${path} || SkillSwap`;
    return () => {};
  }, [path]);
}

export default useTitle;
