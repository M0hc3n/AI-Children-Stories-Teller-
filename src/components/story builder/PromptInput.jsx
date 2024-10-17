"use client";

import { useEffect, useState } from "react";
import { Textarea, Button } from "@nextui-org/react";
import Loading from "react-loading-components";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { getStoryFromPrompt } from "@/lib/getStoryFromPrompt";
import { inputExample } from "@/api/constants";

export default function PromptInput() {
  const router = useRouter();

  const [quoteInfo, setQuoteInfo] = useState(inputExample);
  const [state, formAction] = useFormState(getStoryFromPrompt, {
    success: false,
    redirectTo: "",
  });
  useEffect(() => {
    if (state.success && state.res) {
      router.push(
        `/story-builder?res=${JSON.stringify(
          state.res.split("\\").map((part) => part.trim())
        )}`
      );
    }
  }, [state, router]);

  return (
    <div className="max-w-3xl mx-auto py-4">
      <h1 className="text-2xl font-bold mb-2 dark:text-white">Story Builder</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Find quotes from a source that you can use in your writing.
      </p>

      <form
        action={formAction}
        className="space-y-6 flex flex-col justify-center"
      >
        <Textarea
          id="quote-info"
          label="Information or Description of Quote"
          placeholder="Enter the Half-Remembered Quotes, and leave it to the AI to find out the quote you meant!"
          value={quoteInfo}
          onChange={(e) => setQuoteInfo(e.target.value)}
          maxLength={200}
          variant="faded"
          minRows={3}
        />
        <p className="text-right text-sm text-gray-500 dark:text-gray-400">
          {quoteInfo.length}/200
        </p>

        <SubmitButton />
      </form>
    </div>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <>
      <Button
        disabled={pending}
        color="primary"
        type="submit"
        className="w-full mt-5"
      >
        Generate Quote
      </Button>
      {pending && (
        <div className="mx-auto">
          <Loading type="oval" width={40} height={40} fill="#92E3A9" />
        </div>
      )}
    </>
  );
};
