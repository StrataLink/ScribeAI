require('dot-env').config();

const app = express();

app.use(express.json())
app.use(cors({credentials: true, origin: true}))
app.use(cookieParser())
// app.use('/uploads', express.static('/uploads'))

//Routing Part:
app.use('/api', allRoutes)

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log("Successful connection with database"))
    .catch(console.error);

const server = app.listen(3001, () => console.log("Server started on port 3001"));

const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.on('connection',(socket)=>{
  socket.on("joined room",(roomCode)=>{
    socket.join(roomCode)
    console.log("User Joined Room: " + roomCode);
  })
  socket.on("new message",(newMessageRecieved)=>{
    socket.to(newMessageRecieved.room._id).emit("message received", newMessageRecieved);
  })
})