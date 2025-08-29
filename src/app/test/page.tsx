import EditorWrapper from "@/feature/Editor";
import { fetchPageById } from "@/lib/actions/page.action";

const Page = async () => {
  const page = await fetchPageById("1");
  const content = page.content;
  return (
    <div>
      <EditorWrapper content={content} />
    </div>
  );
};
export default Page;
