import { useRef, useState } from "react";
import axios from "axios";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const urlRef = useRef()
  function onClick() {
    const data = {
      url: longUrl,
    };
    axios
      .post("https://spoo.me/", data, {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      })
      .then((response) => {
        return(response.data);
      }).then((data)=> setShortUrl(data.short_url))
      .catch((error) => {
        console.log(error);
      });
  
  }
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center bg-green-100">
        <div>
          <h1 className="text-xl">URL Shortener</h1>
          <div>
            <input
              type="text"
              placeholder="Enter your URL here"
              className="border border-black px-2 py-1 w-[400px]"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
            />
            <button
              className="bg-green-600 p-1 px-2 ml-3 text-white"
              onClick={() => {
                onClick()
              }}
            >
              Submit
            </button>
          </div>
          <div>
            <p>Your short url: <span className="" ref={urlRef}>{shortUrl}</span></p>
            <button className="bg-yellow-400 p-1 text-white" onClick={() => {
              navigator.clipboard.writeText(shortUrl); 
              urlRef.current.style.backgroundColor = "lightblue"
            }}>
              Copy to clipboard
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
