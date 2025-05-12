import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "langchain/document";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";



interface CleanDoc {
    id: string;
    pageContent: string;
    metadata: {
        page: any;
        startLine: any;
        endLine: any;
    };
}


export async function POST(req: Request) {
    console.log("the file is being uploaded")
    const formData = await req.formData();

    const file = formData.get('file') as File;

    if (!file) {
      return new Response('Missing file or index name', { status: 400 });
    }
    const fileBlob = new Blob([file], { type: file.type });


    const allSplits = await loadAndSplitPdfFile(fileBlob) ; 
    console.log(allSplits[0] , " and the splits length is ", allSplits.length) ;
    try {
        const result = await storeSplitsToPineConeIndex(allSplits)
        console.log(result) ; 
    } catch (error) {
        console.error('Error storing splits:', error)
        return new Response('Error storing splits', { status: 500 });
    }
    return new Response(JSON.stringify({ message: 'File uploaded successfully', splits: allSplits.length }), { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      });  
  }



//   const prepareFiles
export async function loadAndSplitPdfFile (filePath: string | Blob) : Promise<CleanDoc[]> {

  
    const loader = new PDFLoader(filePath);
    
    const docs = await loader.load();
    // console.log(docs[0]);
  
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000, chunkOverlap: 200
    });
    const allSplits = await splitter.splitDocuments(docs);
    // return allSplits ;
    const cleanedDocs = allSplits.map(doc => ({
        id: doc.id ?? crypto.randomUUID(), // Ensure an ID exists
        pageContent: doc.pageContent.replace(/\n+/g, ' ')
        .replace(/•(\S)/g, '• $1') // Add space after bullet points
        .trim()
        , // Remove extra spaces and new lines
        // metadata:doc.metadata.loc
        metadata: {
          source : doc.metadata.source ?? null ,
            page : doc.metadata.loc['pageNumber'] ?? null , 
            startLine: doc.metadata.loc['lines']["from"] ?? null , 
            endLine: doc.metadata.loc['lines']["to"] ?? null , 

        }
      }));

      return cleanedDocs as CleanDoc[] ; 
  }

  export async function getVectorStore() {
    const embeddings = new HuggingFaceInferenceEmbeddings({
    //   sentence-transformers/paraphrase-multilingual-mpnet-base-v2
      // apki key
  });

  const pinecone = new PineconeClient();
  
  const pineconeIndex = pinecone.Index("aitheme");
  
  const vectorStore = new PineconeStore(embeddings, {
    pineconeIndex,
    maxConcurrency: 5,
  });

    return vectorStore ; 
  }


//   const storeVectores
export async function storeSplitsToPineConeIndex(allSplits  : CleanDoc[]
) {
   const vectorStore = await getVectorStore() ; 
    
  const result = await vectorStore.addDocuments(allSplits) ; 

  console.log("here ra ethe result " + result) ; 
  }



  
  ///:+++++ i need to first make the chuncs without /n and weird stuff then store it 
  /// get the data and serelize it 
  




// export async function testingWithRetrievers (formData: FormData ) {
//     const vectorStore = await initVectoreStore() ; 
//     const retriever = vectorStore.asRetriever({
//       searchType: "mmr"
//     }) ;
//   } 
  