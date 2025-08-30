import Container from "@/components/common/container";
import NotionChatbot from "@/feature/chatbot/page";

interface PageProps {
  searchParams: { isOpen: string };
}

const HomePage = ({ searchParams }: PageProps) => {
  const { isOpen } = searchParams;
  return (
    <Container isOpen={isOpen}>
      <NotionChatbot  />
    </Container>
  );
};
export default HomePage;
