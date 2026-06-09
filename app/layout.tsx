import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Hamburger from './Hamburger'

export const metadata: Metadata = {
  title: {
    template: '%s | Interactive Speaking',
    default: 'Interactive Speaking | TOEIC English Practice',
  },
  description: 'Interactive Speaking provides English language training for TOEIC students.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; max-width: 100%; }
          html, body { overflow-x: hidden; width: 100%; }
          body { font-family: system-ui, -apple-system, Arial, sans-serif; color: #1A1A1A; background: #fff; }
          a { text-decoration: none; }
          img { max-width: 100%; height: auto; }
          h1, h2, h3, h4, h5, h6 { font-family: system-ui, -apple-system, Arial, sans-serif !important; }

          .nav-wrapper { background: white; border-bottom: 1px solid #E0E0E0; position: sticky; top: 0; z-index: 100; width: 100%; }
          .nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 40px; display: flex; align-items: center; justify-content: space-between; height: 70px; }
          .nav-logo-name { color: #0066CC; font-weight: 800; font-size: 1.4rem; letter-spacing: -0.02em; }
          .nav-links { display: flex; gap: 32px; align-items: center; }
          .nav-links a { color: #444444; font-size: 0.88rem; font-weight: 400; transition: color 0.2s; letter-spacing: 0.01em; }
          .nav-links a:hover { color: #0066CC; }
          .nav-btn { background: #0066CC; color: white !important; padding: 9px 22px; border-radius: 50px; font-weight: 400 !important; font-size: 0.88rem !important; }
          .nav-btn:hover { background: #0044AA; color: white !important; }
          .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 4px; }
          .hamburger span { display: block; width: 25px; height: 2px; background: #1A1A1A; }
          .mobile-menu { display: none; flex-direction: column; background: white; border-top: 1px solid #E0E0E0; padding: 16px 40px; box-shadow: 0 4px 8px rgba(0,0,0,0.06); position: sticky; top: 70px; z-index: 99; width: 100%; }
          .mobile-menu a { color: #444444; font-size: 0.88rem; padding: 12px 0; border-bottom: 1px solid #f0f0f0; display: block; font-weight: 400; }
          .mobile-menu a:last-child { border-bottom: none; }
          .mobile-menu .uni-link { color: #0066CC; font-weight: 600; }

          .footer { background: #0066CC; color: white; padding: 60px 40px 30px; width: 100%; }
          .footer-inner { max-width: 1200px; margin: 0 auto; }
          .footer-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; margin-bottom: 40px; }
          .footer-brand-name { font-weight: 800; font-size: 1.3rem; margin-bottom: 4px; }
          .footer-brand-sub { color: rgba(255,255,255,0.6); font-size: 0.8rem; margin-bottom: 16px; }
          .footer-brand-desc { color: rgba(255,255,255,0.7); font-size: 0.85rem; line-height: 1.7; }
          .footer-heading { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(255,255,255,0.6); margin-bottom: 16px; font-weight: 600; }
          .footer-link { display: block; color: rgba(255,255,255,0.85); font-size: 0.9rem; margin-bottom: 10px; transition: color 0.2s; }
          .footer-link:hover { color: white; }
          .footer-bottom { border-top: 1px solid rgba(255,255,255,0.15); padding-top: 24px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
          .footer-bottom p { color: rgba(255,255,255,0.5); font-size: 0.8rem; }

          @media (max-width: 768px) {
            .nav-links { display: none; }
            .hamburger { display: flex; }
            .mobile-menu.open { display: flex; }
            .nav-inner { padding: 0 20px; }
            .mobile-menu { padding: 16px 20px; }
            .footer { padding: 40px 20px 20px; }
            .footer-grid { grid-template-columns: 1fr !important; }
            section {
              padding-left: 20px !important;
              padding-right: 20px !important;
              padding-top: 60px !important;
              padding-bottom: 60px !important;
            }
            h1 { font-size: 1.4rem !important; line-height: 1.2 !important; }
            h2 { font-size: 1.3rem !important; line-height: 1.2 !important; }
            h3 { font-size: 1.1rem !important; }
            div[style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
            div[style*="display: flex"][style*="gap"] { flex-wrap: wrap !important; }
          }
        `}</style>
      </head>
      <body>

        <div className="nav-wrapper">
          <div className="nav-inner">
            <a href="/" style={{ textDecoration: 'none' }}>
              <div className="nav-logo-name">Interactive Speaking</div>
            </a>
            <div className="nav-links">
              <a href="/lessons">Lessons</a>
              <a href="/toeic-parts">TOEIC Parts</a>
              <a href="/voice-assistant">Voice Assistant</a>
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
              <a href="/universities" className="nav-btn">For Universities</a>
            </div>
            <Hamburger />
          </div>
        </div>

        <div id="mobile-menu" className="mobile-menu">
          <a href="/lessons">Lessons</a>
          <a href="/toeic-parts">TOEIC Parts</a>
          <a href="/voice-assistant">Voice Assistant</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/universities" className="uni-link">For Universities</a>
        </div>

        {children}

        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-grid">
              <div>
                <div className="footer-brand-name">Interactive Speaking</div>
                <div className="footer-brand-sub">TOEIC English Practice</div>
                <p className="footer-brand-desc">Helping students build the confidence and skills to ace the TOEIC exam.</p>
              </div>
              <div>
                <h4 className="footer-heading">Learning</h4>
                <a href="/lessons" className="footer-link">All Lessons</a>
                <a href="/toeic-parts" className="footer-link">TOEIC Parts</a>
                <a href="/voice-assistant" className="footer-link">Voice Assistant</a>
              </div>
              <div>
                <h4 className="footer-heading">For Universities</h4>
                <a href="/universities" className="footer-link">University Portal</a>
                <a href="/universities/resources" className="footer-link">Resources</a>
              </div>
              <div>
                <h4 className="footer-heading">Legal</h4>
                <a href="/privacy" className="footer-link">Privacy Policy</a>
                <a href="/terms" className="footer-link">Terms of Use</a>
                <a href="/cookies" className="footer-link">Cookie Policy</a>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© {new Date().getFullYear()} Interactive Speaking. All rights reserved.</p>
              <p>TOEIC English practice for students worldwide.</p>
            </div>
          </div>
        </footer>

      </body>
    </html>
  )
}