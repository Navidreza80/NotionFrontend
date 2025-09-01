"use server";

import Container from "@/components/common/container";
import NotionLoader from "@/components/common/loader";
import Forms from "@/feature/whiteboard/forms";
import { Suspense } from "react";

interface PageProps {
  searchParams: { isOpen: string; expandedPageId: string };
}

const WhiteBoard = async ({ searchParams }: PageProps) => {
  const { isOpen } = await searchParams;
  const { expandedPageId } = await searchParams;
  return (
    <Container isOpen={isOpen} expandedPageId={expandedPageId}>
      <Suspense fallback={<NotionLoader />}>
        <Forms />
      </Suspense>
    </Container>
  );
};
export default WhiteBoard;
