"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DogAvatar() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [src, setSrc] = useState("/me.jpg");
  useEffect(() => {
    fetch("/api/dog-photos", { cache: "no-store" }).then(r => r.ok ? r.json() : null).then(data => {
      if (Array.isArray(data?.photos)) setPhotos(data.photos);
    }).catch(() => {});
  }, []);
  const changePhoto = () => {
    const available = photos.filter(photo => photo !== src);
    if (!available.length) { setSrc("/me.jpg"); return; }
    setSrc(available[Math.floor(Math.random() * available.length)]);
  };
  return <button type="button" onClick={changePhoto} aria-label="Show another photo of Coco" title="Click to see another photo" className="group rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4">
    <Avatar className="size-24 rounded-full border shadow-lg ring-4 ring-muted transition-transform duration-200 group-hover:scale-105 md:size-32">
      <AvatarImage src={src} alt="Coco, my dog" onError={() => setSrc("/me.jpg")} />
      <AvatarFallback>🐶</AvatarFallback>
    </Avatar>
  </button>;
}
