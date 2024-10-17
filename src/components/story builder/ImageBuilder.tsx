import { IImageAndSequence } from "@/api/interfaces";
import { generateImageAction } from "@/lib/drawImageFromSequence";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

import Loading from "react-loading-components";

const ImageBuilder = ({
  sequence,
  setImagesWithSequences,
}: {
  sequence: string;
  setImagesWithSequences: React.Dispatch<
    React.SetStateAction<IImageAndSequence[]>
  >;
}) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    let isMounted = true; // Flag to track if the component is mounted

    const fetchImage = async () => {
      const fetchedImage = await generateImageAction(sequence);

      if (isMounted) {
        // Check if the component is still mounted
        setImage(fetchedImage.res);

        setImagesWithSequences((prev) =>
          prev.map((imSeq) => {
            if (imSeq.sequence === sequence) {
              return { ...imSeq, image: fetchedImage.res };
            } else return imSeq;
          })
        );
      }
    };

    fetchImage();

    return () => {
      isMounted = false; // Cleanup function to set the flag to false
    };
  }, [sequence, setImagesWithSequences]);

  return (
    <Card className="py-4 max-w-[300px] lg:max-w-[500px] flex flex-col items-center justify-center">
      <CardBody className="overflow-visible flex items-center justify-center">
        {image.length < 1 ? (
          <div className="Card background h-[350px] w-full bg-slate-500 rounded-xl flex items-center justify-center">
            <Loading type="oval" />
          </div>
        ) : (
          <Image
            alt="Card background"
            className="object-cover rounded-xl w-full mx-auto h-[350px] "
            src={image ?? "/assets/create-ai-generated-pictures-for-you.webp"}
          />
        )}
      </CardBody>
      <CardFooter className="pb-0 px-4 flex-col items-center">
        <p className="text-base font-bold text-center">{sequence}</p>
      </CardFooter>
    </Card>
  );
};

export default ImageBuilder;
