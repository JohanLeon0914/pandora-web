import Link from "next/link";
import Image from "next/image";

function Footer() {
  return (
    <>
      <footer className="bg-[#141414] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="https://www.instagram.com">
                <div className="flex items-center">
                  <Image
                    className="w-8 h-8 mr-2"
                    alt="Instagram Icon"
                    src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png"
                    width={32}
                    height={32}
                  />
                  <span className="text-sm">Follow us on Instagram</span>
                </div>
              </Link>
            </div>
            <div>
              <Link href="https://www.twitter.com">
                <div className="flex items-center">
                  <Image
                    className="w-9 h-8 mr-2"
                    alt="Twitter Icon"
                    src="/images/logoTwitter.png"
                    width={36}
                    height={32}
                  />
                  <span className="text-sm">Follow us on Twitter</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-[#080808] py-4 text-center">
          <p className="text-sm text-gray-300">
            &copy;2023 La caja de pandora. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
