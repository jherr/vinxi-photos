import { eventHandler, getRequestURL } from "vinxi/http";
import fs from "node:fs/promises";
import imageSize from "image-size";

export default eventHandler(async (event) => {
  const info = getRequestURL(event);
  if (info.pathname.startsWith("/api/photos")) {
    const files = await fs.readdir("./photos");
    const photos: {
      photo: string;
      height: number;
      width: number;
    }[] = [];
    for (const photo of files.filter((file) => file.endsWith(".jpg"))) {
      const { height, width } = imageSize(`./photos/${photo}`);
      photos.push({ photo, height: height!, width: width! });
    }
    return photos;
  }
});
