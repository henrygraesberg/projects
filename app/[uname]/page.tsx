import { neon } from '@neondatabase/serverless'
import { marked } from 'marked'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FC } from 'react'

import "./uname.css"

interface DBObject {
  uname: string
  title: string
  r2url: string
  source_code_link?: string
  project_link?: string
}

const getData = async (uname: string) => {
  const sql = neon(process.env.DATABASE_URL as string)  

  const projectData = await sql`
    SELECT * FROM projects WHERE uname = ${uname}
  `
  return projectData[0] as DBObject
}

const getParsedHTML = async (projectData: DBObject) => {
  const markdown = await fetch(projectData.r2url)

  if (markdown.status !== 200) { throw new Error('Failed to fetch markdown', { cause: markdown }) }

  return marked.parse(await markdown.text(), { async: true })
}

const page: FC<{ params: Promise<{uname: string}> }> = async ({ params }) => {
  try {
    const projectData = await getData((await params).uname)
    const articleHTML = await getParsedHTML(projectData)

    return (
      <div className="m-4">
        <h1 className="text-3xl underline text-purple-700 font-bold">{
        projectData.project_link
        ?
        <Link href={projectData.project_link} target="_blank">{projectData.title}</Link>
        :
        projectData.title
        }</h1>

        <div dangerouslySetInnerHTML={{ __html: articleHTML }} className="my-3 markdown" />
        {
        projectData.source_code_link
        &&
        <Link href={projectData.source_code_link} target="_blank" className="underline text-purple-700 font-bold">Source Code</Link>
        }
      </div>
    )
  } catch (e) {
    console.error(e)
    return notFound()
  }  
}

export default page