import React, { useEffect, useState } from "react";
import { create, formatNanoseconds, insert, search } from "@nearform/lyra";
import dataset from "../../lib/datasets/events";
import styles from "./demo.module.css";
import { SearchResult, schema } from "../../lib/lyra-helpers";
import { formatNumber, formatYear } from "../../lib/utils";

const db = create({
  schema: schema as any,
});

export function LyraDemo() {
  const [indexing, setIndexing] = useState(dataset.result.events.length);
  const [term, setTerm] = useState("");
  const [exact, setExact] = useState(false);
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [tolerance, setTolerance] = useState(0);
  const [results, setResults] = useState<SearchResult | null>(null);

  useEffect(() => {
    function addDocuments() {
      // We use Random here just to show a nice UI to the user
      const batch = dataset.result.events.splice(
        0,
        300 + Math.floor(Math.random() * 1000)
      );

      if (!batch.length) {
        setIndexing(0);
        return;
      }

      for (const data of batch) {
        insert(db, {
          date: data.date,
          description: data.description,
          categories: {
            category1: data.category1,
            category2: data.category2,
          },
          granularity: data.granularity,
        });
      }

      setIndexing((indexing) => indexing - batch.length);
      requestAnimationFrame(addDocuments);
    }

    addDocuments();
  }, []);

  useEffect(() => {
    if (!term) {
      setResults(null);

      return;
    }

    setResults(
      search(db, {
        term,
        limit,
        offset,
        exact,
        tolerance,
      })
    );
  }, [term, limit, offset, exact, tolerance]);

  if (indexing > 0) {
    return (
      <>
        <div className="flex justify-center text-xl text-center">
          <div>
            <h2>
              Indexing <strong>{formatNumber(indexing)}</strong> events
            </h2>
            <p>We will get back to you shortly ...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <label htmlFor="term" className="font-bold">
          Term
        </label>
        <input
          id="term"
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Type a search term here..."
          className={styles.input}
        />

        <div className="grid grid-cols-2 gap-4 mt-4 lg:gap-10 lg:grid-cols-4">
          <div className="grid">
            <label htmlFor="exact" className="font-bold">Exact</label>
            <select id="exact" value={exact.toString()} onChange={() => setExact(exact => !exact)} className={styles.select}>
              <option value={"false"}>No</option>
              <option value={"true"}>Yes</option>
            </select>
          </div>
          <div className="grid">
            <label htmlFor="limit" className="font-bold">Limit</label>
            <input id="limit" type="number" value={limit} onChange={e => setLimit(parseInt(e.target.value))} className={styles.input} />
          </div>
          <div className="grid">
            <label htmlFor="offset" className="font-bold">Offset</label>
            <input id="offset" type="number" value={offset} onChange={e => setOffset(parseInt(e.target.value))} className={styles.input} />
          </div>
          <div className="grid">
            <label htmlFor="tolerance" className="font-bold">
              Typo tolerance
            </label>
            <input
              id="tolerance"
              type="number"
              value={tolerance}
              max={3}
              min={0}
              onChange={e => setTolerance(parseInt(e.target.value))}
              className={styles.input}
            />
          </div>
        </div>

        {results && (
          <>
            <h2 className="my-5">
              Found <strong>{results.count} results</strong> in{" "}
              <strong>{formatNanoseconds(results.elapsed)}</strong>
            </h2>

            <div>
              {results.hits.map((result, i) => (
                <p key={i + result.description} className='flex flex-col p-4 mb-4 rounded-lg bg-violet-500'>
                  <span className="w-full">
                    Year: <strong>{formatYear(result.date)}</strong>
                  </span>
                  <span className="w-full">
                    Category 1: <strong>{result.categories.category1}</strong>
                  </span>
                  <span className="w-full">
                    Category 2: <strong>{result.categories.category2}</strong>
                  </span>
                  <span className="w-full">
                    Granularity: <strong>{result.granularity}</strong>
                  </span>
                  <span
                    dangerouslySetInnerHTML={{ __html: result.description }}
                  ></span>
                </p>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
