import { useCallback, useMemo, useState } from "react";

import { create, insert, formatNanoseconds } from "@nearform/lyra";
import { schema } from "../../lib/lyra-helpers";
import events from "../../lib/datasets/events";
import { formatNumber, getNanosecondsTime } from "../../lib/utils";
import { PlayIcon, RefreshIcon } from "../Icons";

let db = create({
  schema: schema as any,
});

export default function InsertDemo() {
  const [documentsInserted, setDocumentsInserted] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0n);

  const data = useMemo(
    () => events.result.events.slice(0, events.result.events.length),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [events, db]
  );

  const totalDocuments = useMemo(() => data.length, [data]);

  const handleInsertion = useCallback(() => {
    const events = data.splice(0, 300 + Math.floor(Math.random() * 1000));

    if (!events.length) {
      return;
    }

    const startTime = getNanosecondsTime();

    for (const event of events) {
      insert(db, {
        date: event.date,
        description: event.description,
        categories: {
          category1: event.category1,
          category2: event.category2,
        },
        granularity: event.granularity,
      });

      setDocumentsInserted((documentsInserted) => documentsInserted + 1);
    }

    setTimeElapsed(
      (timeElapsed) => timeElapsed + (getNanosecondsTime() - startTime)
    );

    requestAnimationFrame(handleInsertion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, db]);

  const reset = () => {
    setDocumentsInserted(0);
    setTimeElapsed(0n);

    db = create({
      schema: schema as any,
    });
  };

  return (
    <>
      <div>
        <h2 className="text-2xl font-black">
          {" "}
          How fast is <i>insert</i> action?{" "}
        </h2>
        <p>
          Performing this action is very important in cases where databases are
          used. It is the heart of the search engine. It creates IDs, indexes
          and stores organized data. It must be fast.
        </p>
      </div>

      <div className="pt-10">
        <p className="text-xl font-bold">Let&apos;s try!</p>

        <div className="flex flex-row justify-between h-full pt-5">
          <span className="text-body">
            Total of documents should be inserted:{" "}
          </span>
          <span>
            <strong>{formatNumber(totalDocuments)}</strong>
          </span>
        </div>
        <div className="flex flex-row justify-between h-full pt-5">
          <span className="text-body">Total of douments inserted: </span>
          <span>
            <strong>{formatNumber(documentsInserted)}</strong>
          </span>
        </div>
        <div className="flex flex-row justify-between h-full pt-5">
          <span className="text-body">Time Elapsed:</span>
          <span>
            <strong>{formatNanoseconds(timeElapsed)}</strong>
          </span>
        </div>

        {/* Progress bar */}
        <div className="flex flex-row justify-between h-full pt-2">
          <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{
                width: `${(documentsInserted / totalDocuments) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-row justify-center pt-5 lg:justify-start">
          <button
            onClick={handleInsertion}
            className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            <PlayIcon />
          </button>

          <button
            onClick={reset}
            className="px-4 py-2 mr-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-700"
          >
            <RefreshIcon />
          </button>
        </div>

        {/* More stats */}
        <div className="grid grid-cols-3 gap-10 pt-5 text-center">
          <div className="grid col-span-1">
            <span className="text-body">
              <strong>
                {formatNumber(documentsInserted)} /{" "}
                {formatNumber(totalDocuments)}
              </strong>{" "}
              documents inserted
            </span>
          </div>
          <div className="grid col-span-1">
            <span className="text-body">
              <strong>{formatNanoseconds(timeElapsed)}</strong> elapsed
            </span>
          </div>
          <div className="grid col-span-1">
            <span className="text-body">
              <strong>{Math.ceil(documentsInserted / 1000)} </strong>
              documents/ms
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
