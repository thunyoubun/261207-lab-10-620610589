import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
  if (req.method === "GET") {
    const rooms = readDB();
    const id = req.query.roomId;

    const roomIdx = rooms.findIndex((x) => x.roomId === id);
    if (roomIdx === -1)
      return res.status(404).json({ ok: false, message: "Invalid room id" });

    return res.json({ ok: true, messages: rooms[roomIdx].messages });
  } else if (req.method === "POST") {
    const rooms = readDB();
    const id = req.query.roomId;

    //validate body
    if (typeof req.body.text !== "string")
      return res.status(400).json({ ok: false, message: "Invalid Text Input" });

    const roomIdx = rooms.findIndex((x) => x.roomId === id);
    if (roomIdx === -1)
      return res.status(404).json({ ok: false, message: "Invalid Text Input" });

    const newMessage = {
      messageId: uuidv4(),
      text: req.body.text,
    };
    rooms[roomIdx].messages.push(newMessage);
    writeDB(rooms);

    return res.json({ ok: true, messages: rooms[roomIdx].messages });

    //read request body

    //create new id
  }
}
