'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useChat } from '@ai-sdk/react';
import { MoveDown, Send } from 'lucide-react';
import React, { useEffect, useRef } from 'react';



const ChatBotClient = () => {
    const { messages, input, handleInputChange, error, reload, handleSubmit } = useChat({
        api: '/api/chatWithRev',

    });
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);




    return (
        <div className=" relative h-full py-2 pl-16  min-h-screen">
            <div
            // className="flex-1 overflow-y-auto flex items-center justify-center h-screen"
            // style={{ maxHeight: "calc(100vh - 80px)" }}
            >
                {messages.length === 0 ? (
                    // Display welcome message when no messages
                    <div className="text-center text-neutral-400 px-6 max-w-xl w-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <h2 className="text-4xl font-bold mb-6 text-white">How can I help you today? 🤖</h2>
                        <p className="text-base mb-4">
                            Ask me anything related to pneumonia.
                        </p>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="bg-neutral-800 rounded-2xl p-4 shadow-md hover:shadow-lg transition duration-300 text-white">
                                <p className="text-sm">🦠 <strong>Pneumonia</strong> — “What causes pneumonia and how is it treated?”</p>
                            </div>
                            <div className="bg-neutral-800 rounded-2xl p-4 shadow-md hover:shadow-lg transition duration-300 text-white">
                                <p className="text-sm">💊 <strong>treatement</strong> — “What is the recommended treatment for pneumonia?”</p>
                            </div>
                            <div className="bg-neutral-800 rounded-2xl p-4 shadow-md hover:shadow-lg transition duration-300 text-white md:col-span-2">
                                <p className="text-sm">🧠 <strong>Mental Health</strong> — “How serious is pneumonia?”</p>
                            </div>
                        </div>
                    </div>
                ) : (messages.map((m) => (
                    <div
                        key={m.id}
                        className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} my-2`}
                    >
                        <div
                            className={`px-4 py-2 rounded-lg max-w-[75%] ${m.role === "user"
                                ? "bg-neutral-800 text-white self-end"
                                : " text-white self-start"
                                }`}
                        >
                            {/* Apply bold formatting using dangerouslySetInnerHTML */}
                            <span className=''
                                dangerouslySetInnerHTML={{
                                    __html: m.content.replace(/\*\*(.*?)\*\*/g, "<strong class='text-lg'>$1</strong>"),
                                }}
                            />
                        </div>
                    </div>

                )))}
                <div ref={messagesEndRef}></div>


                <div className='h-36'></div>

            </div>


            <button type="button" onClick={() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })} className='fixed right-5 bottom-44 text-neutral-200 rounded-full  p-2' >
                <MoveDown strokeWidth={3} size={30} />
            </button>
            <div className=' absolute bottom-2 left-0 right-0 flex items-center justify-center py-5 bg-neutral-950'>
                <form onSubmit={handleSubmit} className=" bg-neutral-900 flex flex-col p-5 rounded-xl shadow-sm shadow-neutral-800 w-1/2   min-w-72 max-w-3xl gap-3 ">

                    <div className='flex items-center justify-center gap-3'>
                        <input value={input} onChange={handleInputChange} placeholder='write something' className=" w-full  bg-neutral-900 rounded-sm border border-transparent focus:outline-none focus:border-transparent focus:ring-0 px-1 text-white placeholder-gray-400"
                        />
                        <button className='items-baseline flex justify-end' type='submit'><Send /></button>

                    </div>
                    <div>

                        {error && (
                            <>
                                <div>An error occurred.</div>
                                <button type="button" onClick={() => reload()}>
                                    Retry
                                </button>
                            </>
                        )}
                    </div>

                </form>
            </div>

        </div>
    );
}

export default ChatBotClient; 