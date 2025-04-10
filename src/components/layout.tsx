import { Link, Outlet } from 'react-router';

const linkHover =
  'hover:text-[#fadba6] trasition-all duration-150 hover:text-shadow-lg hover:decoration-cyan-300';

function Layout() {
  return (
    <div>
      <div className="tracking-wider h-16 bg-cyan-800 px-8 text-white font-bold text-xl flex items-center justify-center gap-8">
        <Link to={'/qrcode-scan'} className={linkHover}>
          QR Code掃描
        </Link>
        <span>|</span>
        <Link to={'/stock-calculator'} className={linkHover}>
          股票計算機
        </Link>
        <span>|</span>
        <Link to={'/css-test'} className={linkHover}>
          CSS測試
        </Link>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
