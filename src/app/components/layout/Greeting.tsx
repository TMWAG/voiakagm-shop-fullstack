import { cookies } from "next/headers";

export default function Greeting(){
  
  return (
    <p className="text-lg mt-12 mx-32 mb-5 cursor-default">
      Привет, <span className="text-violet-500">{cookies().get('user-name')?.value || 'Камрад'}!</span>
    </p>
  );
}