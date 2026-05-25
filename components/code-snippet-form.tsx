'use client'

import { createClient } from "@/lib/supabase/client"
import { useRef } from "react"
import { useRouter } from "next/navigation"
import { create } from "domain"

export default function CodeSnippetForm() {

  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    const title = formData.get('title') as string
    const language = formData.get('language') as string
    const codeblock = formData.get('codeblock') as string

    const supabase = createClient()

    const { data: { user }, error:  userError } = await supabase.auth.getUser()

        // 👇 ADD THESE LOGS HERE
    console.log("--- RLS DIAGNOSTIC TEST ---")
    console.log("1. Current Logged-In User Object:", user)
    console.log("2. What we are sending as user_id:", user?.id)
    console.log("3. Any Auth Errors?:", userError)

    if (!user || userError) {
      alert("you must be logged in to save snippets")
      return
    }

    const { error } = await supabase.from('snippets').insert([
      {
        title,
        language,
        codeblock,
        user_id: user?.id,
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
    <form ref={formRef} className='flex flex-1 flex-col gap-6 px-4 py-8 border border-white rounded-2xl w-full h-fit' action={handleSubmit}>
    <input 
    required
    name='title' 
    type="text"
    className='p-2 rounded-lg' />

    <select name="language" id="cars" className='p-2 rounded-lg'>
      <option value="Python">Python</option>
      <option value="JavaScript">JavaScript</option>
      <option value="Java">Java</option>
      <option value="C++">C++</option>
      <option value="C#">C#</option>
      <option value="Rust">Rust</option>
      <option value="TypeScript ">TypeScript</option>
    </select>


    <textarea required className="rounded-lg h-full p-2 field-sizing-content" name="codeblock" id="codeblock" rows={12}></textarea>

    <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors self-end"
      >
        Save Snippet
      </button>
  </form>
  )
}


