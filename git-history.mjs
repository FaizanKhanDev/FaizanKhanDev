import { simpleGit } from "simple-git";
import fs from "node:fs";

const dir = "C:\\Users\\hello\\Projects\\ethang\\eglove";

process.chdir(dir);

const git = simpleGit({
  baseDir: dir,
});
const log = await git.log();

// Date to add
const dateToAdd = new Date("2024-04-10T00:00:00Z");

const foundCommit = log.all.find((item) => {
  return new Date(item.date).toLocaleDateString() === dateToAdd.toLocaleDateString();
});

if (foundCommit) {
  console.log(`Commit for ${dateToAdd.toLocaleDateString()} already exists.`);
} else {
  console.log(`Committing for ${dateToAdd.toLocaleDateString()}.`);

  // Write to a file (optional)
  fs.writeFileSync("fake-history.txt", dateToAdd.toISOString());

  // Add and commit
  await git.add(".");
  await git.commit("Added commit for April 10, 2024", {
    "--date": dateToAdd.toISOString(),
  });

  console.log(`Commit created for ${dateToAdd.toLocaleDateString()}.`);
}

await git.push();

process.exit();
