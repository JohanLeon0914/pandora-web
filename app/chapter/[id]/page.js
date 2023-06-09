import ChaptersComponent from "@/components/ChapterComponent/ChapterComponent";

export const metadata = {
  title: {
    absolute: "Leer capitulo",
  },
};
const Chapter = ({ params }) => {

  return (
    <>
      <ChaptersComponent params={params} />
    </>
  );
};

export default Chapter;
