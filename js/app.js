const more_less_btn = document.querySelector('.more-less');
const details = document.querySelector('.details');
const more_less_icon = document.querySelector('.more-less-icon');
const more_less_text = document.querySelector('.more-less-text');
const quote_container = document.querySelector('.quote-container');
const time_h1 = document.querySelector('#time');
const timezone_span = document.querySelector('#timezone');
const location_text = document.querySelector('.location-text');
const greetings_text = document.querySelector('.greetings-text');
const day_night_icon = document.querySelector('.day-night-icon img');
const refreh_quote = document.querySelector('.refresh-icon img');
const timezone_value = document.querySelector('.timezone-value');
const days_of_year_value = document.querySelector('.days-of-year-value');
const days_of_week_value = document.querySelector('.days-of-week-value');
const week_number_value = document.querySelector('.week-number-value');
const body = document.querySelector('body');
//handle refresh quote
refreh_quote.addEventListener('click', () => {
    fetchQuote();
});


// show/hide .details when more_less_btn is clicked
more_less_btn.addEventListener('click', function() {
  
    // console.log(more_less_icon_img);
    if (details.classList.contains('hide')) {   
        details.classList.remove('hide');
        more_less_icon.classList.add('down');
        more_less_text.innerHTML = 'Less';
        quote_container.classList.add('hide');  // hide quote container
        // scroll to top of page
        window.scrollTo(0, document.body.scrollHeight);
    }else {
        details.classList.add('hide');
        more_less_icon.classList.remove('down');
        more_less_text.innerHTML = 'More';
        quote_container.classList.remove('hide');  // show quote container
        // scroll to the top of the page
        window.scrollTo(0, 0);
        // window.scrollTo(0, details.offsetTop + details.offsetHeight);
    };
    });

    // show time every second
   
    //show time hour : second
    function showTime() {
        const time = new Date();
        const hour = time.getHours();
        const minute = time.getMinutes();
        // show time in #time with zero padding
        time_h1.innerHTML = `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`;
        // show time in #time
        updateGreetings(hour);
    }

    function updateGreetings(hour) {
        if (hour >= 0 && hour < 12) {
            greetings_text.innerHTML = 'Good Morning';
            day_night_icon.src = './assets/desktop/icon-sun.svg';
            body.style.backgroundImage = 'url(./assets/desktop/bg-image-daytime.jpg)';
            details.classList.remove('night');
            details.classList.add('day');
        } else if (hour >= 12 && hour < 18) {
            greetings_text.innerHTML = 'Good Afternoon';
            // day_night_icon.src = './assets/desktop/icon-sun.svg';
            details.classList.add('day');
        } else if (hour >= 18 && hour < 24) {
            greetings_text.innerHTML = 'Good Evening';
            day_night_icon.src = './assets/desktop/icon-moon.svg';
            body.style.backgroundImage = 'url(./assets/desktop/bg-image-nighttime.jpg)';
            details.classList.add('night');
            details.classList.remove('day');
        }

    }

    // fetch quote of the day
    function fetchQuote() {
        fetch('https://api.kanye.rest/')
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            const quote = data.quote;
            const author = 'Kanye West';
            const quote_text = document.querySelector('.quote-text');
            const quote_author = document.querySelector('.quote-author');
            quote_text.innerHTML = quote;
            quote_author.innerHTML = author;
        });
    }


    document.addEventListener('DOMContentLoaded', function() {
        setInterval(showTime, 1000);
        // show timezone
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        // show timezone in #timezone
        timezone_span.innerHTML = timezone;
        timezone_value.innerHTML = timezone;
        //show location
        const location = timezone.split('/')[1];
        location_text.innerHTML = `IN ${location}`;
        
        //calculate day of year in days
        const today = new Date();
        const start = new Date(today.getFullYear(), 0, 0);
        const diff = today - start;
        const oneDay = 1000 * 60 * 60 * 24;
        const day = Math.floor(diff / oneDay);
        //show day of year in days
        days_of_year_value.innerHTML = day;

        //calculate day of week
        const day_of_week = today.getDay();
        //show day of week
        days_of_week_value.innerHTML = day_of_week;

        //calculate week number
        const week_number = Math.floor((day - 1) / 7) + 1;
        //show week number
        week_number_value.innerHTML = week_number;

    
    });
