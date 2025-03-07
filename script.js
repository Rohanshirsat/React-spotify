console.log("Welcome to Spotify");
//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Satranga Ishq", filePath: "songs/1.mp3", },
    { songName: "Heriye", filePath: "songs/2.mp3", coversPath: "covers/H.jpg" },
    { songName: "O Mahi", filePath: "songs/3.mp3", coversPath: "covers/mahi.jpg" },
    { songName: "Tu Hai Kaha", filePath: "songs/4.mp3", coversPath: "covers/A.jpg" },
    { songName: "Husn", filePath: "songs/5.mp3", coversPath: "covers/husn.jpg" },
    { songName: "Koi aisa Geet gau", filePath: "songs/6.mp3", coversPath: "covers/A.jpg" },
    { songName: "Until I found", filePath: "songs/7.mp3", coversPath: "covers/A.jpg" },
    { songName: "Sukh kalale", filePath: "songs/8.mp3", coversPath: "covers/A.jpg" },
    { songName: "Muze tum Nazar se", filePath: "songs/9.mp3", coversPath: "covers/A.jpg" },
    { songName: "Aur kya", filePath: "songs/10.mp3", coversPath: "covers/A.jpg" },
]

// गाने के थंबनेल और नाम को अपडेट करना
songItems.forEach((element, i) => {
    //element.getElementsByTagName("img")[0].src = songs[i].coversPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// गाना प्ले होने के लिए पहले से प्ले करते हैं
//audioElement.play();

// Play/Pause बटन पर क्लिक करने की हैंडलिंग
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime == 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1; // gif दिखाना
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0; // gif छिपाना
    }
})

// गाने के समय को ट्रैक करने और प्रोग्रेस बार अपडेट करने की हैंडलिंग
audioElement.addEventListener('timeupdate', () => {
    // प्रोग्रेस बार को अपडेट करना
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

// प्रोग्रेस बार के जरिए गाने का समय बदलना
myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
});

// सभी प्ले बटन को अपडेट करना (ताकि वे सभी प्ले पर वापस जाएं)
const makeAllplays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

// गाने के प्ले बटन पर क्लिक करने की हैंडलिंग
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
    element.addEventListener('click', (e) => {
        makeAllplays();
        songIndex = index; // गाने का इंडेक्स सेट करना
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = songs[songIndex].filePath; // सही गाने का फाइल पथ सेट करना
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

// अगले बटन पर क्लिक करने की हैंडलिंग
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0; // अगर आखिरी गाना है तो पहले गाने पर वापस जाएं
    } else {
        songIndex += 1; // अगले गाने पर जाएं
    }
    audioElement.src = songs[songIndex].filePath; // सही गाने का फाइल पथ सेट करना
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

// पिछले बटन पर क्लिक करने की हैंडलिंग
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1; // अगर पहले गाने पर हैं तो आखिरी गाने पर जाएं
    } else {
        songIndex -= 1; // पिछले गाने पर जाएं
    }
    audioElement.src = songs[songIndex].filePath; // सही गाने का फाइल पथ सेट करना
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
})
