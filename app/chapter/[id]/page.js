import ChaptersComponent from "@/components/ChapterComponent/ChapterComponent";

export const metadata = {
  title: {
    absolute: "Leer capitulo | La Caja de Pandora",
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
