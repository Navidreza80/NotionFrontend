import Container from "@/components/common/container";
import NotionChatbot from "@/feature/chatbot/page";

interface PageProps {
  searchParams: { isOpen: string };
}

const HomePage = async ({ searchParams }: PageProps) => {
  const { isOpen } = await searchParams;
  return (
    <Container isOpen={isOpen}>
      <NotionChatbot  />
    </Container>
  );
};
export default HomePage;
