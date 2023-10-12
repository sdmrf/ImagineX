"use client"
import { useState } from "react";
import { create } from "ipfs-http-client";
import "./page.scss";

// Local Variables
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const apiKeySecret = process.env.NEXT_PUBLIC_API_KEY_SECRET;

const authorization =
  "Basic " +
  btoa(
    apiKey + ":" + apiKeySecret
  );

  console.log(apiKey, apiKeySecret);
const ipfs = create({
  url: "https://ipfs.infura.io:5001/api/v0",
  headers: {
    authorization,
  },
});

const page = () => {
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const file = event.target.file.files[0];
    const added = await ipfs.add(file);
    setImage(added);
  };

  console.log(image);
  return (
    <div className="page">
      {ipfs && (
        <form onSubmit={handleSubmit} className="Dragger">
          <input type="file" name="file" />
          <button type="submit">Submit</button>
        </form>
      )}

      {image && (
        <div className="Data">
          <div className="Image">
            <img src={`https://ipfs.io/ipfs/${image.path}`} alt="Uploaded" />
          </div>
          <div className="HashId">
            <p>Hash ID: {image.path}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default page