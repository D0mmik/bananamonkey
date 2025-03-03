import {ChangeEvent, useState} from "react";

function FileUpload() {

  const [fileUrl, setFileUrl] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [uploadResponse, setUploadResponse] = useState();
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.error("No file selected");
      return;
    }

    const fileURL = URL.createObjectURL(e.target.files[0]);
    setFileUrl(fileURL);
    setFile(e.target.files[0])
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true)
      const response = await fetch("https://bananamonkey-129035833870.europe-west3.run.app/api/predict", {
        method: "POST",
        body: formData,
        headers: {
        },
      });

      setLoading(false)
      if (!response.ok) {
        throw new Error("Upload failed.");
      }

      const data = await response.json();
      setUploadResponse(data.prediction);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };


  return (<div className="flex justify-center flex-col items-center">
    <div className="size-96 flex items-center justify-center m-3">
      {file && <img src={fileUrl} className="rounded-xl size-96"/>}
    </div>
    <input type="file" className="w-60" accept="image/jpeg, image/png" onChange={handleFileChange}/>
    {!loading ?
      <>
        <button onClick={handleUpload} className="bg-yellow-800 p-2 m-2 rounded-xl">Upload</button>
        {uploadResponse != undefined && <p>
          {uploadResponse > 0.5 ? "Monkey" : "Banana"}
        </p>}
        {uploadResponse}
      </> : <p>loading...</p>
    }
  </div>)
}

export default FileUpload
