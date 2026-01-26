export default function SimpleButton({ text, link }) {

  return (
    <div className="border-2 border-[#2f5597] text-[#0A2342] hover:text-white hover:bg-[#DC3545] transition-all py-2 px-4 cursor-crosshair flex flex-row justify-center items-center gap-2">
      <a href={link} target="_blank" rel="noopener noreferrer" className="cursor-crosshair">{text}</a>
    </div>
  )

}