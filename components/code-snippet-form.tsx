'use client'

import { createClient } from "@/lib/supabase/client"
import { useRef } from "react"
import { useRouter } from "next/navigation"
import { CodeBlock } from "./tutorial/code-block"
import { create } from "domain"

export default function CodeSnippetForm() {

  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    const title = formData.get('title') as string
    const language = formData.get('language') as string
    const codeblock = formData.get('codeblock') as string

    const supabase = createClient()
    const { error } = await supabase.from('snippets').insert([
      {
        title,
        language,
        codeblock
      }
    ])
    if (error) {
      alert(`Error saving snippet: ${error.message}`)
      return
    }

    formRef.current?.reset()
    router.refresh()
  }

  return (
    <form className='flex flex-1 flex-col gap-6 px-4 py-8 border border-white rounded-2xl w-full h-fit' action="">
    <input 
    name='title' 
    type="text"
    className='p-2 rounded-lg' />

    <select name="language" id="cars" className='p-2 rounded-lg'>
      <option value="volvo">Python</option>
      <option value="saab">JavaScript</option>
      <option value="mercedes">Java</option>
      <option value="audi">C++</option>
      <option value="audi">C#</option>
      <option value="audi">Rust</option>
      <option value="audi">TypeScript</option>
    </select>


    <textarea className="rounded-lg h-full p-2 field-sizing-content" name="codeblock" id="codeblock" rows={12}></textarea>

    <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors self-end"
      >
        Save Snippet
      </button>
  </form>
  )
}


