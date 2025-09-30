import { openai, createAgent } from "@inngest/agent-kit"
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
     const summarizer = createAgent({
      name: "summarizer",
      system: "You are an expert summarizer.  You summarize readable, concise, simple content.",
      model: openai({ model: "gpt-4o" }),
    });


    const { output } = await summarizer.run(
    `summerize the following text: ${event.data.text}`,
    );

    return {output};
  },
);