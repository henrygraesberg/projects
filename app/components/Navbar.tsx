import Link from "next/link"

const Navbar = () => (
  <nav className="flex justify-between p-3">
    <Link href="/">Home</Link>
    <Link href="https://graesberg.com" target="_blank">Graesberg.com</Link>
  </nav>
)

export default Navbar