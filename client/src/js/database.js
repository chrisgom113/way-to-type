import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });


export const putDb = async (id, value) => { 
  console.log("Adding data");
  const jatedb = await openDB("jate", 1);
  const tx = jatedb.transaction("jate", "readwrite");
  const objStore = tx.objectStore("jate");
  const req = objStore.put({value: value, id: id});
  const res = await req;
  console.log("Data added");
}


export const getDb = async (value) => {
  console.error("Retrieving data");

  const jatedb = await openDB("jate", 1);
  const tx = jatedb.transaction("jate", "readwrite");
  const objStore = tx.objectStore("jate");
  const req = objStore.getAll();
  const res = await req;
  console.log("Data retrieved");
};

initdb();
