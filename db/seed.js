import db from "#db/client";

import { createPlaylist } from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";
import { createTrack } from "#db/queries/tracks";
import { createUser } from "./queries/users.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 1; i <= 20; i++) {
    await createTrack("Track " + i, i * 50000);
  }

  for (let i = 1; i <= 2; i++) {
    const user = await createUser({
      username: "user" + i,
      password: "lorem" + i,
    });
    const playlist = await createPlaylist(
      "Playlist " + i,
      "lorem ipsum playlist description",
      user.id,
    );

    for (let j = 1; j <= 5; j++) {
      await createPlaylistTrack(playlist.id, j);
    }
  }
}
