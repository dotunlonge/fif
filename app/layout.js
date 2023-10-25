import { Inter } from 'next/font/google'
import './styles/globals.css'
import './styles/page.scss';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Fif',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
