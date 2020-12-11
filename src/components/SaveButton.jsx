import React from "react"

export default function SaveButton({ save }) {
  return (
    <button
      onClick={save}
      className="fixed bottom-0 left-0 bg-green-200 text-green-600 w-full mt-2 h-12 border-4 border-admin-blue hover:text-white font-bold text-xl hover:bg-green-500 float-right"
    >
      Save
    </button>
  )
}
