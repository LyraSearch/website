import { LyraDemo } from "../components/Demo";

export default function Demo() {
  return (
    <div className='bg-violet-900 container-full'>
      <div h="[400px]" p="t-10">
        <div h="full" className="flex flex-col justify-center container-lg">
          <h1 className="text-4xl font-black"> Try Lyra </h1>
          <p>Type a search term to perform a full-text search on a dataset of 37,859 historical events.</p>
        </div>
      </div>

      <div p="y-20" className="bg-violet-600 container-full">
        <div className="min-h-[300px] container-lg">
          <LyraDemo />
        </div>
      </div>
    </div>
  )
}