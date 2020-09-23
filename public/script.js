const socket=io();

const videoGrid=document.getElementById('video-grid');
const myvideo = document.createElement('video');
myvideo.muted = true;

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    videoGrid.append(video);
}

let myVideoStream;
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(myvideo,stream);
})

socket.emit('join-room',ROOM_ID);

socket.on('user-connected',()=>{
    connectToNewUser();
})

const connectToNewUser=()=>{
    console.log('New user');
}
