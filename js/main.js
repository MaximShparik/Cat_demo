$(document).ready(function(){
  $(function(){
    function getInternetExplorerVersion()
    {
      var rv = -1;
      if (navigator.appName == 'Microsoft Internet Explorer')
      {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})");
        if (re.exec(ua) != null)
        rv = parseFloat( RegExp.$1 );
      }
      else if (navigator.appName == 'Netscape')
      {
        var ua = navigator.userAgent;
        var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\\.0-9]{0,})");
        if (re.exec(ua) != null)
        rv = parseFloat( RegExp.$1 );
      }
      if(rv != -1){
        $('.main__grid').css({'display':'flex','flex-wrap':'wrap','width':'100%'})
        $('.grid__item').css({'margin-left':'1%','margin-right':'1%','margin-bottom':'3%','width':'31%'})
        if($( document ).width()<=1281){
          $('.grid__item').css({'width':'48%'})
        }
        if($( document ).width()<=665){
          $('.grid__item').css({'margin-left':'0%','margin-right':'0%','width':'100%'})
        }
      }
      return rv;
    }
    var data = [
      {
        id:1,
        img:'./img/cat1.png',
        name:'Кот полосатый',
        color:'Коричневый<br> окрас',
        age: 1,
        legs:'<b>4</b><br>Кол-во лап',
        price:30,
        sold:false,
        discount:'-40%'
      },
      {
        id:2,
        img:'./img/cat2.png',
        name:'Кот полосатый',
        color:'Коричневый<br> окрас',
        age:2,
        legs:'<b>4</b><br>Кол-во лап',
        price:40,
        sold:true,
        discount:null
      },
      {
        id:3,
        img:'./img/cat3.png',
        name:'Кот полосатый',
        color:'Коричневый<br> окрас',
        age:2,
        legs:'<b>4</b><br>Кол-во лап',
        price:20,
        sold:false,
        discount:'-40%'
      },
      {
        id:4,
        img:'./img/cat3.png',
        name:'Кот полосатый',
        color:'Коричневый<br> окрас',
        age:3,
        legs:'<b>4</b><br>Кол-во лап',
        price:25,
        sold:false,
        discount:null
      },
      {
        id:5,
        img:'./img/cat1.png',
        name:'Кот полосатый',
        color:'Коричневый<br> окрас',
        age:2,
        legs:'<b>4</b><br>Кол-во лап',
        price:30,
        sold:false,
        discount:null
      },
      {
        id:6,
        img:'./img/cat2.png',
        name:'Кот полосатый',
        color:'Коричневый<br> окрас',
        age:8,
        legs:'<b>4</b><br>Кол-во лап',
        price:10,
        sold:true,
        discount:null
      }
    ]
    var likecat = []
    function Render(data){
      for (let i=0;i<data.length;i++){
        let grid__item = document.createElement('div')
        grid__item.id = data[i].id
        $(grid__item).addClass('grid__item')
        if(data[i].discount!==null){
          let item__discount = document.createElement('div')
          $(item__discount).addClass('item__discount')
          $(item__discount).text(data[i].discount)
          grid__item.appendChild(item__discount)
        }

        let item__like = document.createElement('div')
        $(item__like).addClass('item__like')
        let item__like_img = document.createElement('img')
        item__like_img.src = "./img/like.svg"
        item__like.appendChild(item__like_img)

        for(let x=0;x<likecat.length;x++){
          if(data[i].id==likecat[x]){
            $(item__like_img).css('opacity',1)
          }
        }

        let item__img = document.createElement('div')
        $(item__img).addClass('item__img')
        let cat_img = document.createElement('img')
        cat_img.src = data[i].img
        item__img.appendChild(cat_img)

        let item__texts = document.createElement('div')
        $(item__texts).addClass('item__texts')

        let item__text1 = document.createElement('div')
        $(item__text1).addClass('item__text')
        $(item__text1).text(data[i].name)

        let item__text2 = document.createElement('div')
        $(item__text2).addClass('item__text')
        let p1 = document.createElement('p')
        $(p1).html(data[i].color)
        item__text2.appendChild(p1)
        let p2 = document.createElement('p')
        $(p2).html('<b>'+data[i].age+' мес.</b><br>Возраст')
        item__text2.appendChild(p2)
        let p3 = document.createElement('p')
        $(p3).html(data[i].legs)
        item__text2.appendChild(p3)

        let item__text3 = document.createElement('div')
        $(item__text3).addClass('item__text')
        $(item__text3).text(data[i].price+' 000 руб.')

        item__texts.appendChild(item__text1)
        item__texts.appendChild(item__text2)
        item__texts.appendChild(item__text3)

        if(data[i].sold==true){
          var item__bth = document.createElement('div')
          item__bth.id = 'sold'
          $(item__bth).addClass('item__bth')
          $(item__bth).text('Продан')
          $(item__bth).css('background','#1F2021')
        } else {
          var item__bth = document.createElement('div')
          $(item__bth).addClass('item__bth')
          $(item__bth).text('Купить')
        }
        grid__item.appendChild(item__like)
        grid__item.appendChild(item__img)
        grid__item.appendChild(item__texts)
        grid__item.appendChild(item__bth)
        $('.main__grid')[0].appendChild(grid__item)
        getInternetExplorerVersion()
      }
    }
    Render(data)

    $(window).on("scroll", function() {
      if ($(window).scrollTop() > 252){
        $('.main__btn-up').css('opacity','1')
      } else {
        $('.main__btn-up').css('opacity','0')
      }
    })


    let sort_cost = false
    let sort_cost_click = 0
    $('.main__nav p:nth-child(2)').on('click', function(){
      if(sort_cost==false){
        if(sort_cost_click!=0){
          $(this).toggleClass('big-small')
        }
        data.sort(function(a, b){
          return a.price-b.price
        })
        $('.main__grid').empty()
        data = data.reverse()
        Render(data)
        sort_cost = true
      } else{
        $(this).toggleClass('big-small')
        data.sort(function(a, b){
          return a.price-b.price
        })
        $('.main__grid').empty()
        Render(data)
        sort_cost = false
      }
      sort_cost_click++


    })

    let sort_age = false
    let sort_age_click = 0
    $('.main__nav p:nth-child(3)').on('click', function(){
      if(sort_age==false){
        data.sort(function(a, b){
          return a.age-b.age
        })
        $('.main__grid').empty()
        if(sort_age_click!=0){
          $(this).toggleClass('big-small')
        }
        sort_age = true
        data = data.reverse()
        Render(data)
      } else{
        data.sort(function(a, b){
          return a.age-b.age
        })
        $(this).toggleClass('big-small')
        $('.main__grid').empty()
        sort_age = false
        Render(data)
      }
      sort_age_click++


    })

    $('.main__btn-up').on('click', function(){
      $("html, body").animate({scrollTop:0},"slow")
    })

    $('.main__btn-more').on('click', function(){
      data = data.concat(data)
      $('.main__grid').empty()
      Render(data)
    })

    $('.main__grid').on('click','.item__like img', function(e){
      let likeid = $(this).closest('.grid__item').attr('id')
      if(likecat.length==0){
        likecat.push(parseInt(likeid))
        $(this).addClass('animate__animated')
        $(this).addClass('animate__heartBeat')
        $(this).css('opacity',1)
        $('.main__btn-add').addClass('show-like')
        setTimeout(function(){
          $('.main__btn-add').removeClass('show-like')
        },2050)
      } else {
        if(likecat.includes(parseInt(likeid))===true){
          let index = likecat.indexOf(parseInt(likeid))
          if (index > -1) {
            likecat.splice(index, 1)
            $(this).removeClass('animate__animated')
            $(this).removeClass('animate__heartBeat')
            $(this).css('opacity',0.5)
          }
        } else {
          likecat.push(parseInt(likeid))
          $(this).addClass('animate__animated')
          $(this).addClass('animate__heartBeat')
          $(this).css('opacity',1)
          $('.main__btn-add').addClass('show-like')
          setTimeout(function(){
            $('.main__btn-add').removeClass('show-like')
          },2050)
        }
      }
    })

    $('.mobile__btn').on('click',function(){
      $('.header__nav-mobile').toggleClass('header__nav-mobile-active')
    })
  })
})
