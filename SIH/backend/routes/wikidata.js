import express from "express";

const router = express.Router();

// SPARQL query to get Buddhist monasteries in Sikkim from Wikidata
const SPARQL_QUERY = `
SELECT DISTINCT ?item ?itemLabel ?coords ?image ?inception ?description WHERE {
  ?item wdt:P31/wdt:P279* wd:Q44613;  # instance of monastery (or subclass)
        wdt:P131+ wd:Q1505.              # located in Sikkim
  OPTIONAL { ?item wdt:P625 ?coords. }
  OPTIONAL { ?item wdt:P18 ?image. }
  OPTIONAL { ?item wdt:P571 ?inception. }
  OPTIONAL {
    ?item schema:description ?description.
    FILTER(LANG(?description) = "en")
  }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
}
ORDER BY ?itemLabel
`;

// Cache results for 1 hour
let cache = { data: null, timestamp: 0 };
const CACHE_DURATION = 3600000; // 1 hour

router.get("/monasteries", async (req, res) => {
  try {
    // Return cached if fresh
    if (cache.data && Date.now() - cache.timestamp < CACHE_DURATION) {
      return res.json(cache.data);
    }

    const url = `https://query.wikidata.org/sparql?query=${encodeURIComponent(SPARQL_QUERY)}&format=json`;
    
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(url, {
      headers: {
        "User-Agent": "MysticSikkim/1.0 (https://mysticsikkim.com; contact@mysticsikkim.com)",
        "Accept": "application/json",
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`Wikidata returned ${response.status}`);
    }

    const json = await response.json();
    const results = json.results?.bindings || [];

    const monasteries = results.map((r) => {
      const coords = r.coords?.value;
      let lat = null, lng = null;
      if (coords) {
        // Format: Point(lng lat)
        const match = coords.match(/Point\(([^ ]+) ([^ ]+)\)/);
        if (match) {
          lng = parseFloat(match[1]);
          lat = parseFloat(match[2]);
        }
      }

      return {
        name: r.itemLabel?.value || "Unknown",
        wikidataId: r.item?.value?.split("/").pop(),
        coords: lat && lng ? [lat, lng] : null,
        image: r.image?.value || null,
        inception: r.inception?.value?.split("T")[0] || null,
        description: r.description?.value || null,
      };
    }).filter((m) => m.name !== "Unknown" && m.coords);

    const result = { monasteries, total: monasteries.length, source: "wikidata", fetchedAt: new Date().toISOString() };
    cache = { data: result, timestamp: Date.now() };

    res.json(result);
  } catch (err) {
    console.error("Wikidata fetch error:", err.message);
    // Fallback: return cached data even if stale
    if (cache.data) {
      return res.json({ ...cache.data, stale: true });
    }
    res.status(500).json({ error: "Failed to fetch from Wikidata", message: err.message });
  }
});

// Get Wikimedia Commons images for Sikkim monasteries/murals
router.get("/images", async (req, res) => {
  try {
    const { category = "Buddhist_monasteries_in_Sikkim" } = req.query;
    
    const url = `https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:${encodeURIComponent(category)}&cmtype=file&cmlimit=50&format=json&origin=*`;
    
    const response = await fetch(url, {
      headers: { "User-Agent": "MysticSikkim/1.0" },
    });

    if (!response.ok) throw new Error(`Wikimedia returned ${response.status}`);

    const json = await response.json();
    const files = json.query?.categorymembers || [];

    // Get image URLs
    const titles = files.map((f) => f.title).join("|");
    if (!titles) return res.json({ images: [], total: 0 });

    const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(titles)}&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=800&format=json&origin=*`;
    
    const infoRes = await fetch(infoUrl, {
      headers: { "User-Agent": "MysticSikkim/1.0" },
    });
    const infoJson = await infoRes.json();
    const pages = infoJson.query?.pages || {};

    const images = Object.values(pages)
      .filter((p) => p.imageinfo?.[0])
      .map((p) => {
        const info = p.imageinfo[0];
        const meta = info.extmetadata || {};
        return {
          title: p.title.replace("File:", "").replace(/\.\w+$/, "").replace(/_/g, " "),
          url: info.thumburl || info.url,
          fullUrl: info.url,
          description: meta.ImageDescription?.value?.replace(/<[^>]*>/g, "") || "",
          author: meta.Artist?.value?.replace(/<[^>]*>/g, "") || "Unknown",
          license: meta.LicenseShortName?.value || "",
        };
      });

    res.json({ images, total: images.length, category });
  } catch (err) {
    console.error("Wikimedia fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch images", message: err.message });
  }
});

export default router;
