import fetch from "node-fetch";
import fs from "fs";

const ACCESS_TOKEN = "MLY|9289312644451279|5a5079127e4716c99f08b037749a84b2";

const WORLD_BOUNDS = {
  west: -180,
  south: -90,
  east: 180,
  north: 90,
};

async function fetchImages() {
  try {
    let allImages = [];

    for (let lat = WORLD_BOUNDS.south; lat < WORLD_BOUNDS.north; lat += 10) {
      for (let lon = WORLD_BOUNDS.west; lon < WORLD_BOUNDS.east; lon += 10) {
        const bbox = [lon, lat, lon + 10, lat + 10].join(",");
        console.log(`📍 Fetching images for BBOX: ${bbox}`);

        try {
          const res = await fetch(
            `https://graph.mapillary.com/images?access_token=${ACCESS_TOKEN}&fields=id,geometry,camera_parameters,camera_type,captured_at,thumb_1024_url&bbox=${bbox}&limit=500`
          );

          if (!res.ok) {
            console.log(`❌ HTTP Error ${res.status}: ${res.statusText}`);
            continue;
          }

          let data;
          try {
            data = await res.json();
          } catch (error) {
            console.log("❌ Failed to parse JSON, likely an empty response.");
            continue;
          }

          if (!data || !data.data) {
            console.log("⚠️ No valid data received.");
            continue;
          }

          const sphericalImages = data.data.filter(
            (img) => img.camera_type === "spherical"
          );

          if (sphericalImages.length < 20) {
            console.log(
              `⚠️ Only ${sphericalImages.length} images found, skipping...`
            );
            continue;
          }

          console.log(`✅ Found ${sphericalImages.length} spherical images.`);
          allImages.push(...sphericalImages);

          // Delay to avoid rate-limiting
          await new Promise((res) => setTimeout(res, 1000));
        } catch (error) {
          console.error("❌ Network or Fetch Error:", error);
        }
      }
    }

    if (allImages.length === 0) {
      console.log("⚠️ No images found in the entire world bounds.");
    } else {
      fs.writeFileSync("images.json", JSON.stringify(allImages, null, 2));
      console.log(`🚀 Saved ${allImages.length} images to images.json!`);
    }
  } catch (error) {
    console.error("❌ Error fetching images:", error);
  }
}

fetchImages();
