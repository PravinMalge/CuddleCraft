import { Sandbox } from "@e2b/code-interpreter";
import { openai, createAgent } from "@inngest/agent-kit"
import { inngest } from "./client";
import { getSandbox } from "./utils";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {

    const sandboxId = await step.run("get-sandbox-id", async () =>{
      const sandBox = await Sandbox.create("cuddlecraft-nextjs-test-2");
      return sandBox.sandboxId;
    })
     const summarizer = createAgent({
      name: "summarizer",
      system: "You are an expert summarizer.  You summarize readable, concise, simple content.",
      model: openai({ model: "gpt-4o" }),
    });


    const { output } = await summarizer.run(
    `summerize the following text: ${event.data.text}`,
    );

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
        const sandBox = await getSandbox(sandboxId);
        const host =  sandBox.getHost(3000);
        return `https://${host}`
    })

    return {output , sandboxUrl };
  },
);