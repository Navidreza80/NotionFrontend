"use server";

import Container from "@/components/common/container";
import EditorWrapper from "@/feature/Editor";
import { fetchPageById } from "@/lib/actions/page.action";

const Page = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { isOpen: string; expandedPageId: string };
}) => {
  const { id } = await params;
  const { isOpen, expandedPageId } = searchParams;
  const page = await fetchPageById(id);
  const content = page.content;
  return (
    <Container isOpen={isOpen} expandedPageId={expandedPageId}>
      <div className="p-4">
        <EditorWrapper
          id={id}
          title={page.title}
          content={content}
          updatedAt={page.updatedAt}
        />
      </div>
    </Container>
  );
};
export default Page;
