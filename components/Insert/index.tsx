import { useCallback, useMemo, useState } from "react";
import cn from "classnames";
import { create, insert, formatNanoseconds } from "@nearform/lyra";
import { schema } from "../../lib/lyra-helpers";
import events from "../../lib/datasets/events";
import { getNanosecondsTime, formatNumber } from "../../lib/utils";
import { PlayIcon, RefreshIcon } from "../Icons";

import styles from "./insert.module.css";

let db = create({
  schema: schema as any,
});

const INSERT_LIMIT = 500;

export default function InsertDemo() {
  const [documentsInserted, setDocumentsInserted] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0n);

  const data = useMemo(
    () => events.result.events.slice(0, events.result.events.length),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [events, db]
  );

  const totalDocuments = useMemo(() => data.length, [data]);

  const insertCompleted = useMemo(
    () => documentsInserted === totalDocuments,
    [documentsInserted, totalDocuments]
  );

  const handleInsertion = useCallback(() => {
    if (documentsInserted > totalDocuments) return;

    const events = data.splice(0, INSERT_LIMIT);

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
  }, [documentsInserted, db]);

  const reset = useCallback(() => {
    setDocumentsInserted(0);
    setTimeElapsed(0n);

    db = create({
      schema: schema as any,
    });
  }, []);

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
            onClick={() => {
              if (!insertCompleted) {
                handleInsertion();
              } else {
                reset();
              }
            }}
            className={cn(
              "px-4 py-2 mr-2 font-bold text-white ",
              !insertCompleted
                ? "px-4 py-2 mr-2 font-bold text-white bg-blue-900 rounded hover:bg-blue-700"
                : "bg-gray-500 rounded hover:bg-gray-700"
            )}
          >
            {!insertCompleted ? <PlayIcon /> : <RefreshIcon />}
          </button>
        </div>

        {/* More stats */}
        <style jsx>{``}</style>
        <div className="flex flex-col items-center justify-center pt-5 md:justify-between lg:flex-row">
          <div className={cn(styles.stat, "bg-blue-900 text-blue-100")}>
            <span className="text-lg">Documents inserted</span>
            <div className="flex items-center justify-center m-auto">
              <span className="font-bold text-body">
                {documentsInserted} / {totalDocuments}
              </span>
            </div>
          </div>
          <div className={cn(styles.stat, "bg-green-900 text-green-100")}>
            <span className="text-lg">Elpased Time</span>
            <div className="flex items-center justify-center m-auto">
              <span className="font-bold text-body">
                {formatNanoseconds(timeElapsed)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
