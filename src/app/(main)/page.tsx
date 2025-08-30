import Container from "@/components/common/container";
import NotionChatbot from "@/feature/chatbot/page";

interface PageProps {
  searchParams: { isOpen: string; expandedPageId: string };
}

const HomePage = async ({ searchParams }: PageProps) => {
  const { isOpen } = await searchParams;
  const { expandedPageId } = await searchParams;
  return (
    <Container expandedPageId={expandedPageId} isOpen={isOpen}>
      <NotionChatbot />
    </Container>
  );
};
export default HomePage;
