import FileUpload from "./components/FileUpload.tsx";

function App() {
   return(
     <div className="flex h-screen bg-yellow-950 text-yellow-400 flex-col items-center">
       <h1 className="text-4xl mt-20">
         🍌 Banana or Monkey 🐒
       </h1>
       <FileUpload/>
     </div>
   )
}

export default App
