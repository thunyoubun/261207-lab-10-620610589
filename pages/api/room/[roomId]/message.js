import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
  if (req.method === "GET") {
    const rooms = readDB();
    const id = req.query.roomId;

    const roomIdx = rooms.findIndex((x) => x.roomId === id);
    if (roomIdx === -1)
      return res.status(404).json({ ok: false, message: "Invalid room id" });

    return res.json({ ok: true, message: rooms[roomIdx].messages });
  } else if (req.method === "POST") {
    const rooms = readDB();
    const id = req.query.roomId;
    const newId = uuidv4();

    //validate body
    if (typeof req.body.text !== "string")
      return res.status(400).json({ ok: false, message: "Invalid Text Input" });

    const roomIdx = rooms.findIndex((x) => x.roomId === id);
    if (roomIdx === -1)
      return res.status(404).json({ ok: false, message: "Invalid Text Input" });

    const text = req.body.text;
    const newMessage = {
      messageId: newId,
      text: text,
    };
    rooms[roomIdx].messages.push(newMessage);
    writeDB(rooms[roomIdx].messages);

    return res.json({ ok: true, message: rooms[roomIdx].messages });

    //read request body

    //create new id
  }
}
