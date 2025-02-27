import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-center p-6">
      <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found 😵</h1>
      <img 
        src="https://i.imgflip.com/1bij.jpg" 
        alt="Meme 404"
        className="w-96 h-auto mt-4 rounded-lg shadow-lg"
      />
      <p className="mt-4 text-lg">Oops! Looks like you're lost in the meme universe. 🤣</p>
      <Link href="/">
        <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Go Back Home 🏠
        </button>
      </Link>
    </div>
  );
}
