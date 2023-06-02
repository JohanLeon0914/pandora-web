import './globals.css'
import { Nanum_Myeongjo } from 'next/font/google';
import Header from '../components/header/Header'
import Footer from '@/components/footer/Footer';
 
const inter = Nanum_Myeongjo({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: '400'
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
          <Header />
        <div className='pt-20'>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
