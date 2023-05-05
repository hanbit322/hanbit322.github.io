document.addEventListener("DOMContentLoaded", function(){

  const daysTag = document.querySelector(".calendar .days");  
  let currYear = new Date().getFullYear();
  let currMonth = 6;
  
  const renderCalendar = () => {
      const date = new Date(currYear, currMonth, 1);
      let firstDayofMonth = date.getDay();
      let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
      let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
      let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
  
      let liTag = "";
  
      for (let i = firstDayofMonth; i > 0; i--) {
          liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
      }
  
      for (let i = 1; i <= lastDateofMonth; i++) {
          let isToday = i === 8 ? "active" : "";
          liTag += `<li class="gyeonggi ${isToday}">${i}</li>`;
      }
  
      for (let i = lastDayofMonth; i < 6; i++) {
          liTag += `<li class="gyeonggi inactive">${i - lastDayofMonth + 1}</li>`
      }

      daysTag.innerHTML = liTag;
  };


  const copyButton = () =>{
    document.querySelectorAll(".info button").forEach((item) => {
      item.addEventListener("click", function(){
          let tempElem = document.createElement('textarea');
          let data = item.previousElementSibling.children[0].dataset.number;
          tempElem.value = data;  
          document.body.appendChild(tempElem);
          
          tempElem.select();
          document.execCommand("copy");
          document.body.removeChild(tempElem);
          alert('계좌번호 복사가 완료되었습니다');
      });
    })
  };

  const makeMap = () => {
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
          center: new kakao.maps.LatLng(37.56712605770419, 126.82673177394068), // 지도의 중심좌표
          level: 4 // 지도의 확대 레벨
      };

    var map = new kakao.maps.Map(mapContainer, mapOption);

    var imageSrc = '/src/images/marker01.png', // 마커이미지의 주소입니다    
        imageSize = new kakao.maps.Size(22, 33), // 마커이미지의 크기입니다
        imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
        markerPosition = new kakao.maps.LatLng(37.56712605770419, 126.82673177394068); // 마커가 표시될 위치입니다

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage // 마커이미지 설정 
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);  

    // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    var content = '<div class="customoverlay">' +
        '  <a href="https://map.kakao.com/link/map/11394059" target="_blank">' +
        '  </a>' +
        '</div>';

    // 커스텀 오버레이가 표시될 위치입니다 
    var position = new kakao.maps.LatLng(37.56712605770419, 126.82673177394068);  

    // 커스텀 오버레이를 생성합니다
    var customOverlay = new kakao.maps.CustomOverlay({
        map: map,
        position: position,
        content: content,
        yAnchor: 1 
    });
  }

  const moreViewButton = () => {
    document.querySelector('.gallery .content').style.maxHeight = '590px';
    document.querySelector('.gallery .content').style.transition = 'max-height 1s ease';

    document.querySelector('.gallery .footer p').addEventListener('click', () => {
      document.querySelector('.gallery .content').style.maxHeight = '1175px';
      document.querySelector('.gallery .content').style.transition = 'max-height 1s ease 0s';
      document.querySelector('.gallery .footer p').style.display = 'none';
    })
  };

  const swiper = () => {
    var swiper = new Swiper('.swiper-container', {
      loop: true,
      speed: 1000,
      loopedSlides: 1,
      slidesPerView: 1,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });

    document.querySelectorAll('.gallery ul li').forEach((item, index) => {
      item.addEventListener('click', (target) => {
        document.querySelector('.popup').classList.add('active');
        document.querySelector('body').classList.add('active-popup');
        
        console.log();
        swiper.slideTo(item.dataset.num - 1, 0, false);
        document.querySelector('.swiper-container').style.opacity = '1';
      })
    })

    document.querySelector('.close-button').addEventListener('click', () => {
      document.querySelector('.popup').classList.remove('active');
      document.querySelector('body').classList.remove('active-popup');
      document.querySelector('.swiper-container').style.opacity = '0';
    })
  }

  const dropdown = () => {
    document.querySelectorAll('.dropdown').forEach(item => {
      item.addEventListener('click', () => {
        item.classList.contains('active')
        ? item.classList.remove('active')
        : item.classList.add('active');
      })
    })
  }


  renderCalendar();
  copyButton();
  makeMap();
  moreViewButton();
  swiper();
  dropdown();
  AOS.init({
		duration: 1500,
		easing: 'ease',
		once: true,
	});    
});
