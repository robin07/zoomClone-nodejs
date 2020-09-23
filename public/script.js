const socket = io();

const videoGrid = document.getElementById('video-grid');
const myvideo = document.createElement('video');
myvideo.muted = true;

var peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '3030'
})



let myVideoStream;
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(myvideo, stream);

    peer.on('call', (call) => {
        call.answer(stream);
        const video = document.createElement('video');
        call.on('stream', (remoteStream) => {
            addVideoStream(video, remoteStream);
        })
    })

    socket.on('user-connected', (userId) => {
        connectToNewUser(userId, stream);
    })
})

peer.on('open', (id) => {
    //  console.log(id)
    socket.emit('join-room', ROOM_ID, id);
})



const connectToNewUser = (id, stream) => {
    var call = peer.call(id, stream);
    const video = document.createElement('video');
    call.on('stream', (remoteStream)=> {
        // Show stream in some video/canvas element.
        addVideoStream(video, remoteStream);
    });
}

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    videoGrid.append(video);
}
