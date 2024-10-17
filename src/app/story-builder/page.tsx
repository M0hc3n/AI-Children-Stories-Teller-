"use client";

import { IImageAndSequence } from "@/api/interfaces";
import Theater from "@/components/icons/Theater";
import ImageBuilder from "@/components/story builder/ImageBuilder";
import { Link } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useState } from "react";

const Page = ({ searchParams }) => {
  const { res: storyResult } = searchParams;
  const listRes = JSON.parse(storyResult).filter((ele : string) => ele.length > 0);

const [imagesWithSequences, setImagesWithSequences] = useState<
    IImageAndSequence[]
  >(
    listRes.map(
      (sequence: string) => ({ sequence, image: "" } as IImageAndSequence)
    )
  );

  const isLinkVisible = () => {
    return imagesWithSequences.every((imSeq) => imSeq.image.length > 0);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-5 lg:gap-8 py-9 px-6">
        {listRes.map((sequence: string) => (
          <ImageBuilder
            key={sequence}
            sequence={sequence}
            setImagesWithSequences={setImagesWithSequences}
          />
        ))}
      </div>

      {isLinkVisible() && (
        <Button
          href={`/theater?res=${JSON.stringify(imagesWithSequences)}`}
          as={Link}
          className="mx-auto"
          color="primary"
          variant="solid"
          endContent={<Theater />}
        >
          Proceed into Theater
        </Button>
      )}
    </div>
  );
};

export default Page;
