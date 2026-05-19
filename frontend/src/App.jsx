import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

function App() {
  
  // Stores user input
  const [question, setQuestion] = useState("");

  // Stores loading state
  const [loading, setLoading] = useState(false);  

  // Stores AI message
  const [messages, setMessages] = useState([]);
  // Reference to the end of the chat history for auto-scrolling(POINTER OF bottom chat)
  const chatEndRef = useRef(null);

  useEffect(() => {

    chatEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }, [messages]);


  // Runs when button clicked
  async function askAI() {

    //AI Request Flow started
    setLoading(true);
    console.log("===== BUTTON CLICKED =====");

    console.log("Current question:");
    console.log(question);


    console.log("Sending request to backend...");

    // Send request to backend
    const response = await fetch(

      `http://127.0.0.1:8000/ask?question=${question}`

    );


    console.log("Raw response received:");
    console.log(response);


    console.log("Converting response to JSON...");

    // Convert response into JS object
    const data = await response.json();

    console.log("FULL DATA:");
    console.log(data);

    console.log("ANSWER:");
    console.log(data.answer);


    console.log("JSON data received:");
    console.log(data);


    console.log("Extracted answer:");
    console.log(data.answer);


    console.log("Updating frontend state...");


    setMessages([
      ...messages, // Keep previous messages
      {
        question: question,
        answer: data.answer // Add new question-answer pair
      }
    ]);
    setQuestion(""); // Clear input field

    //AI Request Flow finished
    setLoading(false);

    console.log("===== FLOW FINISHED =====");
  }


  return (

    <div className="min-h-screen bg-gray-100 p-10">

    <h1 className="text-5xl font-bold text-blue-600 mb-8">
      AI Study Copilot
    </h1>


      <input

        type="text"

        placeholder="Ask something..."

        value={question}


        // Runs every time user types
        onChange={(e) => {

          console.log("===== INPUT CHANGED =====");

          console.log("New input value:");
          console.log(e.target.value);

          setQuestion(e.target.value);
        }}

        onKeyDown={(e) => {
          console.log("Key pressed:");
          console.log(e.key);

          //If Enter key is pressed, trigger askAI function
          if (e.key === "Enter" && question.trim() !== "") {

            console.log("Enter Detected - Triggering askAI function...");

            askAI();
          }

        }}

        className="
          border
          border-gray-400
          rounded-xl
          px-4
          py-3
          w-[350px]
          shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-blue-400
        "
      />


      <button
        onClick={askAI}
        className="
          ml-3
          bg-blue-500
          hover:bg-blue-600
          text-white
          px-5
          py-3
          rounded-xl
          shadow-md
        "
      >
        Ask AI
      </button>
      {loading && <p>AI is thinking...</p>}

      <button
        onClick = {() => {
          console.log("CLEAR CHAT CLICKED");
          setMessages([]);
        }}

        className="
          ml-3
          bg-red-500
          hover:bg-red-600
          text-white
          px-5
          py-3
          rounded-xl
          shadow-md
        "
      >
        Clear Chat
      </button>

      <div style={{ marginTop: "30px" }}>

        <h2 className="text-2xl font-semibold mb-5">
          Chat History
        </h2>
        {
          messages.map((msg, index) => ( //loop through messages and display them
          <div key={index} className="mb-6 max-w-3xl">
            {/* for user message, justify to right */}
            {/* USER MESSAGE */}

            <div className="flex justify-end mb-2"> 

              <div
                className="
                  bg-blue-500
                  text-white
                  px-5
                  py-3
                  rounded-2xl
                  shadow-md
                  max-w-[70%]
                "
              >
                {msg.question}
              </div>

            </div>

            {/* for ai message, justify to left */}
            {/* AI MESSAGE */}
            
            <div className="flex justify-start">

              <div
                className="
                  bg-white
                  px-5
                  py-3
                  rounded-2xl
                  shadow-md
                  max-w-[70%]
                "
              >
                <ReactMarkdown>
                  {msg.answer}
                </ReactMarkdown>
              </div>

            </div>

          </div>
        ))}
        {/* Invisible scroll target */}
        <div ref={chatEndRef}></div>
      </div>
    </div>
  );
}

export default App;