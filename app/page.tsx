'use client';

import Image from "next/image";
import {useQuery} from "@tanstack/react-query";
import axios from 'axios';

const u = "https://jsonplaceholder.typicode.com/posts?limit=10"

const fetchPosts = () => {
  return axios.get('https://jsonplaceholder.typicode.com/posts?limit=10')
}

export default function Home() {
  const {data} = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })

  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <p>
        {
          JSON.stringify(data)
        }
      </p>
      <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        width={72}
        height={16}
      />
    </div>
  );
}
