import Navigation from './Navigation';
import Footer from './Footer';
import CanonicalTags from './CanonicalTags';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <CanonicalTags />
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
