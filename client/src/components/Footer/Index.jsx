import FooterSkewBackground from '../../assets/background-footer.jpg';
import LineFooter from '../../assets/footer-line.png';

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* bloco preto com background skew vindo da imagem */}
      <div
        className="bg-black bg-no-repeat bg-top bg-cover"
        style={{
          backgroundImage: `url(${FooterSkewBackground})`,
        }}
      >
        <div className="container mx-auto text-center text-white py-16 px-4">
          <p className="text-xl font-medium">Need help?</p>
          <a
            href="mailto:coopers@coopers.pro"
            className="mt-2 inline-block text-lg font-semibold hover:underline"
          >
            coopers@coopers.pro
          </a>
          <p className="mt-4 text-sm text-gray-300">
            © {new Date().getFullYear()} Coopers. All rights reserved.
          </p>
        </div>
        {/* barra verde asset, vazando pra fora */}
      <img
        src={LineFooter}
        alt=""
        className="block mt-[-4px] mx-auto"
      />
      </div>
    </footer>
  );
}