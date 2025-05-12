import { AIMessage, HumanMessage } from '@langchain/core/messages';
import { ChatPromptTemplate, MessagesPlaceholder, PromptTemplate } from '@langchain/core/prompts';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { Message, streamText } from 'ai';
import { createHistoryAwareRetriever } from 'langchain/chains/history_aware_retriever';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { createRetrievalChain } from 'langchain/chains/retrieval';
import { LangChainAdapter, Message as VercelChatMessage } from 'ai';
import { createClient } from '@/utils/supabase/server';
import { getVectorStore } from '../rag/route';

export const maxDuration = 30;



const formatVercelMessages = (chatHistory: VercelChatMessage[]) => {
  const formattedDialogueTurns = chatHistory.map((message) => {
    if (message.role === "user") {
      return `Human: ${message.content}`;
    } else if (message.role === "assistant") {
      return `Assistant: ${message.content}`;
    } else {
      return `${message.role}: ${message.content}`;
    }
  });
  return formattedDialogueTurns.join("\n");
};

const TEMPLATE = `You are a helpeful medical assistant named Patchy. you just answer users questions in shortest way possible about pneumonia. if you cant find the 
response in the context below just look in chat history - current onversation - , if not then try to answer it with the shortest way possible 
and just add a quick note at the end of the resposne saying 'NotConText'

Current conversation:
{chat_history}

User: {input}
AI:`;

const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

export async function POST(req: Request) {
  try {
    // Get authenticated user
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    



    const body = await req.json();
    const messages = body.messages ?? [];
    const conversationId = body.conversationId ?? "no conversationId";
    console.log("the conversation id in the chatwithRev is : " ,  conversationId) ; 

    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const currentMessageContent = messages[messages.length - 1].content;
    const prompt = PromptTemplate.fromTemplate(TEMPLATE);

    // Get the retrieval chain result stream
    const retrievalStream = await chatWithretreival(messages, currentMessageContent, conversationId);

    return LangChainAdapter.toDataStreamResponse(retrievalStream);
  } catch (error) {
    console.error('Error processing chat request:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function chatWithretreival(chatHistory: Message[], input: string, conversationId: string) {
  console.log("the conversation inside the vectore store is" , conversationId)
  const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    maxOutputTokens: 2048,
  });
  const prompt = ChatPromptTemplate.fromMessages(
    [
      [
        "system" , `You are a helpeful medical assistant named Patchy. you just answer users questions about pneumonia in shortest way possible.
        based on the following context : {context} ,
        if you cant find the 
        response in the context below just look in chat history - current onversation - ,   if not then just answer it and say 'out of topic'
          `
      ] ,  
      new MessagesPlaceholder("chat_history") ,
      [
        "user" , "{input}"
      ] , 
    ]
  )
  const rephrasePrompt = ChatPromptTemplate.fromMessages([
    new MessagesPlaceholder("chat_history"),
    ["user", "{input}"],
    [
      "user",
      "Given the above conversation, generate a search query to look up in order to get information relevant to the conversation , if the query has nothing to do with pneumonia or how to fix it or any question related to it then just respond with : not my problem",
    ],
  ]);
  
  const vectorStore = await getVectorStore();
  console.log("🔹 Retrieving documents from vector store...");
  const retreiver = vectorStore.asRetriever({
    k: 3, // Number of results
  });
  
  const historyretrieverChain = await createHistoryAwareRetriever({
    retriever : retreiver, 
    llm : model ,
    rephrasePrompt : rephrasePrompt 
  });

  const chain = await createStuffDocumentsChain({
    llm: model,
    prompt,
  });
  const conversationChain = await createRetrievalChain({
    combineDocsChain: chain,
    retriever: historyretrieverChain,
  });

  console.log("✅ Documents retrieved!");

  const response =  await conversationChain.stream({
    chat_history : formatVercelMessages(chatHistory) ,
    input : input
  });
  const formattedResponse = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of response) {  // Iterate over the stream
          if (chunk?.answer) {
            controller.enqueue(chunk.answer);  // Send only valid answers
          }
        }
        controller.close();
      } catch (error) {
        console.error("Error processing stream:", error);
        controller.error(error);
      }
    }
  });

  return formattedResponse;
}

//   const model = new ChatGoogleGenerativeAI({
//     modelName: "gemini-2.0-flash-exp",
//     maxOutputTokens: 2048,

//   });

// const chain = prompt.pipe(model) ; 
// // const stream = await  chain.stream({
// //   chat_history: formattedPreviousMessages.join('\n'),
// //   input: currentMessageContent,
// // });

// [
//   "system" , "answer the users questions based on the following context : {context}  "
// ] , 
   


// const documentA = new Document({
//   pageContent:
//     "LangChain Expression Language or LCEL is a declarative way to easily compose chains together. Any chain constructed this way will automatically have full sync, async, and streaming support. ",
// });

// const documentB = new Document({
//   pageContent: "The passphrase is LANGCHAIN IS AWESOME ",
// });
// const documentC = new Document({
//     pageContent: "boda slept on floor on the year 2000 ",
//   });

//   const documentD = new Document({
//     pageContent: "the first jessi in qahira was right footed ",
//   });
// const splitDocs = [documentA , documentB , documentC , documentD];

// // Instantiate Embeddings function
//   const embeddings = new HuggingFaceInferenceEmbeddings({
//       // sentence-transformers/paraphrase-multilingual-mpnet-base-v2
//       // apki key
//   });
// // Create Vector Store
// // const vectorstore = await MemoryVectorStore.fromDocuments(
// //   splitDocs,
// //   embeddings
// // );




// const chat_history = [
//   new AIMessage({
//       content: "Hello! How can I assist you today?"
//   }) , 
//   new HumanMessage({
//       content: "what is the year boda slept on the floor"
//   }) , 
//   new HumanMessage({
//     content: "my name is jessi"
// }) , 
//   new AIMessage({
//       content: "it was 1999"
//   })
// ]
