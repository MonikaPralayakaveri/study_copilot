import { useState } from "react";

function App() {
  
  // Stores user input
  const [question, setQuestion] = useState("");

  // Stores loading state
  const [loading, setLoading] = useState(false);  

  // Stores AI message
  const [messages, setMessages] = useState([]);


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
    //AI Request Flow finished
    setLoading(false);

    console.log("===== FLOW FINISHED =====");
  }


  return (

    <div style={{ padding: "40px" }}>

      <h1>AI Study Copilot</h1>


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


        style={{
          width: "300px",
          padding: "10px"
        }}
      />


      <button
        onClick={askAI}
        style={{
          marginLeft: "10px",
          padding: "10px"
        }}
      >
        Ask AI
      </button>
      {loading && <p>AI is thinking...</p>}


      <div style={{ marginTop: "30px" }}>

        <h2>Chat History</h2>
        {
          messages.map((msg, index) => ( //loop through messages and display them
            <div
              key={index}
              style={{
                marginBottom : "20px",
                padding: "10px",
                border: "1px solid grey"
              }}
            >
              <p>
                <strong>Q:</strong> {msg.question}
              </p>

              <p>
                <strong>AI:</strong> {msg.answer}
              </p>
            </div>
          ))
        }



      </div>

    </div>
  );
}

export default App;