import { neon } from '@neondatabase/serverless'
import Link from 'next/link'

export const runtime = 'edge'

const getData = async () => {
  const sql = neon(process.env.DATABASE_URL as string)  

  const projects = await sql`
    SELECT uname, title FROM projects
  `
  return projects
}

const Home = async () => {
  try {
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
  } catch (error) {
    return <div>error<br />{error as string}</div>
  }  
}

export default Home