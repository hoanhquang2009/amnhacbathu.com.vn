const wrapper=document.querySelector(".wrapper"),
musicImg=wrapper.querySelector(".img-area img"),
musicName=wrapper.querySelector(".song-details .name"),
musicAtrist=wrapper.querySelector(".song-details .artist"),
mainAudio=wrapper.querySelector("#main-audio"),
playPauseBtn=wrapper.querySelector(".play-pause"),
prevBtn=wrapper.querySelector('#prev'),
nextBtn=wrapper.querySelector('#next'),
progressArea=wrapper.querySelector(".progress-area"),
progressBar=progressArea.querySelector(".progress-bar");
musicList = wrapper.querySelector(".music-list"),
moreMusicBtn = wrapper.querySelector("#more-music"),
closemoreMusic = musicList.querySelector("#close");


let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
isMusicPaused = true;

window.addEventListener("load",()=>{
    loadMusic(musicIndex);
    playingSong();
})

//loadmusic function
function loadMusic(indexNumb){
    musicName.innerHTML=allMusic[indexNumb-1].name;
    musicAtrist.innerHTML=allMusic[indexNumb-1].nghesi;
    musicImg.src=`images/${allMusic[indexNumb-1].img}.jpg`;
    mainAudio.src=`songs/${allMusic[indexNumb-1].src}.mp3`;
}
//play music function 
function playmusic(){
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
     mainAudio.play();
}
//play music function 
function pausemusic(){
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}
//next music function
function nextMusic(){
    musicIndex++;
    //if musicindex lớn hơn độ dài của mảng thì music sẽ phát lại bài đầu tiên
    musicIndex>allMusic.length?musicIndex=1:musicIndex=musicIndex;
    loadMusic(musicIndex);
    playmusic();
}
//prev music funtion
function prevMusic(){
    musicIndex--;
    // if musicindex nhỏ hơn thì sẽ trở về độ dài lớn nhất của mảng
    musicIndex<1?musicIndex=allMusic.length:musicIndex=musicIndex;
    loadMusic(musicIndex);
    playmusic();
}
//play or music button event
playPauseBtn.addEventListener("click",()=>{
    const isMusicPlay=wrapper.classList.contains("paused");
    //clịck vào nếu dừng thì chạy ngược lại là chạy
    isMusicPlay?pausemusic():playmusic()
})
nextBtn.addEventListener("click",()=>{
    nextMusic();// call function next music
})
prevBtn.addEventListener("click",()=>{
    prevMusic();// call function next music
})

// set thời gian cho bài hát
mainAudio.addEventListener("timeupdate",(e)=>{
    //thời điểm hiện tại
    const currentTime = e.target.currentTime;
    //khoản thời gian của event
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    //set thanh with 
    progressBar.style.width = `${progressWidth}%`;
    // lấy element 
    let musicCurrentTime = wrapper.querySelector(".current"),
    musicDuartion = wrapper.querySelector(".duration");

    mainAudio.addEventListener("loadeddata",()=>{
         //cập nhật bài hát theo giá trị thời gian
         let mainAdDuration = mainAudio.duration;
         let totalMin = Math.floor(mainAdDuration / 60);
         let totalSec = Math.floor(mainAdDuration % 60);
         if(totalSec<10){
             //adding 0 nếu giây nhỏ hơn 10 thì thêm số không đằng trước
             totalSec=`0${totalSec}`
         }
         musicDuartion.innerText=`${totalMin}:${totalSec}`;
    });
     //cập nhật bài hát chạy thời gian
         
     let currentMin = Math.floor(currentTime / 60);
     let currentSec = Math.floor(currentTime % 60);
     if(currentSec<10){
         //adding 0 nếu giây nhỏ hơn 10 thì thêm số không đằng trước
         currentSec=`0${currentSec}`
     }
     musicCurrentTime.innerText=`${currentMin}:${currentSec}`;
});
// click chuyển thời gian
progressArea.addEventListener("click",(e)=>{
    let progressWidth = progressArea.clientWidth; //nhận with từ progressArea
    let clickedOffsetX = e.offsetX; //nhận offsetX để click
    let songDuration = mainAudio.duration; //nhận giá  trị songduration
    
    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playmusic(); //gọi playMusic function
});
const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", ()=>{
  let getText = repeatBtn.innerText; //getting this tag innerText
  switch(getText){
    case "repeat":
      repeatBtn.innerText = "repeat_one";
      repeatBtn.setAttribute("title", "Song looped");
      break;
    case "repeat_one":
      repeatBtn.innerText = "shuffle";
      repeatBtn.setAttribute("title", "Playback shuffled");
      break;
    case "shuffle":
      repeatBtn.innerText = "repeat";
      repeatBtn.setAttribute("title", "Playlist looped");
      break;
  }
});
////event lặp lại bài hát
mainAudio.addEventListener("ended", ()=>{
    // lặp lại bài hát
    let getText = repeatBtn.innerText; //lấy giá trị text
    switch(getText){
      case "repeat":
        nextMusic(); //gọi function repeact
        break;
      case "repeat_one":
        mainAudio.currentTime = 0; //cài đặt lại currtime là 0
        loadMusic(musicIndex); //gọi lại funtion loadmusic để chạy nhạc
        playmusic(); //gọi funtion playmusic để chạy nhạc
        break;
      case "shuffle":
        let randIndex = Math.floor((Math.random() * allMusic.length) + 1); //tạo ra hàm random music 
        do{
          randIndex = Math.floor((Math.random() * allMusic.length) + 1);
        }while(musicIndex == randIndex); //vòng lặp chạy ngẫu nhiên không giống music index hiện tại
        musicIndex = randIndex; //chuyển randomIndex sang musicIndex
        loadMusic(musicIndex);
        playmusic();
        playingSong();
        break;
    }
});
//show list music
moreMusicBtn.addEventListener("click",()=>{
    musicList.classList.toggle("show");
});
// nút close list music
closemoreMusic.addEventListener("click", ()=>{
    musicList.classList.remove("show");
  });

  const ulTag = wrapper.querySelector("ul");
  // tạo thẻ li theo độ dài mảng cho danh sách
  for (let i = 0; i < allMusic.length; i++) {
    //chuyển tên bài hát, nghệ sĩ từ mảng
    let liTag = `<li li-index="${i + 1}">
                  <div class="row">
                    <span>${allMusic[i].name}</span>
                    <p>${allMusic[i].nghesi}</p>
                  </div>
                  <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
                  <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
                </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag); //chèn li bên trong thẻ ul
    let liAudioDuartionTag = ulTag.querySelector(`#${allMusic[i].src}`);
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);
    liAudioTag.addEventListener("loadeddata", ()=>{
      let duration = liAudioTag.duration;
      let totalMin = Math.floor(duration / 60);
      let totalSec = Math.floor(duration % 60);
      if(totalSec < 10){
        totalSec = `0${totalSec}`;
      };
      liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`; //vượt qua tổng thời lượng của bài hát
      liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`); //thêm thuộc tính thời lượng t với tổng giá trị thời lượng
    });
  }

function playingSong(){
  const allLiTag = ulTag.querySelectorAll("li");
  
  for (let j = 0; j < allLiTag.length; j++) {
    let audioTag = allLiTag[j].querySelector(".audio-duration");
    
    if(allLiTag[j].classList.contains("playing")){
      allLiTag[j].classList.remove("playing");
      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration;
    }
    //nếu chỉ mục thẻ li bằng musicIndex thì hãy thêm class playing vào đó
    if(allLiTag[j].getAttribute("li-index") == musicIndex){
      allLiTag[j].classList.add("playing");
      audioTag.innerText = "Playing";
    }
    allLiTag[j].setAttribute("onclick", "clicked(this)");
  }
}
//chức năng nhấp li cụ thể
function clicked(element){
  let getLiIndex = element.getAttribute("li-index");
  musicIndex = getLiIndex; //cập nhật chỉ mục bài hát hiện tại với chỉ mục li được nhấp
  loadMusic(musicIndex);
  playmusic();
  playingSong();
}