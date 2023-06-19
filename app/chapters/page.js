import ChaptersComponent from '@/components/ChaptersComponent/ChaptersComponent';
import Search from '@/components/Search/Search';

export const metadata = {
  title: {
    absolute: 'Capitulos | La Caja de Pandora',
  },
};

export default function Home() {

  return (
    <>
      <Search />
      <ChaptersComponent />
    </>
  );
}