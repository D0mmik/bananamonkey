import {ChangeEvent, useState} from "react";

function FileUpload() {

  const [fileUrl, setFileUrl] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [uploadResponse, setUploadResponse] = useState();

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

    console.log(formData)

    try {
      const response = await fetch("https://bananamonkey-129035833870.europe-west3.run.app/api/predict", {
        method: "POST",
        body: formData,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
      });

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
    <div className="w-96 h-80 flex items-center">
      {file && <img src={fileUrl} className="rounded-xl"/>}
    </div>
    <input type="file" className="w-60" accept="image/jpeg, image/png" onChange={handleFileChange}/>
    <button onClick={handleUpload} className="bg-yellow-800 p-2 m-2 rounded-xl">Upload</button>
    {uploadResponse != undefined && <p>
      {uploadResponse > 0.5 ? "Monkey" : "Banana"}
    </p>}
    {uploadResponse}
  </div>)
}

export default FileUpload
