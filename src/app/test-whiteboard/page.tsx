import NotionLoader from "@/components/common/loader";
import Forms from "@/feature/whiteboard/forms";
import { Suspense } from "react";

const WhiteBoard = () => {
  return (
    <div>
      <Suspense fallback={<NotionLoader />}>
        <Forms />
      </Suspense>
    </div>
  );
};
export default WhiteBoard;
