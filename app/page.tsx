import { neon } from '@neondatabase/serverless'
import Link from 'next/link'

const getData = async () => {
  const sql = neon(process.env.NEON_DATABASE_URL as string)  

  const projects = await sql`
    SELECT uname, title FROM projects
  `
  return projects
}

const Home = async () => {
  const data = await getData()

  return (
    <div>
      <h1>Home</h1>
      {data.map((project) => (
        <div key={project.uname}>
          <h2>{project.title}</h2>
          <Link href={`/${project.uname}`}>Go to</Link>
        </div>
      ))}
    </div>
  )
}

export default Home