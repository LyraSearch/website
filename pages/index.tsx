import type { NextPage } from 'next'
import Image from 'next/image'
import { useEffect } from 'react'
import GitHubButton from 'react-github-btn'
import hljs from 'highlight.js';

import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/atom-one-dark.css'

const Home: NextPage = () => {

  useEffect(() => {
    hljs.registerLanguage('javascript', javascript);
    hljs.initHighlighting();

  }, [])

  return (
    <>
      <div className='bg-gradient-to-b from-[#150232] to-[#0a0019] container-full'>
        <div className='flex w-full justify-center items-center py-10 h-screen md:h-[700px] container-lg'>
          <div className='grid gap-10 grid-cols-1 md:grid-cols-2'>

            <div className='w-full h-full flex items-center'>
              <div>
                <h1 className='text-4xl md:text-6xl font-black'> Lyra </h1>
                <h2 className='text-xl mt-6'> Fast, typo-tolerant, full-text search engine written in TypeScript. </h2>

                <div className='flex mt-6'>
                  <div className='mr-4'>
                    <GitHubButton href="https://github.com/nearform/lyra" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star nearform/lyra on GitHub">Star</GitHubButton>
                  </div>
                  <GitHubButton href="https://github.com/nearform/lyra/fork" data-icon="octicon-repo-forked" data-size="large" data-show-count="true" aria-label="Fork nearform/lyra on GitHub">Fork</GitHubButton>
                </div>
              </div>
            </div>

            <div className='w-full flex justify-center'>
              <div className='relative h-full w-full'>
                <Image
                  src='/imgs/demo/preview-light.png'
                  alt='An example usage of Lyra'
                  layout='responsive'
                  width={'100%'}
                  height={'76%'}
                  className='shadow-lg shadow-violet-900'
                />
              </div>
            </div>

          </div>
        </div>
      </div>


      <div className='bg-violet-900 container-full'>
        <div className='flex flex-col justify-center items-center pt-5 pb-7 container-lg'>
          <p className='mb-2 text-xs'> Built & sponsored by </p>
          <img src='/imgs/sponsors/nearform.svg' className='w-48' />
        </div>
      </div>

      <div className='bg-violet-700 text-slate-100 container-full'>
        <div className='py-20 container-lg'>
          <h2 className='font-bold text-3xl'> Why? </h2>

          <div className='grid grid-cols-1 md:grid-cols-[60%_1fr] gap-10'>
            <p className='mt-6'>
              Lyra is a modern, dependency-free full-text search engine written in TypeScript. <br />
              It has been built with speed in mind and completes most search lookups in a few microseconds. <br /><br />

              It implements a very fast, vanilla prefix tree to perform efficient lookups and easy serialization with multiple formats, such as dpack and protocol buffers. <br /><br />

              Its main focus is to be able to run on edge networks, such as <b>AWS Lambda@Edge</b>, <b>Cloudflare Workers</b>, and <b>Netlify Functions</b>, so expect some updates on that. <br /><br />

              It was named after the Lyra constellation due to its distributed and highly scalable nature.
            </p>

            <div className='flex-col items-end justify-end hidden md:flex'>
              <div className='relative w-96 h-full shadow-lg shadow-violet-900'>
                <Image
                  src='/imgs/dall-e/dall-e-lyra.png'
                  layout='fill'
                  objectFit='cover'
                  objectPosition='center'
                  alt='Lyra designed by DALL-E'
                  className=''
                />
              </div>
              <p className='w-96 text-center mt-4 text-violet-200'>
                Lyra imagined by DALL-E
              </p>
            </div>

          </div>
        </div>

        <div className='border-t-2 border-violet-500 py-20 container-lg'>
          <h2 className='font-bold text-3xl'> Quickstart </h2>

          <div>
            <h3 className='font-bold text-2xl my-10'> Install Lyra </h3>
            <pre>
              <code className='bash rounded-lg'>yarn add @nearform/lyra</code>
            </pre>

            <h3 className='font-bold text-2xl my-10'> Create a new database </h3>
            <pre>
              <code className="js rounded-lg">
                {`import { create } from '@nearform/lyra'
const db = create({
  schema: {
    quote: 'string',
    author: 'string'
  }
})`}
              </code>
            </pre>

            <h3 className='font-bold text-2xl my-10'> Insert data </h3>
            <pre>
              <code className="js rounded-lg">
                {`import { create, insert } from '@nearform/lyra'

insert(db, {
  quote: 'It is during our darkest moments that we must focus to see the light.',
  author: 'Aristotle'
});

insert(db, {
  quote: 'If you really look closely, most overnight successes took a long time.',
  author: 'Steve Jobs'
});

insert(db, {
  quote: 'If you are not willing to risk the usual, you will have to settle for the ordinary.',
  author: 'Jim Rohn'
});

insert(db, {
  quote: 'You miss 100% of the shots you don\\'t take',
  author: 'Wayne Gretzky - Michael Scott'
});
`}
              </code>
            </pre>

            <h3 className='font-bold text-2xl my-10'> Search for data </h3>
            <pre>
              <code className="js rounded-lg">
                {`import { create, insert, search } from '@nearform/lyra'

const searchResult = search(db, {
  term: 'if',
  properties: '*'
});

// output:

{
  elapsed: 99, // elapsed time is in microseconds
  hits: [
    {
      id: 'ckAOPGTA5qLXx0MgNr1Zy',
      quote: 'If you really look closely, most overnight successes took a long time.',
      author: 'Steve Jobs'
    },
    {
      id: 'fyl-_1veP78IO-wszP86Z',
      quote: 'If you are not willing to risk the usual, you will have to settle for the ordinary.',
      author: 'Jim Rohn'
    }
  ],
  count: 2
}
`}
              </code>
            </pre>
          </div>

          <div className='text-center mt-20'>
            <a href='https://docs.lyrajs.io/' className='text-violet-100 bg-violet-900 hover:bg-violet-800 px-6 py-3 font-bold text-xl rounded-md'>
              Read the full docs
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
