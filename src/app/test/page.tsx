import EditorWrapper from "@/feature/Editor";
import { fetchPageById } from "@/lib/actions/page.action";

const Page = async () => {
  const page = await fetchPageById("1");
  const content = page.content;
  console.log(page.updatedAt)
  return (
    <div className="p-4">


      <EditorWrapper title={page.title} content={content} updatedAt={page.updatedAt} />
    </div>
  );
};
export default Page;
