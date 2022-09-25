import { LyraDemo } from "../components/Demo";

export default function Demo() {
  return (
    <div className='bg-violet-900 container-full'>
      <div className="h-[400px] pt-10">
        <div className="flex flex-col justify-center h-full container-lg">
          <h1 className="text-4xl font-black"> Try Lyra </h1>
          <p>Type a search term to perform a full-text search on a dataset of 37,859 historical events.</p>
        </div>
      </div>

      <div className="bg-violet-600 py-20 container-full">
        <div className="min-h-[300px] container-lg">
          <LyraDemo />
        </div>
      </div>
    </div>
  )
}